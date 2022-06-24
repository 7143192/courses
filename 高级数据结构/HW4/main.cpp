#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>
#include <cmath>
#include <ctime>
#include <windows.h>
#include "Container.h"
#include "SkipList.h"
#include "AVL.h"
using namespace std;
double total1;
void build_container(Container *container, string input_file_path)
{
    ifstream inputData;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    /*inputData.open(input_file_path, ios::in);
    if(!inputData) {
        cout << "[error]: file " << input_file_path << " not found." << endl;
        inputData.close();
        return;
    }

    string line;
    while (inputData >> line)
    {
        int bracketPos = line.find('(');
        string op = line.substr(0, bracketPos);
        string param = line.substr(bracketPos + 1, line.size() - bracketPos - 2);
            int commaPos = param.find(',');
            int key = atoi(param.substr(0, commaPos).c_str());
            int val = atoi(param.substr(commaPos + 1).c_str());
            QueryPerformanceCounter(&t1);
            container->Insert(key, val);
            QueryPerformanceCounter(&t2);
            total1 += (double)(t2.QuadPart-t1.QuadPart);
    }
    //container->Display();
    inputData.close();*/
    for(int val = 2000;val >= 0;--val){
        QueryPerformanceCounter(&t1);
        container->Insert(val, val);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
    }
}


int main()
{
    AVL *avltree = new AVL();
    SkipList skiplist;
    build_container(&skiplist, "./2000.txt");
    cout<<total1<<endl;
    double total = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    /*ifstream in;
    in.open("./2000.txt",ios::in);
    string line;
    while (in >> line)
    {
        int val = stoi(line.c_str());
        QueryPerformanceCounter(&t1);
        avltree->Insert(val, avltree->root);
        QueryPerformanceCounter(&t2);
        total += (double)(t2.QuadPart-t1.QuadPart);
    }
    in.close();*/
    for(int i = 2000;i >= 0;--i){
        QueryPerformanceCounter(&t1);
        avltree->Insert(i, avltree->root);
        QueryPerformanceCounter(&t2);
        total += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout <<total<<endl;
    return 0;
}
