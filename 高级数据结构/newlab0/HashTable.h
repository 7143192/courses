#pragma once

#include <iostream>
#include <vector>

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