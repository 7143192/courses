#pragma once
#include <cstdlib>
#include <cstdio>
#include <iostream>
#include <vector>
#include "kvstore_api.h"
#include "MurmurHash3.h"
using namespace std;
using namespace utils;
#define MAX_SIZE 2097152  //MAX_SIZE的数值代表的是2MB,为每个SSTable的容量
#define MAX_LEVEL 21    //定义memtable的最大层数,取跳表插入时的概率为0.5
#define BF_SIZE 10240   //用于记录一个BF的最大容量
//uint64_t TimeSymbol = 1;//用于记录生成的SSTable的个数同时作为SST的时间戳
enum SKNodeType     //memtable中的节点类型集合
{
    HEAD = 1,
    NORMAL,
    NIL
};

struct SKNode       //memtable中的节点类
{
    uint64_t key;
    std::string val;
    SKNodeType type;
    std::vector<SKNode *> forwards;
    SKNode(uint64_t _key, std::string _val, SKNodeType _type)
        : key(_key), val(_val), type(_type)
    {
        for (int i = 0; i < MAX_LEVEL; ++i)
        {
            forwards.push_back(nullptr);
        }
    }
};

class SSHeader{ //sstable的header类
public:
    uint64_t *header = new uint64_t[4];
    SSHeader()
    {
        for(int i = 0;i < 4;++i) header[i] = 0;
    }
    ~SSHeader()
    {
        delete []header;
    }
};

class BloomFilter{      //bloomfilter类
public:
    //char *KeyTable = new char[BF_SIZE];//要使用byte数组
    int *KeyTable = new int[BF_SIZE];//要使用byte数组
    void BFInsert(uint64_t key);    //进行向BF中插入某个键值
    bool BFSearch(uint64_t key);    //搜索BF中是否存在某个键值
    BloomFilter(){
        for(int i = 0;i < BF_SIZE;++i) KeyTable[i] = 0;
    }
    ~BloomFilter(){
        delete []KeyTable;
    }
};

class OffsetNode{       //缓存区类
public:
    uint64_t key;
    uint32_t offset;
    OffsetNode(){
        key = 0;
        offset = 0;
    }
    OffsetNode(uint64_t _key, uint32_t _offset):
        key(_key),offset(_offset){

    }
};

class DataNode{         //数据区类
public:
    std::string s;
    DataNode(){
        s = "";
    }
    DataNode(std::string &s1):s(s1){

    }
};

class SSTable{          //SSTable的封装类，内部包含了header BF Offset DataArea几部分的 对应的指针
public:
    SSHeader *Header;
    BloomFilter *BF;
    std::vector<OffsetNode> Offset;
    std::vector<DataNode> Data;
    SSTable *next;
    uint32_t PairNum;//记录当前的SST中的键值对的数量
    int level;       //记录该文件所处的层数
    int fileno;      //记录该文件在所在层的文件号，可用于判断是否应该进行合并操作
    int BinarySearch(uint64_t key, int low, int high);
    std::string GetData(uint32_t offset);
    SSTable(){
        Header = new SSHeader();
        BF = new BloomFilter();
        next = nullptr;
    }
    SSTable(SSTable *n){
        Header = new SSHeader();
        BF = new BloomFilter();
        next = n;
    }
    SSTable(SSHeader *sh,BloomFilter *bf,SSTable* n):
        Header(sh),BF(bf),next(n){

    }
    ~SSTable(){
        delete Header;
        delete BF;
        Offset.clear();
        Data.clear();
        //delete next;
    }
};

class KVStore : public KVStoreAPI {
    // You can add your implementation here
private:
    std::string datadir;//用于记录data目录根路径
    //MemTable Part
    SKNode *head;
    SKNode *NIL;
    uint32_t NumofPairs;//用于记录键值对的数量
    uint32_t CurSize;//记录当前的跳表的对应于sst的大小
    //SSTable Part
    SSTable *SST;
    SSTable *HeadSST;
    std::vector<std::vector<SSTable*>> LevelFiles;//分层记录文件信息
    uint64_t TimeSymbol;//记录当前创建文件的顺序号(不是时间戳是因为compaction生成的多个文件时间戳相同但是文件名不同)
public:
    KVStoreAPI *API;

    KVStore(const std::string &dir);

    SSTable* CreateMem(std::string filename);//创建某个sst文件对应的缓存区(在 非reset 启动时)

    ~KVStore();

    int RandLevel();//memtable的随机数函数，生成每次插入的元素高度

    uint64_t GetMAX();   //获取要转化为SST的memtable的最大键值

    void MemTableInsert(uint64_t key, const std::string &value);//只在memtable中进行插入的函数

    std::string MemTableSearch(uint64_t key);//只在memtable中进行查找的函数

    bool MemTableDelete(uint64_t key);//只在memtable中进行查找并做出删除标记的函数

    void DeleteInserted(uint64_t key);  //用于删除由于此键值对的插入导致容量超标的键值对

    bool CheckMemTableEmpty();//检查进行析构的时候跳表是否已经是一个空表

    void Clear();//清空当前的memtable

    SSTable* MSConvert();//实现讲一个memtable转化为SSTable的功能

    uint32_t CheckSize(SSTable *sst);//计算一个SSTABLE的size大小

    void AddNewSST(SSTable *sst, int level);   //在memtable超过最大容量之后将其转化为一个新的sst文件存储在磁盘中

    void ClearDataArea(SSTable *sst);//将数据区的内容清除，之后将其他部分直接存储在内存中

    void ClearSST(SSTable *sst);     //清空一个SST中的所有内容

    int GetLevel(int num);//获取内存中某个sst的level

    std::string GetSSTData(SSTable *sst, uint32_t offset, uint32_t pos, int level, std::string name);
    //获取某层第i个SST文件中的偏移量为offset的数据的数值

    bool CheckExitedinList(uint64_t key, std::list<std::pair<uint64_t, std::string> > &list);

    void StoreRestPairs();//在系统正常关闭时将剩下的memtable中的内容放入SST中存储

    void put(uint64_t key, const std::string &s) override;

    std::string get(uint64_t key) override;

    bool del(uint64_t key) override;

    void reset() override;

    void scan(uint64_t key1, uint64_t key2, std::list<std::pair<uint64_t, std::string> > &list) override;

    void Compaction(int level);  //合并操作

    //int GetNewPos(std::vector<uint64_t> &FileMin, uint64_t key);//获取key应该插入的位置

    //void ResetPos(std::vector<SSTable*> &AllFiles, std::vector<uint64_t> &fileposition
                  //, int &newpos);//重排列元素的位置

    //void WriteToFile(std::vector<SSTable*> &ans, std::vector<uint64_t> &FileMin,
    //                 int &size, std::string &str, int &anspos, int &num, uint64_t &maxtimesymbol);//写入sst

    //void SortFiles(std::vector<SSTable*> &all, std::vector<uint64_t> &keys, std::vector<uint64_t> &pos,
    //               std::vector<SSTable*> &ans, uint64_t &maxtimesymbol, int &anspos, bool CheckEnd);//进行多路归并排序

    //std::vector<SSTable*> GetNewSSTs(std::vector<uint64_t> keys, std::vector<std::string> datas
    //                        ,uint64_t time);//生成合并之后的新的sstables

    void AddCompactSST(SSTable* sst, int level);//将合并生成的sst添加到磁盘中去

    static bool Comp(SSTable* s1, SSTable* s2){
        /*if(s1->Header->header[0] != s2->Header->header[0])
            return s1->Header->header[0] < s2->Header->header[0];
        return s1->Header->header[1] < s2->Header->header[1];*/
        if(s1->Header->header[0] != s2->Header->header[0])
            return s1->Header->header[0] < s2->Header->header[0];
        return s1->Header->header[2] < s2->Header->header[2];
    }

    std::string SearchSSTData(uint64_t key);//从sst中get操作要找的data

    std::vector<SSTable*> GetCurLevelFiles(int level, std::vector<int> &pos);
    //获取当前层的符合条件的文件（非level0，选择时间戳合适的文件）

    //bool CheckEqual(SSTable* s1, SSTable* s2);//检测两个sst是否相同

    static bool Comp1(std::pair<uint64_t, std::string> p1, std::pair<uint64_t, std::string> p2){
        return p1.first <= p2.first;
    }

    std::string CompactionGet(uint64_t key);

    static bool CompStr(std::string s1, std::string s2){
        int pos1 = s1.find('.');
        int pos2 = s2.find('.');
        std::string ss1 = s1.substr(0, pos1);
        std::string ss2 = s2.substr(0, pos2);
        int val1 = atoi(ss1.c_str());
        int val2 = atoi(ss2.c_str());
        return val1 < val2;
    }

    /*static bool CompMin(SSTable* s1, SSTable* s2)
    {
        if(s1->Header->header[2] != s2->Header->header[2]){
            return s1->Header->header[2] < s2->Header->header[2];
        }
        return s1->Header->header[1] < s2->Header->header[1];
    }*/

    static bool CompSST(SSTable* s1, SSTable* s2)
    {
        if(s1->Header->header[0] != s2->Header->header[0]){
            return s1->Header->header[0] < s2->Header->header[0];
        }
        return s1->Header->header[2] < s2->Header->header[2];
    }

    void SortAll(std::vector<SSTable*> &all, std::vector<uint64_t> &pos,
                   std::vector<SSTable*> &ans, uint64_t &maxtimesymbol, int &anspos, bool CheckEnd);

    void WriteToAns(std::vector<SSTable*> &ans, uint64_t key,
                     int &size, std::string &str, int &anspos, int &num, uint64_t &maxtimesymbol);

    void GetAllData(std::string filename, int level, SSTable* sst);//获取某一个缓存区对应的所有data

    static bool CompSST_R(SSTable* s1, SSTable* s2)
    {
        if(s1->Header->header[0] != s2->Header->header[0]){
            return s1->Header->header[0] > s2->Header->header[0];
        }//优先按照时间戳降序排序
        return s1->Header->header[2] < s2->Header->header[2];
    }
};
