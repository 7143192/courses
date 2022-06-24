#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>
#include <cmath>
#include <ctime>
#include <windows.h>
#include "Splay.h"
#include "AVL.h"
using namespace std;
int M = 10000;//每次进行查找时的查找次数
int N = 100;//插入的元素个数

int main()
{
    SplayTree<int, int> splay;
    AVL* avl = new AVL();
    for(int i = 0;i < N;++i){   //首先插入n个元素
        avl->Insert(i, avl->root);
        splay.insert(i, i);
    }

    double total1 = 0;
    double total2 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    /*ifstream input;
    input.open(files[4], ios::in);//记得要打开文件
    std::string line = "";
    for(int i = 0;i < M;++i){
        getline(input, line);
        int val = atoi(line.c_str());
        //记录avl的查找总时间
        QueryPerformanceCounter(&t1);
        avl->Search(val);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        //记录splay的查找总时间
        QueryPerformanceCounter(&t1);
        splay.search(val);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
        line = "";
    }
    input.close();//记得关闭文件*/
    for(int i = 0;i < M;++i){
        int val = i % 85 + 1;
        //int val =1;
        QueryPerformanceCounter(&t1);
        avl->Search(val);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        splay.search(val);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"AVL:"<<total1<<endl;
    cout<<"SPLAY:"<<total2<<endl;
}
