#ifndef BF_H
#define BF_H
#include <ctime>
#include <iostream>
#include <fstream>
using namespace std;
class BloomFilter{
public:
    int MAX_SIZE = 0;//定义最大长度
    int NumofHash = 0;//定义hash函数的数量
    int *HashTable;//定义hash大数组
    int *randpos;
    BloomFilter(){
        MAX_SIZE = 300;
        NumofHash = 3;
        HashTable = new int[MAX_SIZE];
        for(int i = 0;i < MAX_SIZE;++i) HashTable[i] = 0;
    }
    void insert(int val);//向hashtable中插入某个数值
    bool Search(int val);//搜索某个数值在bf中是否存在
    int Hash(int val,int i);//初始化的hash函数
    int Hash32(const char *key, int len, int seed);
};

#endif // BF_H
