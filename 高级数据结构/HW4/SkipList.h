#pragma once

#include <vector>
#include <climits>
#include <time.h>
#include <fstream>
#include <string>
#include <cstdlib>
#include <cmath>
#include "Container.h"

#define MAX_LEVEL 3//最大层数，由L(n) = log(n)/log(1/p)确定(向上取整),应视情况修改
#define p 0.0625//概率，视情况修改

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
    int l = 1;//skiplist level
    int randomLevel();
    int position = 0;//随机下标以确定此次建表所访问的随机数数组位置
    double rand[10000];//用于存储外部文件中随机数的数组

public:
    SkipList()
    {
        head = new SKNode(0, 0, SKNodeType::HEAD);
        NIL = new SKNode(INT_MAX, 0, SKNodeType::NIL);
        for (int i = 0; i < MAX_LEVEL; ++i)
        {
            head->forwards[i] = NIL;
        }
        std::ifstream in("./data.txt");
        int i = 0;
        std::string data;
        while(getline(in,data)){
            rand[i] = atof(data.c_str());
            i++;
        }
        in.close();//从data.txt文件中读取10000个随机数并存储
        srand((unsigned)time(0));
        position = std::rand() % 10000;
    }
    void Insert(int key, int value);
    int Search(int key);
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
