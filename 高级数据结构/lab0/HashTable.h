#pragma once

#include <iostream>
#include <vector>
#include <ctime>    //测试使用
#include "Container.h"

#define BUCKET_SIZE 10
// HashNode stored in buckets
struct HashNode
{
    int key;
    int val;
    HashNode *next;
    HashNode(int _key, int _val)
        : key(_key), val(_val), next(nullptr) {}
    HashNode(int _key, int _val, HashNode *_next)
        : key(_key), val(_val), next(_next) {}
};

class HashTable : public Container
{
private:
    std::vector<HashNode *> bucket;
    int hash(int key);
    //以下是测试用变量
    std::vector<HashNode*> testans;
    /*clock_t InsertTimes = 0;
    clock_t SearchTimes = 0;
    clock_t DeleteTimes = 0;
    clock_t ScopeTimes = 0;*/

public:
    HashTable()
    {
        for (int i = 0; i < BUCKET_SIZE; ++i)
        {
            bucket.push_back(nullptr);
        }
    }
    void Insert(int key, int value);
    void Search(int key);
    void Delete(int key);
    void Display();
    //以下是测试用函数
    void SearchScope(int low, int high);
    ~HashTable()
    {
        for (int i = 0; i < BUCKET_SIZE; ++i)
        {
            HashNode *n = bucket[i];
            HashNode *n1;
            while (n)
            {
                n1 = n->next;
                delete n;
                n = n1;
            }
        }
    }
};
