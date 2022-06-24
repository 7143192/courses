#include <iostream>
#include <fstream>
#include "Graph.h"
using namespace std;

int main()
{
    const int d[5] = {1, 2, 4, 3, 5};
    AdjListGraph alg(5, d);
    const int d1[7] = {5, 7, 6, 2, 4, 1, 3};
    AdjListGraph alg1(7, d1);
    ifstream file;
    file.open("./input1.txt", ios::out);
    string line = "";
    for(int i = 0;i < 11;++i){
        getline(file, line);
        int pos = line.find(',');
        int start = atoi(line.substr(0, pos).c_str());
        int end = atoi(line.substr(pos + 1).c_str());
        //alg.Insert(start, end, 1);//每条边的权重设置为1
        alg1.Insert(start, end, 1);//每条边的权重设置为1
        line = "";
    }
    file.close();
    ifstream file1;
    file1.open("./input.txt", ios::out);
    string line1 = "";
    for(int i = 0;i < 7;++i){
        getline(file1, line1);
        int pos = line1.find(',');
        int start = atoi(line1.substr(0, pos).c_str());
        int end = atoi(line1.substr(pos + 1).c_str());
        alg.Insert(start, end, 1);//每条边的权重设置为1
        //alg1.Insert(start, end, 1);//每条边的权重设置为1
        line1 = "";
    }
    file1.close();
    alg.TopSort();//进行拓扑排序并输出最终结果
    alg1.TopSort();//进行拓扑排序并输出最终结果
    return 0;
}
