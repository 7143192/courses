#include <iostream>
#include "AVL.h"
#include "RBTree.h"
#include <ctime>
#include <windows.h>
#include <fstream>
using namespace std;

int main()
{
    AVL* avl = new AVL();
    RBTree* rb = new RBTree(nullptr);
    avl->times = 0;
    rb->times = 0;
    double total1 = 0;
    double total2 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    //顺序插入(这里插入的500个数据用于查询性能的分析)
    for(int i = 0;i < 500;++i){
        int val = i + 1;
        QueryPerformanceCounter(&t1);
        avl->Insert(val, avl->root);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        rb->insert(val);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }
    //乱序插入(具体数据存储在对应文件中，每个文件的名字为该文件中的数据个数以及范围(从1开始))
    /*ifstream file;
    file.open("./500.txt", ios::in);
    std::string line = "";
    for(int i = 0;i < 500;++i){
        getline(file, line);
        int val = atoi(line.c_str()) + 1;
        QueryPerformanceCounter(&t1);
        avl->Insert(val, avl->root);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        rb->insert(val);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }*/
    //进行查找并计时(顺序查找)
    /*for(int i = 0;i < 150;++i){
        int val = i + 1;
        QueryPerformanceCounter(&t1);
        avl->Search(val);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        rb->search(val);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }*/
    //进行查找并计时(乱序插入)
    /*ifstream file;
    file.open("./300.txt", ios::in);
    std::string line = "";
    for(int i = 0;i < 300;++i){
        getline(file, line);
        int val = atoi(line.c_str()) + 1;
        QueryPerformanceCounter(&t1);
        avl->Search(val);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        rb->search(val);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }*/
    cout<<"time of avl:"<<total1<<endl;
    cout<<"time of rb:"<<total2<<endl;
    cout<<"rotate times of avl:"<<avl->times<<endl;
    cout<<"rotate times of rb:"<<rb->times<<endl;
    return 0;
}
