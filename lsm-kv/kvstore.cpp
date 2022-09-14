#include "kvstore.h"
#include "Compaction.h"
#include <string>
#include <ctime>
#include <iostream>
#include <fstream>
#include <cstdio>
#include <cmath>
#include<algorithm>
using namespace std;
int LEVEL = 0;//一个用于记录跳表当前不为空的层数的变量
int CurrentLevel = 0;//记录当前已经生成的文件层数
int CurrentFileNum = 1;//记录当前层的SST文件个数

int KVStore::RandLevel()
{
    int result = 1;
    srand(unsigned(time(0)));
    double p = (rand() % 100) / double(101);
    while (result < MAX_LEVEL && p < 0.5){
        ++result;
        p = (rand() % 100) / double(101);//
    }
    return result;
}

KVStore::KVStore(const std::string &dir): KVStoreAPI(dir)
{
    this->datadir = dir;//记录data文件夹路径
    TimeSymbol = 1;
    //MemTable Part Init
    CurSize = 0;
    CurSize += 32;
    CurSize += 10240;//
    head = new SKNode(0, "", SKNodeType::HEAD);
    NIL = new SKNode(INT_MAX, "", SKNodeType::NIL);
    for (int i = 0; i < MAX_LEVEL; ++i)
    {
        head->forwards[i] = NIL;
    }
    NumofPairs = 0;
    //SSTable Part Init
    //此部分为非reset时的启动，尝试读入存储于SST中的内容到缓存中去
    int i = 0;
    std::vector<std::string> ret;
    //std::string name = "./data/Level-" + to_string(i);
    std::string name = (this->datadir) + "/Level-" + to_string(i);//
    //utils::scanDir(name, ret);
    while(utils::dirExists(name) == true){
        std::vector<SSTable*> newlevel;
        LevelFiles.push_back(newlevel);//生成表示新的一层的vector
        utils::scanDir(name, ret);//扫描sst对应的该目录下的文件
        sort(ret.begin(), ret.end(), CompStr);//排序文件名
        for(size_t j = 0;j < ret.size();++j){//将每个文件对应的缓存放在对应层的vector中去
            std::string ss = name + "/" + ret[j];
            SSTable* sst = CreateMem(ss);
            LevelFiles[i].push_back(sst);
        }
        sort(LevelFiles[i].begin(), LevelFiles[i].end(), CompSST);//
        //TimeSymbol = CreateMem(ret[ret.size() - 1])->Header->header[0];//获取每一层的最后一个文件的时间戳
        ret.clear();//记得清空
        i++;//记得迭代变量的更新！
        name = (this->datadir) + "/Level-" + to_string(i);//
    }
}

SSTable* KVStore::CreateMem(std::string filename) //创建某个sst文件对应的缓存区(在 非reset 启动时)//
{
    SSTable* sst = new SSTable();//用于记录生成的缓存信息
    ifstream file;
    uint32_t size = 0;//记录文件总的字节数信息
    file.open(filename, ios::binary);//打开要转化为缓存信息的文件
    for(int i = 0;i < 4;++i){
        file.read((char*)(&sst->Header->header[i]), 8);
    }//读取并存储header部分的内容
    for(int i = 0;i < 10240;++i){
        file.read((char*)(&sst->BF->KeyTable[i]), 1);
    }//读取并存储bloom filter部分的信息
    for(uint64_t i = 0;i < sst->Header->header[1];++i){
        OffsetNode off = OffsetNode(0, 0);
        sst->Offset.push_back(off);
        file.read((char*)(&sst->Offset[i].key), 8);
        file.read((char*)(&sst->Offset[i].offset), 4);
    }//读取键值以及对应的偏移量的信息
    file.seekg(0, ios::end);//将文件指针移动到文件尾部
    size = file.tellg();//获取文件总的字节数信息
    OffsetNode off = OffsetNode(0, size);//归一化，主要是方便计算最后一个data的长度
    sst->Offset.push_back(off);//保存用于归一化的offset
    file.close();//记得关闭文件
    return sst;//返回生成的缓存信息
}

KVStore::~KVStore()
{
    if(!CheckMemTableEmpty())
        StoreRestPairs();//析构的时候若跳表不空，以SST的形式存储剩下的没有存入SST中的键值对
    //MemTable Part Finit
    SKNode *n1 = head;
    SKNode *n2;
    while (n1)
    {
        n2 = n1->forwards[0];
        delete n1;
        n1 = n2;
    }
    NumofPairs = 0;
    //SSTable Part Finit
    for(size_t i = 0;i < LevelFiles.size();++i){
        for(size_t j = 0;j < LevelFiles[i].size();++j){
            delete LevelFiles[i][j];
        }
        LevelFiles[i].clear();
    }
    LevelFiles.clear();//清空缓存区
}

uint64_t KVStore::GetMAX()      //获得即将转化为sst的memtable的最大键值
{
    uint64_t max = 0;
    SKNode *p = head;
    while(p->forwards[0] && p->forwards[0]->type != 3){
        p = p->forwards[0];
        if(p->key >= max) max = p->key;
    }
    return max;
}

void KVStore::MemTableInsert(uint64_t key, const std::string &value)
{
    std::vector<SKNode*> update(MAX_LEVEL);
    SKNode* p = head;
    int l = MAX_LEVEL;
    int i = 0;
    for(i = l - 1;i >= 0;--i){
        if(!head->forwards[i]->forwards[i]) continue;
        else{
            LEVEL = i + 1;//算不为空的层数
            break;
        }
    }
    if(i == -1) LEVEL = 1;
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
            p = p->forwards[i];
        }
        update[i] = p;
    }
    p = p->forwards[0];//尝试找到最可能的位置
    if(!p) return ;
    if(p->key == key){  //已经存在就修改
        CurSize -= p->val.length();//
        CurSize += value.length();//若已经存在，就将对应的data的大小改为新的大小
        p->val = value;
        return ;
    }
    int NewLevel = RandLevel();//不存在就插入新的数值
    if(NewLevel > MAX_LEVEL) return ;
    if(NewLevel > LEVEL){       //随机的层数大于最大层数，更新当前非空层数
        for(int i = LEVEL + 1;i <= NewLevel;++i){
            update[i - 1] = head;
        }
        LEVEL = NewLevel;
    }
    SKNode* New = new SKNode(key, value, NORMAL);
    CurSize += 12;//
    CurSize += value.length();//若是要插入新的节点，则要计算新的键值对以及data对应的size大小
    NumofPairs++;
    //if(key >= MAX) MAX = key;
    //if(key >= maxval[maxval.size() - 1]) maxval.push_back(key);
    for(int i = NewLevel - 1;i >= 0;--i){
        p = update[i];
        New->forwards[i] = p->forwards[i];
        p->forwards[i] = New;
    }
    for(size_t i = 0;i < update.size();++i){
        update[i] = nullptr;
        delete update[i];
    }//
    return ;
}

std::string KVStore::MemTableSearch(uint64_t key)
{
    int l = MAX_LEVEL;
    SKNode* p = head;
    int i;
    for(i = l - 1;i >= 0;--i){
        if(!(head->forwards[i]->forwards[i])){
            continue;
        }
        else{
            LEVEL = i + 1;
            break;
        }
    }
    if(i == -1){
        LEVEL = 1;
        return "";
    }
    if(LEVEL == 0){     //以上是两种到底了还没找到的情况
        return "";
    }
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
            p = p->forwards[i];
        }
        if(p->forwards[i] && p->forwards[i]->key >= key){
            //if(p->type == 1) cout<<i + 1<<",h ";
            //if(p->type == 2) cout<<i + 1<<","<<p->key<<" ";
        }
    }
    p = p->forwards[0];
    if(p && p->key == key){//找到了
        return p->val;
    }
    else{               //最可能的位置还是没找到就return FALSE
        return "";
    }
}

bool KVStore::MemTableDelete(uint64_t key)
{
    std::vector<SKNode*> update(MAX_LEVEL);
    SKNode* p = head;
    int l = MAX_LEVEL;
    int i = 0;
    for(i = l - 1;i >= 0;--i){//记录当前最大非空层数
        if(p->type == 3) continue;
        else{
            LEVEL = i + 1;
            break;
        }
    }
    if(i == -1){
        LEVEL = 1;
        return false;
    }                       //走到最底层还是没有找到直接返回false
    if(LEVEL == 0) return false;
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
        p = p->forwards[i];
    }
    update[i] = p;
    }
    p = p->forwards[0];
    if(!p) return false;            //最底层的目标位置为空或者key不是目标值就直接返回false
    if(p->key != key) return false;
    else{
        if(p->val == "~DELETED~") return false;//此处是在说键值能够被找到但是对应的value为删除标记，认为是没找到
        for(int i = 0;i < LEVEL;++i){
            if(update[i]->forwards[i] != p) break;
            //update[i]->forwards[i] = p->forwards[i];
            p->val = "~DELETED~";           //在此处给出有删除的标记(已经找到的情况下)
        }
        while(LEVEL > 1 && head->forwards[LEVEL] == NIL) LEVEL--;
    }
    return true;
}

bool KVStore::CheckMemTableEmpty()//检查进行析构的时候跳表是否已经为空表
{
    if(head->forwards[0] && head->forwards[0]->type != 3) return false;
    return true;
}

void KVStore::Clear()               //将memtable清空(与convert功能关联使用)
{
    SKNode *n1 = head;
    SKNode *n2;
    while (n1)
    {
        n2 = n1->forwards[0];
        delete n1;
        n1 = n2;
    }
    NumofPairs = 0;
    head = new SKNode(0, "", SKNodeType::HEAD);
    NIL = new SKNode(INT_MAX, "", SKNodeType::NIL);
    for (int i = 0; i < MAX_LEVEL; ++i)
    {
        head->forwards[i] = NIL;
    }
    NumofPairs = 0;
}

SSTable* KVStore::MSConvert()       //将当前的memtable转化为sstable
{
    SSTable *ans = new SSTable();
    uint32_t size = 0;
    //实现头部内容的转换

    ans->Header->header[0] = TimeSymbol;//第一位存时间戳
    ans->Header->header[1] = NumofPairs;//第二位存键值对的数量
    ans->Header->header[2] = head->forwards[0]->key;//第三位存最小值
    //ans->Header->header[3] = maxval[maxval.size() - 1];//第四位存最大值
    ans->Header->header[3] = GetMAX();//第四位存最大值
    size += 32;     //计算headr的size

    size += 10240;  //计算Bf的size
    //ans->Offset = new OffsetNode[NumofPairs + 1];//sstable中的offset成员是一个存储key-offset的数组
    size += (NumofPairs) * 12;//找到offset区域的终止位置
    //ans->Data = new DataNode[NumofPairs + 1];
    int pos = 0;            //用于暂时纪录目前已经记录到的位置的局部变量
    //遍历跳表并填充offset区域与data区域(此时还没有填充具体的offset的数值)
    SKNode* p = head;
    while(p->forwards[0] && p->forwards[0]->type != 3){
        p = p->forwards[0];
        ans->BF->BFInsert(p->key);  //将对应的键值插入BF中去
        OffsetNode offset =OffsetNode(p->key,size);
        ans->Offset.push_back(offset);//因为跳表就是有序的，所以直接记录就行了
        DataNode data;
        data.s = p->val;
        ans->Data.push_back(data);
        pos++;
        size += (p->val).length();
    }
    OffsetNode offset =OffsetNode(0,size);
    ans->Offset.push_back(offset);
    DataNode data;
    data.s = "";
    ans->Data.push_back(data);
    //NumofPairs = 0;     //将memtable重置为0
    return ans;
}

uint32_t KVStore::CheckSize(SSTable* sst)   //计算生成的sst的size是否超标
{
    uint32_t size = 0;
    size += 32;
    size += 10240;
    uint32_t num = sst->Header->header[1];
    size += (num * 12);
    for(uint32_t i = 0;i < num;++i){
        size += sst->Data[i].s.length();
    }
    return size;
}

void BloomFilter::BFInsert(uint64_t key)            //在bloom filter中进行插入操作
{
    unsigned int hash[4] = {0};
    MurmurHash3_x64_128(&key, sizeof(key), 1, hash);
    for(int i = 0;i < 4;++i){
        KeyTable[hash[i] % BF_SIZE] = 1;
    }
    return ;
}

bool BloomFilter::BFSearch(uint64_t key)            //在bloom filter中进行查找想要的键值
{
    unsigned int hash[4] = {0};
    MurmurHash3_x64_128(&key, sizeof(key), 1, hash);
    for(int i = 0;i < 4;++i){
        if(KeyTable[hash[i] % BF_SIZE] != 1) return false;  //没有找到
    }
    return true;
}

int SSTable::BinarySearch(uint64_t key, int low, int high)  //利用二分查找来查找可能存在的键值
{
    int mid = 0;
    while(low <= high) {
        mid = (low + high) / 2;
        if(key == Offset[mid].key) {
            return mid;
        } else if(key < Offset[mid].key) {
            high = mid - 1;
        } else if(key > Offset[mid].key) {
            low = mid + 1;
        }
    }
    return -1;
}

std::string SSTable::GetData(uint32_t offset)    //通过offset的数值查找到对应的data
{
    //offset -= 32;
    //offset -= 10240;
    offset -= 32;
    offset -= 10240;
    offset -= (12 * Header->header[1]);
    uint32_t datapos = 0;
    while(offset != 0){
        offset -= Data[datapos].s.length();
        datapos++;
    }
    return Data[datapos].s;
}

void KVStore::AddNewSST(SSTable *sst, int level)//添加新的sst文件至磁盘中去//
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

void KVStore::StoreRestPairs()      //在系统正常关闭时将剩下的memtable中的内容放入SST中存储
{
    SSTable *ans = MSConvert();
    AddNewSST(ans, 0);//将剩余的键值生成的SST仍然放到level0层
    (ans->Data).clear();//清空data区
    if(LevelFiles.empty()){
        std::vector<SSTable*> sst;
        LevelFiles.push_back(sst);
    }
    LevelFiles[0].push_back(ans);//之后将对应的内容存入缓存中去
    Compaction(0);//每次在level0层添加文件之后都要检查是否需要合并
}

void KVStore::DeleteInserted(uint64_t key)      //用于删除由于此键值对的插入导致容量超标的键值对
{
    std::vector<SKNode*> update(MAX_LEVEL);
    SKNode* p = head;
    int l = MAX_LEVEL;
    for(int i = l - 1;i >= 0;--i){
        if(p->type == 3) continue;
        else{
            LEVEL = i + 1;
            break;
        }
    }
    if(LEVEL == 0) return ;
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
            p = p->forwards[i];
        }
        update[i] = p;
    }
    p = p->forwards[0];
    if(!p) return ;
    if(p->key != key) return ;
    else{
        for(int i = 0;i < LEVEL;++i){
            if(update[i]->forwards[i] != p) break;
            update[i]->forwards[i] = p->forwards[i];
        }
        delete p;
        while(LEVEL > 1 && head->forwards[LEVEL] == NIL) LEVEL--;
    }
}

void KVStore::ClearDataArea(SSTable *sst) //将数据区的内容清除，之后将其他部分直接存储在内存中
{
    for(size_t i = 0;i < sst->Data.size();++i){
        sst->Data[i].s = "";
    }//
    sst->Data.clear();
}

void KVStore::ClearSST(SSTable *sst)        //清空一个SST中的所有内容
{
    for(int i = 0;i < 4;++i){
        sst->Header->header[i] = 0;
    }
    delete sst->Header;
    delete sst->BF;
    sst->Offset.clear();
    sst->Data.clear();
}

int KVStore::GetLevel(int num)  //获取内存中某个sst位于的层数
{
    int level = 0;
    int sum = 2;
    while(num > sum){
        sum += pow(2, level + 2);
        level++;
    }
    return level;
}

//获取某层第i个SST文件中的偏移量为offset的数据的数值
std::string KVStore::GetSSTData(SSTable *sst, uint32_t off,uint32_t pos, int level, std::string name)//
{
    //std::string openfilename = "./data/Level-"  + to_string(level) + '/' + name;
    std::string openfilename = datadir + "/Level-"  + to_string(level) + '/' + name;//
    ifstream sstfile;
    sstfile.open(openfilename, ios::binary);
    sstfile.seekg(off, ios::beg);//移动到要读取的数据的起始位置
    uint32_t len = sst->Offset[pos + 1].offset - sst->Offset[pos].offset + 1;
    char *buf = new char[len];
    sstfile.read(buf, len - 1);//读取对应长度的字符串
    buf[len - 1] = 0;//填充字符串结尾的'\0'
    std::string ss(buf);//将读取出来的字符数组转化为string类型
    sstfile.close();//记得关闭文件
    delete []buf;//清除动态分配的内存
    return ss;//返回读取到的字符串信息
}

bool KVStore::CheckExitedinList(uint64_t key, std::list<std::pair<uint64_t, std::string> > &list)
{//判断是否发生了重复的情况
    /*for(auto i = list.begin();i != list.end();++i){
        if((*i).first == key) return true;
    }
    return false;*/
    if(list.empty()) return false;
    else{
        std::pair<uint64_t, std::string> p = list.back();
        if(p.first == key) return true;
        return false;
    }
}

std::string KVStore::SearchSSTData(uint64_t key)
{
    std::string s = "";
    std::vector<std::string> ret;
    uint64_t curtime = 0;//
    for(size_t k = 0;k < LevelFiles.size();++k){//
        //std::string levelname = "./data/Level-" + to_string(k);
        std::string levelname = datadir + "/Level-" + to_string(k);//
        utils::scanDir(levelname, ret);//扫描当前层的所有文件并获得其文件名
        //int num = 0;    //用于记录可能存在于SST中的数据位于哪个SST文件中        
        sort(ret.begin(), ret.end(), CompStr);//排序文件名
        //
        sort(LevelFiles[k].begin(), LevelFiles[k].end(), CompSST);//按照时间戳的顺序取排序文件
        for(size_t l = 0;l < LevelFiles[k].size();++l){
            //num++;
            SSTable *sst = LevelFiles[k][l];
            //sst = sst->next;
            //目标键值不在当前SST的键值范围内
            if(key < sst->Header->header[2] || key > sst->Header->header[3]) continue;
            else{
                //在对应的键值范围内但是BF并没有查找到对应的键值
                if(sst->BF->BFSearch(key) == false) continue;
                //通过BF得知该键值在这个SST文件里面，则查找对应的offset并去查对应的val并取出
                else{
                    int position = sst->BinarySearch(key, 0, sst->Header->header[1] - 1);
                    if(position == -1) continue;//二分查找没有找到(即BF出现了误报的情况)
                    //找到了对应的offset的情况
                    if(sst->Header->header[0] >= curtime){//
                        curtime = sst->Header->header[0];//记录当前找到data的文件的时间戳
                        uint32_t off = sst->Offset[position].offset;
                        //下面去找到offset对应的在data数组中的位置
                        s = GetSSTData(sst, off, position, k, ret[l]);
                        //break;        //此处不要break？可能会有相同键值不同取值（被删除）的情况发生
                    }
                }
            }
            //ClearSST(sst);
            sst = nullptr;
            delete sst;//
        }
        ret.clear();
    }
    ret.clear();
    return s;
}

/**
 * Insert/Update the key-value pair.
 * No return values for simplicity.
 */
void KVStore::put(uint64_t key, const std::string &s)
{
    CurSize += 12;
    CurSize += s.length();
    if(CurSize > MAX_SIZE){//如果超标了，则实际上不进行该键值对的插入
        SSTable* ans = MSConvert();
        ans->PairNum = NumofPairs;//键值对的数量
        AddNewSST(ans, 0);//将当前的memtable之间转化为实际的SST
        ClearDataArea(ans);//清除ans对应的data区域，准备放入内存中去
        Clear();//清空当前的memtable
        CurSize = 0;//
        CurSize += 32;//
        CurSize += 10240;//
        TimeSymbol++;//将sst文件的计时器加1
        if(LevelFiles.empty()){
            std::vector<SSTable*> newlevel;
            LevelFiles.push_back(newlevel);
            std::string levelname = datadir + "/Level-0";//
            //utils::mkdir("./data/Level-0");
            utils::mkdir(levelname.c_str());//
        }
        LevelFiles[0].push_back(ans);//将对应区域放入缓存中去
        sort(LevelFiles[0].begin(), LevelFiles[0].end(), CompSST);//记得放完缓存区之后要排序
        ans = nullptr;
        delete ans;//删除临时指针
        //若超过第0层文件个数限制，则进行合并操作
        Compaction(0);//
        MemTableInsert(key, s);//记得将当前要插入的键值对插入已经清空的MemTable中去
    }
    else{//模拟的size并没有超过sst的文件大小限制
        CurSize -= 12;
        CurSize -= s.length();//
        MemTableInsert(key, s);//记得将当前要插入的键值对插入未清空的MemTable中去
    }
}
/**
 * Returns the (string) value of the given key.
 * An empty string indicates not found.
 */
std::string KVStore::get(uint64_t key)
{
    std::vector<std::string> ret;//用于存储某一层的所有的文件名,主要作用是用于进行取数据(不能用时间戳作为标识)
    //首先在memtable中进行相应键值的查找
    std::string s = MemTableSearch(key);
    //如果返回一个非空且不是删除标记的字符串，直接返回s
    if(s != "" && s != "~DELETED~") return s;
    //若找到的键值对应的value为deleted的特殊标记就应该认为没有找到
    if(s == "~DELETED~") return "";
    //若没有找到(s为空字符串)，则在sstable中进行查找(按照pdf上面的步骤来找)(注意可能要在多层进行查找)
    //先要和header中的minkey与maxkey比较判断范围
    //SSTable *sst = HeadSST;
    s = SearchSSTData(key);
    if(s == "~DELETED~") s = "";//如果找到的为 删除标记 ，则值为空，相当于没找到.
    return s;
}
/**
 * Delete the given key-value pair if it exists.
 * Returns false iff the key is not found.
 */
bool KVStore::del(uint64_t key)
{
    //尝试在memtable查找目标键值并进行删除(赋值特殊标记)
    std::string s = get(key);
    if(s == "" || s == "~DELETED~") return false;//没有找到对应的记录或者该记录已经被删除过了
    else{
        put(key, "~DELETED~");
        return true;
    }
    return false;
}

/**
 * This resets the kvstore. All key-value pairs should be removed,
 * including memtable and all sstables files.
 */
void KVStore::reset()
{
    for(int i = 0;i < MAX_LEVEL;++i){//清空memtable中的数据点
        (head)->forwards[i] = (NIL);
    }
    std::vector<std::string> ret;//记录每一层的文件信息
    //std::string s = "./data/Level-";
    std::string s = datadir + "/Level-";//
    for(size_t i = 0;i < LevelFiles.size();++i){
        std::string ss = s + to_string(i);
        utils::scanDir(ss, ret);
        for(size_t j = 0;j < ret.size();++j){//先逐层删除磁盘中的sst文件
            std::string name = ss + "/" + ret[j];
            utils::rmfile(name.c_str());
        }
        utils::rmdir(ss.c_str());
        ret.clear();
    }
    for(size_t i = 0;i < LevelFiles.size();++i){//在清空缓存中的所有sst内存信息
        LevelFiles[i].clear();
    }
    LevelFiles.clear();
}

/**
 * Return a list including all the key-value pair between key1 and key2.
 * keys in the list should be in an ascending order.
 * An empty string indicates not found.
 */
void KVStore::scan(uint64_t key1, uint64_t key2, std::list<std::pair<uint64_t, std::string> > &list)
{
    //注意！！！！ 此处可以使用遍历整个跳表的方式但是 绝对不能 使用用for进行一个一个数值查找的操作！
    std::vector<std::pair<uint64_t, std::string>> ans;
    std::vector<std::string> ret;//用于记录每一层的文件名称
    SKNode* p = head;
    while(p->forwards[0] && p->forwards[0]->type != 3){//先要在跳表中查找符合条件的值
        p = p->forwards[0];
        if(p->key < key1) continue;
        if(p->key > key2) break;//利用跳表的单增性质，减少一部分的比较
        if(p->key >= key1 && p->key <= key2 && p->val != "~DELETED~"){
            ans.emplace_back(std::make_pair(p->key, p->val));
        }
    }
    for(int k = (LevelFiles.size() - 1);k >= 0;--k){
        for(size_t i = 0;i < LevelFiles[k].size();++i){
            SSTable *q = LevelFiles[k][i];
            if(q->Header->header[2] > key2 || q->Header->header[3] < key1) continue;//不在范围内往下走
            for(uint32_t l = 0;l < q->Header->header[1];++l){
                if(q->Offset[l].key > key2) break;//利用有序性来减少比较的数量
                if(q->Offset[l].key <= key2 && q->Offset[l].key >= key1){//若某个键值在目标范围内
                    std::string s = SearchSSTData(q->Offset[l].key);
                    if(s == "" || s == "~DELETED~") continue;//若找不到对应的键值接着尝试去找
                    ans.emplace_back(std::make_pair(q->Offset[l].key, s));//找到了就放到list里面
                }
            }
            q = nullptr;
            delete q;//
        }
    }
    ans.erase(unique(ans.begin(), ans.end()), ans.end());//
    sort(ans.begin(), ans.end(), Comp1);
    for(size_t i = 0;i < ans.size();++i) list.push_back(ans[i]);
    //sort(list.begin(), list.end(), Comp);//按照key的递增顺序对list进行排序
    ans.clear();//清空中间vector
    list.unique();//去除list中的重复元素
}
