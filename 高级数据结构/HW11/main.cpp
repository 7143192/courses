#include <iostream>
#include <fstream>
#include <ctime>
#include <windows.h>
using namespace std;

int SimpleMatch(string T, string P)//简单的匹配版本
{
    int n = T.length();
    int m = P.length();
    int i = 0;
    int j = 0;
    while(j < m && i < n){
        if(T[i] == P[j]){
            i++;
            j++;
        }
        else{
            i -= (j - 1);
            j = 0;
        }
    }
    return (i - j);
}

int* BuildNext(string P)//根据匹配模式串P生成前驱
{
    int m = P.length();
    int* ans = new int[m];
    int t = ans[0] = -1;
    int j = 0;
    while(j < (m - 1)){
        if(t < 0 || P[t] == P[j]){
            ans[++j] = ++t;
        }
        else t = ans[t];
    }
    return ans;
}

int KMPMatch(string T, string P)//KMP匹配版本
{
    int* next = BuildNext(P);
    int n = T.length();
    int m = P.length();
    int i = 0, j = 0;
    while(j < m && i < n){
        if(j < 0 || T[i] == P[j]){
            i++;
            j++;
        }
        else{
            j = next[j];
        }
    }
    delete []next;//记得释放内存！
    return (i - j);
}

int main()
{
    string p1 = string("23", 5);
    string p2 = string("23", 10);
    string p3 = string("23", 20);
    string p4 = string("23", 30);//构造四个匹配模式字符串，用于匹配算法使用
    ifstream file, file1, file2, file3;
    file.open("./100_1.txt");
    file1.open("./1000_1.txt");
    file2.open("./10000_1.txt");
    file3.open("./100000_1.txt");
    string line = "";
    string t_100 = "";
    string t_1000 = "";
    string t_10000 = "";
    string t_100000 = "";
    double total1 = 0;
    double total2 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    while(getline(file, line)){
        t_100 += line;
        line = "";
    }
    while(getline(file1, line)){
        t_1000 += line;
        line = "";
    }
    while(getline(file2, line)){
        t_10000 += line;
        line = "";
    }
    while(getline(file3, line)){
        t_100000 += line;
        line = "";
    }//生成四组的字符串各一个
    for(int i = 0;i < 5;++i){
        QueryPerformanceCounter(&t1);
        SimpleMatch(t_100, p4);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        KMPMatch(t_100, p4);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"simple_100:"<<(total1 / 5)<<endl;
    cout<<"kmp_100:"<<(total2 / 5)<<endl;
    total1 = 0;
    total2 = 0;
    for(int i = 0;i < 5;++i){
        QueryPerformanceCounter(&t1);
        SimpleMatch(t_1000, p4);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        KMPMatch(t_1000, p4);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"simple_1000:"<<(total1 / 5)<<endl;
    cout<<"kmp_1000:"<<(total2 / 5)<<endl;
    total1 = 0;
    total2 = 0;
    for(int i = 0;i < 5;++i){
        QueryPerformanceCounter(&t1);
        SimpleMatch(t_10000, p4);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        KMPMatch(t_10000, p4);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"simple_10000:"<<(total1 / 5)<<endl;
    cout<<"kmp_10000:"<<(total2 / 5)<<endl;
    total1 = 0;
    total2 = 0;
    for(int i = 0;i < 5;++i){
        QueryPerformanceCounter(&t1);
        SimpleMatch(t_100000, p4);
        QueryPerformanceCounter(&t2);
        total1 += (double)(t2.QuadPart-t1.QuadPart);
        QueryPerformanceCounter(&t1);
        KMPMatch(t_100000, p4);
        QueryPerformanceCounter(&t2);
        total2 += (double)(t2.QuadPart-t1.QuadPart);
    }
    cout<<"simple_100000:"<<(total1 / 5)<<endl;
    cout<<"kmp_100000:"<<(total2 / 5)<<endl;
    return 0;
}
