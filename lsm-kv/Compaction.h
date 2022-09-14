#include "kvstore.h"
#include <cmath>
#include<algorithm>
/*实现 compaction 相关的功能*/

std::vector<SSTable*> KVStore::GetCurLevelFiles(int level, std::vector<int> &pos)
{
    std::vector<SSTable*> ans;
    int num = LevelFiles[level].size() - pow(2, level + 1);//计算要提取的文件的个数
    /*std::vector<SSTable*> cur;
    for(size_t i = 0;i < LevelFiles[level].size();++i){
        SSTable* sst = LevelFiles[level][i];
        cur.push_back(sst);
    }
    sort(cur.begin(), cur.end(), Comp);
    for(int i = 0;i < num;++i){
        ans.push_back(cur[i]);//记录符合条件的文件
        for(size_t j = 0;j < LevelFiles[level].size();++j){
            if(CheckEqual(cur[i], LevelFiles[level][j])) pos.push_back(j);//记录此sst在元目录中的索引
        }
    }*/
    for(int i = 0;i < num;++i){
        ans.push_back(LevelFiles[level][i]);
        pos.push_back(i);
    }
    return ans;
}

void KVStore::AddCompactSST(SSTable* sst, int level)//将合并生成的sst添加到磁盘中去 //
{
    //std::string name = "./data/Level-"  + to_string(level);
    std::string name = datadir + "/Level-"  + to_string(level);//
    if(!(utils::dirExists(name))) utils::mkdir(name.c_str());
    std::string s = name  + '/' + to_string(TimeSymbol) + ".sst";
    ofstream sstfile;
    sstfile.open(s.c_str(), ios::binary);//以二进制的格式打开文件
    for(int i = 0;i < 4;++i){
        uint64_t val = sst->Header->header[i];
        sstfile.write((char*)(&val), 8);//header part每个数据8个字节
    }//将header部分写入文件
    for(int i = 0;i < 10240;++i){
        int val = sst->BF->KeyTable[i];
        sstfile.write((char*)(&val), 1);//BF中的数据每个一个字节
    }//将bloom filter部分写入文件
    for(uint64_t i = 0;i < sst->Header->header[1];++i){
        uint64_t key = sst->Offset[i].key;
        uint32_t offset = sst->Offset[i].offset;
        sstfile.write((char*)(&key), 8);//每个key占8个字节
        sstfile.write((char*)(&offset), 4);//每个offset占4个字节
    }//将键值key以及其对应的偏移量写入文件
    for(uint64_t i = 0;i < sst->Header->header[1];++i){
        sstfile.write((sst->Data[i].s).c_str(), (sst->Data[i].s).length());
    }//将每个key对应的具体的data写入文件
    sstfile.close();//写完之后记得将打开的文件关闭
}

std::string KVStore::CompactionGet(uint64_t key)
{
    std::vector<std::string> ret;//用于存储某一层的所有的文件名,主要作用是用于进行取数据(不能用时间戳作为标识)
    //首先在memtable中进行相应键值的查找
    std::string s = MemTableSearch(key);
    //如果返回一个非空且不是删除标记的字符串，直接返回s
    if(s != "" && s != "~DELETED~") return s;
    //若找到的键值对应的value为deleted的特殊标记就应该认为没有找到
    if(s == "~DELETED~") return "~DELETED~";//
    //若没有找到(s为空字符串)，则在sstable中进行查找(按照pdf上面的步骤来找)(注意可能要在多层进行查找)
    //先要和header中的minkey与maxkey比较判断范围
    //SSTable *sst = HeadSST;
    s = SearchSSTData(key);
    //if(s == "~DELETED~") s = "";//如果找到的为 删除标记 ，则值为空，相当于没找到.
    ret.clear();
    return s;
}

void KVStore::Compaction(int level)          //核心功能之一，合并操作
{
    if(LevelFiles.empty() || LevelFiles[level].size() <= pow(2, level + 1)) return ;//当前层的文件没有超过数量限制，直接return
    if(LevelFiles.size() == size_t(level + 1)){//若当前要合并的层的下一层为空层
        std::vector<SSTable*> newlevel;//创建新的一层
        LevelFiles.push_back(newlevel);
        //std::string s = "./data/Level-" + to_string(level + 1);
        std::string s = datadir + "/Level-" + to_string(level + 1);//
        utils::mkdir(s.c_str());//创建对应层的新的文件目录
    }
    uint64_t min = UINT64_MAX;//将初始的最小值设置为uint64类型的上限数值
    uint64_t max = 0;
    uint64_t maxtimesymbol = 0;
    //std::vector<uint64_t> sortkeys;//记录用于排序的keys(在此vector中每个重复的key只出现一次)
    std::vector<SSTable*> nextlevel;
    int anspos = 0;//记录结果的个数(索引)
    std::vector<SSTable*> ans;//用于存储合并后新生成的sst
    //std::vector<std::string> datas;//用于存储找到的keys对应的datas
    std::vector<int> pos;//记录当前层的下一层的要进行合并的文件在目录中的位置
    std::vector<int> curpos;//记录当前层(level>0)的要进行合并的文件在目录中的位置
    std::vector<SSTable*> curlevel;//记录当前层(level>0)的要进行合并的文件内容
    std::vector<SSTable*> AllFiles;//存储所有被选中的文件
    std::vector<uint64_t> fileposition;//用于记录每个文件读取到的数据的位置
    std::vector<uint64_t> FileMin;
    std::vector<std::string> filesname;//用于记录某一层的文件名称
    bool CheckEnd;//用于判断是否是最后一层(主要是处理 删除标记 是否保留的问题)
    if(LevelFiles[level + 1].size() == 0) CheckEnd = true;//是底层
    else CheckEnd = false;//不是底层
    //std::string levelname = "./data/Level-" + to_string(level);
    std::string levelname = datadir + "/Level-" + to_string(level);//
    utils::scanDir(levelname.c_str(), filesname);//获取当前层的文件名称信息
    sort(filesname.begin(), filesname.end(), CompStr);//按照名字排序
    if(level == 0){
        for(size_t i = 0;i < LevelFiles[0].size();++i){
            if(LevelFiles[0][i]->Header->header[2] <= min)
                min = LevelFiles[0][i]->Header->header[2];
            if(LevelFiles[0][i]->Header->header[3] >= max)
                max = LevelFiles[0][i]->Header->header[3];
        }//获取level0层的所有文件对应的键值的范围
        curlevel = LevelFiles[level];//若为level0，则当前层要排序的文件为所有文件
        for(size_t i = 0;i < curlevel.size();++i){
            if(curlevel[i]->Header->header[0] >= maxtimesymbol)
                maxtimesymbol = curlevel[i]->Header->header[0];//获取最大时间戳
            GetAllData(filesname[i], level, curlevel[i]);//
        }
    }
    if(level > 0){//
        curlevel = GetCurLevelFiles(level, curpos);//获取当前层要合并的文件
        for(size_t i = 0;i < curlevel.size();++i){
            if(curlevel[i]->Header->header[0] >= maxtimesymbol)
                maxtimesymbol = curlevel[i]->Header->header[0];//获取最大时间戳
            if(curlevel[i]->Header->header[2] <= min)
                min = curlevel[i]->Header->header[2];
            if(curlevel[i]->Header->header[3] >= max)
                max = curlevel[i]->Header->header[3];
            GetAllData(filesname[curpos[i]], level, curlevel[i]);//
        }
    }
    filesname.clear();//清空文件名vector
    //std::string nextname = "./data/Level-" + to_string(level + 1);
    std::string nextname = datadir + "/Level-" + to_string(level + 1);//
    utils::scanDir(nextname, filesname);
    sort(filesname.begin(), filesname.end(), CompStr);//将文件名称排序
    std::vector<SSTable*> nextlevelfiles = LevelFiles[level + 1];
    for(size_t i = 0;i < nextlevelfiles.size();++i){
        if((nextlevelfiles[i]->Header->header[2] >= min && nextlevelfiles[i]->Header->header[2] <= max)
    || (nextlevelfiles[i]->Header->header[3] >= min && nextlevelfiles[i]->Header->header[3] <= max)){
            nextlevel.push_back(nextlevelfiles[i]);
            pos.push_back(i);//记录下一层中要删除的文件的索引位置
        }
    }
    for(size_t i = 0;i < nextlevelfiles.size();++i){
        nextlevelfiles[i] = nullptr;
        delete nextlevelfiles[i];
    }//
    for(size_t i = 0;i < nextlevel.size();++i){
        if(nextlevel[i]->Header->header[0] >= maxtimesymbol)
            maxtimesymbol = nextlevel[i]->Header->header[0];//获取最大时间戳
        GetAllData(filesname[pos[i]], level + 1, nextlevel[i]);//
    }
    //将所有文件放在一起，按照最小键值进行排序
    for(size_t i = 0;i < curlevel.size();++i){
        AllFiles.push_back(curlevel[i]);
        fileposition.push_back(0);//每个文件最初的索引位置均为0(因为有序)
    }
    for(size_t i = 0;i < nextlevel.size();++i){
        AllFiles.push_back(nextlevel[i]);
        fileposition.push_back(0);//每个文件最初的索引位置均为0(因为有序)
    }
    SSTable* sst = new SSTable();
    ans.push_back(sst);

    //SortFiles(AllFiles, FileMin, fileposition, ans, maxtimesymbol, anspos, CheckEnd);//进行多路归并排序
    sort(AllFiles.begin(), AllFiles.end(), CompSST);
    sort(AllFiles.begin(), AllFiles.end(), CompSST_R);//
    SortAll(AllFiles, fileposition, ans, maxtimesymbol, anspos, CheckEnd);//进行多路归并排序
    for(size_t i = 0;i < AllFiles.size();++i){
        AllFiles[i]->Data.clear();//清空额外添加的数据区
    }
    if(level == 0){
        for(size_t i = 0;i < LevelFiles[level].size();++i){
            LevelFiles[level][i] = nullptr;
            delete LevelFiles[level][i];
        }//
        LevelFiles[level].clear();//若是level-0则清空当前的level0层缓存信息
    }
    if(level > 0){//
        std::vector<SSTable*> tmp = LevelFiles[level];
        bool *checked = new bool[LevelFiles[level].size()];
        for(size_t i = 0;i < LevelFiles[level].size();++i){
            checked[i] = false;
        }
        for(size_t i = 0;i < curpos.size();++i){
            checked[curpos[i]] = true;
        }

        for(size_t i = 0;i < LevelFiles[level].size();++i){
            LevelFiles[level][i] = nullptr;
            delete LevelFiles[level][i];
        }//
        LevelFiles[level].clear();
        for(size_t i = 0;i < tmp.size();++i){
            if(checked[i] == false) LevelFiles[level].push_back(tmp[i]);
        }
        for(size_t i = 0;i < tmp.size();++i){
            tmp[i] = nullptr;
            delete tmp[i];
        }//
        tmp.clear();//
        delete []checked;
    }
    //删除下一层中要被删除(合并)的对应文件的缓存信息
    std::vector<SSTable*> tmp1 = LevelFiles[level + 1];
    bool *checked1 = new bool[(LevelFiles[level + 1].size())];
    for(size_t j = 0;j < LevelFiles[level + 1].size();++j){
        checked1[j] = false;
    }
    for(size_t i = 0;i < pos.size();++i){
        checked1[pos[i]] = true;
    }
    for(size_t i = 0;i < LevelFiles[level + 1].size();++i){
        LevelFiles[level + 1][i] = nullptr;
        delete LevelFiles[level + 1][i];
    }//
    LevelFiles[level + 1].clear();
    for(size_t i = 0;i < tmp1.size();++i){
        if(checked1[i] == false) LevelFiles[level + 1].push_back(tmp1[i]);
    }
    for(size_t i = 0;i < tmp1.size();++i){
        tmp1[i] = nullptr;
        delete tmp1[i];
    }//
    tmp1.clear();//
    delete []checked1;
    //删除磁盘中要被删除(合并)的实际文件信息
    std::vector<std::string> ret;
    //std::string s = "./data/Level-" + to_string(level);
    std::string s = datadir + "/Level-" + to_string(level);//
    utils::scanDir(s, ret);
    if(level == 0){                         //若是level0，则清除磁盘中所有此层文件
        for(size_t i = 0;i < ret.size();++i){
            std::string ss = s + "/" + ret[i];
            utils::rmfile(ss.c_str());
        }
    }
    if(level > 0){//
        sort(ret.begin(), ret.end(), CompStr);//先排序
        for(size_t i = 0;i < curpos.size();++i){
            std::string ss = s + "/" + ret[curpos[i]];
            utils::rmfile(ss.c_str());
        }
    }
    std::vector<std::string> ret1;
    //std::string s1 = "./data/Level-" + to_string(level + 1);
    std::string s1 = datadir + "/Level-" + to_string(level + 1);//
    utils::scanDir(s1, ret1);
    sort(ret1.begin(), ret1.end(), CompStr);//先排序
    if(ret1.size() != 0){
        for(size_t i = 0;i < pos.size();++i){
            std::string ss = s1 + "/" + ret1[pos[i]];
            utils::rmfile(ss.c_str());                  //将下一层的对应位置的文件删除
        }
    }
    for(size_t i = 0;i < ans.size();++i){
        if(ans[i]->Offset.size() > 0){//在文件内部有具体的键值对的情况下在生成对应的sst(s)
            AddCompactSST(ans[i], level + 1);//注意新生成的文件名字不同但是 时间戳 可以 相同
            TimeSymbol++;//更新sst文件数量计数器
        }
    }

    //sort(ans.begin(), ans.end(), CompSST);//先将ans中的sst排序在插入
    for(size_t i = 0;i < ans.size();++i){
        //for(size_t j = 0;j < ans[i]->Data.size();++j) ans[i]->Data[j].s = "";//
        ans[i]->Data.clear();//将data区域删除，将其余部分继续留在缓存中
        LevelFiles[level + 1].push_back(ans[i]);//将新的sst放入缓存中去
    }
    sort(LevelFiles[level + 1].begin(), LevelFiles[level + 1].end(), CompSST);
    //存完缓存区之后，记得排序
    //注意每次compaction结束之后要及时清空所有临时的vector中的所有的指针
    for(size_t i = 0;i < curlevel.size();++i){
        delete curlevel[i];
    }
    curlevel.clear();
    for(size_t i = 0;i < nextlevel.size();++i){
        delete nextlevel[i];
    }
    nextlevel.clear();
    AllFiles.clear();
    for(size_t i = 0;i < ans.size();++i){
        ans[i] = nullptr;
        delete ans[i];
    }//
    ans.clear();//??
    fileposition.clear();
    FileMin.clear();
    pos.clear();
    curpos.clear();
    if(LevelFiles[level + 1].size() > pow(2, level + 2))
        Compaction(level + 1);//若下一层有越界继续向下合并
    return ;//若下一层未越界，则本次compaction结束
}

void KVStore::SortAll(std::vector<SSTable*> &AllFiles, std::vector<uint64_t> &fileposition,
               std::vector<SSTable*> &ans, uint64_t &maxtimesymbol, int &anspos, bool CheckEnd)
{
    size_t Num = AllFiles.size();
    if(Num == 0) return ;//没有文件要被排序
    std::vector<bool> Cleaned;
    std::vector<SSTable*> HasMin;//记录某一次查找时的有最小值的那些sst对应的缓存
    for(size_t i = 0;i < Num;++i) Cleaned.push_back(false);
    std::vector<int> pos;//记录每次的最小值的文件对应的索引位置
    uint64_t Min =  UINT64_MAX;
    int size = 0;//计数当前正在写入的sst(对应缓存)的大小
    size += 32;
    size += 10240;
    int num = 0;//记录目前正在写入的sst(对应缓存)的键值对的数量
    while(true){
        bool Updated = false;
        for(size_t i = 0;i < Num;++i){
            if(fileposition[i] == (AllFiles[i]->Offset.size() - 1)){//
                //Cleaned[i] = true;//该文件已经处理完毕
                continue;
            }
            Updated = true;//将要进行ans的更新
            if(AllFiles[i]->Offset[fileposition[i]].key < Min){
                HasMin.clear();//
                pos.clear();
                pos.push_back(i);//记录有最小值的位置
                HasMin.push_back(AllFiles[i]);//
                Min = AllFiles[i]->Offset[fileposition[i]].key;
            }
            else{
                if(AllFiles[i]->Offset[fileposition[i]].key == Min){
                    HasMin.push_back(AllFiles[i]);//
                    pos.push_back(i);//记录有最小值的位置
                }
            }
        }
        if(!Updated) break;//没有文件可以被处理，则此次合并结束

        std::string str = HasMin[0]->Data[fileposition[pos[0]]].s;//取得时间戳最大的当前data字符串
        for(size_t k = 0;k < pos.size();++k){
            fileposition[pos[k]]++;//将修改的文件的对应缓存对应的指针位置向后移动一位
        }
        //std::string str = CompactionGet(Min);//获取当前最小数值对应的data

        if(!(CheckEnd == true && str == "~DELETED~")){
            //cout<<Min<<endl;
            WriteToAns(ans, Min, size, str, anspos, num, maxtimesymbol);
        }
        Min = UINT64_MAX;
    }
    if(size <= MAX_SIZE && ans[anspos]->Offset.size() > 0){//
        //如果在合并结束的时候最后一个文件有键值对并且没满的情况下，则需要额外的一次填充offset等的操作
        ans[anspos]->Header->header[0] = maxtimesymbol;
        ans[anspos]->Header->header[1] = num;
        ans[anspos]->Header->header[2] = ans[anspos]->Offset[0].key;
        ans[anspos]->Header->header[3] = ans[anspos]->Offset[num - 1].key;
        size = 0;
        size += 32;
        size += 10240;
        size += 12 * num;
        for(int i = 0;i < num;++i){
            ans[anspos]->Offset[i].offset = size;
            size += ans[anspos]->Data[i].s.length();
        }
        OffsetNode off = OffsetNode(0, size);
        ans[anspos]->Offset.push_back(off);//归一化
        DataNode data = DataNode();
        data.s = "";
        ans[anspos]->Data.push_back(data);
    }
    Cleaned.clear();
    pos.clear();
}

void KVStore::WriteToAns(std::vector<SSTable*> &ans, uint64_t key,
                 int &size, std::string &str, int &anspos, int &num, uint64_t &maxtimesymbol)
{
    size += 12;
    size += str.length();//计算新的size
    if(size <= MAX_SIZE){//在没有超过最大size的情况下记录当前的键值
        if(anspos > 0){
            size_t offsize = ans[anspos - 1]->Offset.size();
            if(key == ans[anspos - 1]->Offset[offsize - 2].key){//
                size -= 12;
                size -= str.length();
                return ;
            }
        }
        for(size_t i = 0;i < ans[anspos]->Offset.size();++i){//
            if(ans[anspos]->Offset[i].key == key){
                size -= 12;
                size -= str.length();
                return ;
            }
        }
        ans[anspos]->BF->BFInsert(key);//记得将对应的key插入bloom filter中去
        OffsetNode off = OffsetNode(key, 0);
        ans[anspos]->Offset.push_back(off);
        DataNode data = DataNode();
        data.s = str;
        ans[anspos]->Data.push_back(data);
        num++;
        return ;
    }
    else{//超过MAXSIZE之后则生成新的sst，同时将旧的sst的键值对，offset等信息填上去
        size -= 12;
        size -= str.length();//若加入此字符串导致超标，则剔除此键值对
        OffsetNode off = OffsetNode(key, size);
        ans[anspos]->Offset.push_back(off);//归一化
        size = 0;
        size += 32;
        size += 10240;
        size += num * 12;
        ans[anspos]->Header->header[0] = maxtimesymbol;
        ans[anspos]->Header->header[1] = num;
        ans[anspos]->Header->header[2] = ans[anspos]->Offset[0].key;
        ans[anspos]->Header->header[3] = ans[anspos]->Offset[num - 1].key;//填充header部分
        for(int k = 0;k < num;++k){
            ans[anspos]->Offset[k].offset = size;
            size += ans[anspos]->Data[k].s.length();//填充每个键值对对应的offset
        }
        anspos++;
        size = 10272;
        num = 0;//清零,为下一个sst做准备
        SSTable* sst = new SSTable();
        ans.push_back(sst);//创建新的sst并放入ans中去
        if(anspos > 0){
            size_t offsize = ans[anspos - 1]->Offset.size();
            if(key == ans[anspos - 1]->Offset[offsize - 2].key){
                return ;
            }
        }
        size += 12;
        size += str.length();
        num++;
        OffsetNode off1 = OffsetNode(key, 0);
        ans[anspos]->Offset.push_back(off1);
        ans[anspos]->BF->BFInsert(key);//记得将对应的key插入bloom filter中去
        DataNode data = DataNode();
        data.s = str;
        ans[anspos]->Data.push_back(data);//将之前导致超标的键值对放入新的sst中去
    }
}

void KVStore::GetAllData(std::string filename, int level, SSTable* sst)
{
    ifstream file;
    //std::string name = "./data/Level-" + to_string(level) + "/" + filename;//要打开的文件的名字
    std::string name = datadir + "/Level-" + to_string(level) + "/" + filename;//要打开的文件的名字//
    file.open(name, ios::binary);//以二进制的格式打开这个文件
    for(uint64_t i = 0;i < sst->Header->header[1];++i){
        uint32_t off = sst->Offset[i].offset;
        file.seekg(0, ios::beg);
        file.seekg(off, ios::beg);
        uint32_t len = sst->Offset[i + 1].offset - sst->Offset[i].offset + 1;
        char* buf = new char[len];
        file.read(buf, len - 1);//
        buf[len - 1] = 0;
        std::string val(buf);
        DataNode data = DataNode(val);
        sst->Data.push_back(data);
        delete []buf;
    }
    file.close();//记得关闭文件
}
