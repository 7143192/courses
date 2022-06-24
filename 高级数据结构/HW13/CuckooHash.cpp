#include "CuckooHash.h"
#include <iostream>
#include <mutex>
using namespace std;
std::mutex mtx;
CuckooHash::CuckooHash(int size)
{
    max_len = size;
    max_loop = 1000;
    HashTable = new int[max_len];
    for(int i = 0;i < max_len;++i) HashTable[i] = -1;//用-1作为空的标志
}

int CuckooHash::Hash1(int key)
{
    int lHashKey = 0;
    lHashKey = key % (max_len / 2);
    return lHashKey;
}

int CuckooHash::Hash2(int key)
{
    int lHashKey = 0;
    lHashKey = key / (max_len / 2);
    lHashKey = lHashKey % (max_len / 2);
    return (lHashKey + max_len / 2);
}

bool CuckooHash::Search(int key)
{
    int pos1 = Hash1(key);
    int pos2 = Hash2(key);
    if(HashTable[pos1] == key || HashTable[pos2] == key) return true;
    return false;
}

void CuckooHash::Insert(int key)
{
    if(Search(key) == true) return ;//已经存在，直接结束
    int pos1 = Hash1(key);
    if(HashTable[pos1] == -1){//hash1为空，直接插入，结束
        HashTable[pos1] = key;
        return ;
    }
    int pos2 = Hash2(key);
    if(HashTable[pos2] == -1){//hash2为空，直接插入，结束
        HashTable[pos2] = key;
        return ;
    }
    int evicted = key;
    int which = 0;//标记该使用那个hash函数
    int idx = Hash1(evicted);
    int prepos = -1;
    int t = 0;
    while(HashTable[idx] != -1){
        if(t >= max_loop) return ;//成环了
        swap(evicted, HashTable[idx]);
        t++;

        prepos = idx;
        which = 1 - which;
        idx = (which == 0) ? Hash1(evicted) : Hash2(evicted);
    }
    HashTable[idx] = evicted;
}

void CuckooHash::Insert_Parallel(int key)
{
    if(Search(key) == true) return ;//已经存在，直接结束
    int pos1 = Hash1(key);
    if(HashTable[pos1] == -1){//hash1为空，直接插入，结束
        HashTable[pos1] = key;
        return ;
    }
    int pos2 = Hash2(key);
    if(HashTable[pos2] == -1){//hash2为空，直接插入，结束
        HashTable[pos2] = key;
        return ;
    }
    std::unique_lock<std::mutex> lck(mtx);//加锁来处理并行
    int evicted = key;
    int which = 0;//标记该使用那个hash函数
    int idx = Hash1(evicted);
    int prepos = -1;
    int t = 0;
    while(HashTable[idx] != -1){
        if(t >= max_loop) return ;//成环了
        swap(evicted, HashTable[idx]);
        t++;

        prepos = idx;
        which = 1 - which;
        idx = (which == 0) ? Hash1(evicted) : Hash2(evicted);
    }
    HashTable[idx] = evicted;
}
void CuckooHash::Clear()
{
    for(int i = 0;i < max_len;++i) HashTable[i] = -1;
}
