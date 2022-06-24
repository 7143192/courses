#include <iostream>

#include "HashTable.h"

int HashTable::hash(int key)
{
    return key % BUCKET_SIZE;
}

void HashTable::Insert(int key, int value)
{
    // TODO
}

void HashTable::Search(int key)
{
    // TODO
}

void HashTable::Delete(int key)
{
    // TODO
}

void HashTable::Display()
{
    for (int i = 0; i < BUCKET_SIZE; ++i)
    {
        std::cout << "|Bucket " << i << "|";
        HashNode *node = bucket[i];
        while (node)
        {
            std::cout << "-->(" << node->key << "," << node->val << ")";
            node = node->next;
        }
        std::cout << "-->" << std::endl;
    }
}