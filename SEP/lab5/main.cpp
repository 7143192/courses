#include <iostream>
#include "cuckoohash.h"
using namespace std;

int main()
{
    /*int n;
    cin>>n;
    cuckoohash ch;
    int type=0;
    int a=0,b=0;
    cin.get();
    char c=0;
    for(int i=0;i<n;++i){
        int j=0;
        char s[20]={0};
        while(cin.get(c)){
            if(c==' ') break;
            s[j++]=c;
        }
        if(s[0]=='I') type=1;
        else{
            if(s[0]=='L') type=2;
            else type=3;
        }
        switch(type)
        {
            case 1: cin>>a>>b;
                    ch.Insert(a,b);
                    break;
            case 2: cin>>a;
                    ch.Lookup(a);
                    break;
            case 3: cin>>a;
                    ch.Delete(a);
                    break;
        }
        cin.get();
    }

    return 0;*/
    cuckoohash ch;
    for(int i=1;i<=200;++i){
        ch.Insert(i,i);
    }
    for(int i=1;i<=200;++i){
        ch.Lookup(i);
    }
    for(int i=1;i<=100;++i){
        ch.Delete(i);
    }
    for(int i=1;i<=200;++i){
        ch.Lookup(i);
    }
}
