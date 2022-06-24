#include <iostream>
#include "BF.h"
using namespace std;

int main()
{
    BloomFilter BF;
    for(int i = 0;i < 100;++i){
        BF.insert(i);//进行初始化插入
    }
    int foundnum = 0;
    for(int i = 100;i < 200;++i){
        if(BF.Search(i) == true){
            foundnum++;
        }
    }
    cout<<"Positive False Rate:"<<foundnum<<endl;
    return 0;
}
