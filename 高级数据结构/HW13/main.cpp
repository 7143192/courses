#include <iostream>
#include <windows.h>
#include <vector>
#include <thread>
#include "CuckooHash.h"
using namespace std;
double scale[4] = {0.1, 0.5, 0.75, 1};
int main()
{
    int maxsize = 100000;
    double total1 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    CuckooHash ch(maxsize);
    /*for(int k = 0;k < 4;++k){
        int insertNum = int(maxsize * scale[k]);
        for(int i = 0;i < insertNum;++i){
            int val = i + 1;
            ch.Insert(val);
        }
        for(int i = 1;i <= insertNum;++i){
            QueryPerformanceCounter(&t1);
            ch.Search(i);
            QueryPerformanceCounter(&t2);
            total1 += (double)(t2.QuadPart-t1.QuadPart);
        }
        cout<<"search total time_"<<scale[k]<< ":" <<total1<<endl;
        total1 = 0;
        ch.Clear();
    }*/
    vector<thread> threads;
    for(int k = 0;k < maxsize * 0.1;++k){//负载因子选定为1
        for(int i = 0;i < 10;++i){
            QueryPerformanceCounter(&t1);
            ch.Insert((k + 1) * i);
            QueryPerformanceCounter(&t2);
            total1 += (double)(t2.QuadPart-t1.QuadPart);
        }
        for(int i = 0;i < 100;++i){
            int val = (k + 1);
            thread t(&CuckooHash::Search,&ch, val);//实现并行的get
            t.detach();
        }
        //for(int i = 0;i < 1000;++i) threads[i].join();
    }
    cout<<"total time:"<<total1<<endl;
    return 0;
}
