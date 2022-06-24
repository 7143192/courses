#include "BF.h"
#include <iostream>
#include <cmath>
#include <map>
#include <cstdio>
#include <string>
#include <cstring>
#include <unordered_map>
#include <unordered_set>
using namespace std;

int BloomFilter::Hash(int val,int i)
{
    std::string s = "";
    s = std::to_string(val + i * MAX_SIZE);
    size_t ans = std::hash<std::string>()(s);
    //cout<<(ans % MAX_SIZE)<<endl;
    return (ans % MAX_SIZE);
}

void BloomFilter::insert(int val)
{
    for(int i = 0;i < NumofHash;++i){
        //string s = std::to_string(val + i);
        //int pos = Hash32(s.c_str(),strlen(s.c_str()),17);
        int pos = Hash(val,i);
        HashTable[pos] = 1;
    }
    return ;
}

bool BloomFilter::Search(int val)
{
    int *findpos = new int[NumofHash];
    for(int i = 0;i < NumofHash;++i) findpos[i] = 0;
    for(int i = 0;i < NumofHash;++i){
        //string s = std::to_string(val + i);
        findpos[i] = Hash(val,i);
    }
    for(int i = 0;i < NumofHash;++i){
        if(HashTable[findpos[i]] != 1) return false;
    }
    return true;
}


