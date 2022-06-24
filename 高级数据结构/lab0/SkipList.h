#pragma once

#include <vector>
#include <climits>
 #include <cstdlib>
#include "Container.h"
#include <ctime> //测试的时候使用
#define MAX_LEVEL 8

enum SKNodeType
{
    HEAD = 1,
    NORMAL,
    NIL
};

struct SKNode
{
    int key;
    int val;
    SKNodeType type;
    std::vector<SKNode *> forwards;
    SKNode(int _key, int _val, SKNodeType _type)
        : key(_key), val(_val), type(_type)
    {
        for (int i = 0; i < MAX_LEVEL; ++i)
        {
            forwards.push_back(nullptr);
        }
    }
};

class SkipList : public Container
{
private:
    SKNode *head;
    SKNode *NIL;
    unsigned long long s = 1;
    double my_rand();
    int randomLevel();
    //以下是测试的时候会用到的变量
    std::vector<SKNode*> testans;
    /*clock_t InsertTimes = 0;
    clock_t SearchTimes = 0;
    clock_t DeleteTimes = 0;
    clock_t ScopeTimes = 0;*/

public:
    SkipList()
    {
        head = new SKNode(0, 0, SKNodeType::HEAD);
        NIL = new SKNode(INT_MAX, 0, SKNodeType::NIL);
        for (int i = 0; i < MAX_LEVEL; ++i)
        {
            head->forwards[i] = NIL;
        }
        srand(1);
    }
    void Insert(int key, int value);
    void Search(int key);
    void Delete(int key);
    void Display();
    //以下是进行测试用到的函数
    void SearchScope(int low, int high);
    ~SkipList()
    {
        SKNode *n1 = head;
        SKNode *n2;
        while (n1)
        {
            n2 = n1->forwards[0];
            delete n1;
            n1 = n2;
        }
    }
};
