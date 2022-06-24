#pragma once

#include <vector>
#include <climits>
 #include <cstdlib>
#include <time.h>
#include <cmath>
#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>
#include <cstdlib>
using namespace std;
#include "Container.h"
#define MAX_LEVEL 3
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
    double average = 0;
    std::vector<double> length;
    double randnum[10000];
    int randpos = 0;
    double my_rand();
    int randomLevel();

public:
    SkipList()
    {
        head = new SKNode(0, 0, SKNodeType::HEAD);
        NIL = new SKNode(INT_MAX, 0, SKNodeType::NIL);
        //MAX_LEVEL = log(10) / log(2);   //生成理论最大层数
        for (int i = 0; i < MAX_LEVEL; ++i)
        {
            head->forwards[i] = NIL;
        }
        ifstream input("./data.txt");
        int i = 0;
        string num;
        while(getline(input,num)){
            randnum[i] = atof(num.c_str());
            i++;
        }
        input.close();
        srand((unsigned)time(0));
        randpos = rand() % 10000;
    }
    void Insert(int key, int value);
    void Search(int key);
    void Delete(int key);
    void Display();
    void SearchTimes();
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
