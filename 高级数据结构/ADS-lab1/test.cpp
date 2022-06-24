#include <iostream>
#include <ctime>
#include <windows.h>
#include <fstream>
#include "ScapegoatTree.h"
#include "AVL.h"
using namespace std;

int main()
{
    ScapegoatTree sgt;
    AVL *avl = new AVL();
    int num = 2000;
    double total = 0;
    double total1 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    for(int i = 0;i < num;++i){
        int val = i + 1;
        QueryPerformanceCounter(&t1);
        sgt.Insert(val);
        QueryPerformanceCounter(&t2);
        total += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        avl->Insert(val, avl->root);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"SGT Insert Time:"<<total / num<<endl;
    cout<<"AVL Insert Time:"<<total1 / num<<endl;
    total = 0;
    total1 = 0;
    for(int i = 0;i < num;++i){
        int val = i + 1;
        QueryPerformanceCounter(&t1);
        sgt.Search(val);
        QueryPerformanceCounter(&t2);
        total += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        avl->Search(val);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"SGT Search Time:"<<total / num<<endl;
    cout<<"AVL Search Time:"<<total1 / num<<endl;
    total = 0;
    total1 = 0;
    for(int i = 0;i < num;++i){
        int val = i + 1;
        QueryPerformanceCounter(&t1);
        sgt.Delete(val);
        QueryPerformanceCounter(&t2);
        total += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        avl->Delete(val, avl->root);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"SGT Delete Time:"<<total / num<<endl;
    cout<<"AVL Delete Time:"<<total1 / num<<endl;
    total = 0;
    total1 = 0;
    return 0;
}
