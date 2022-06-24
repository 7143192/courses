#include<iostream>
#include<algorithm>
#include "cuckoohash.h"
using namespace std;
int t=0;
int f1=false;
bool operator<(set &s1,set &s2)
{
    bool f=true;
    if(s1.key<=s2.key) f=true;
    return f;
}

cuckoohash::cuckoohash()
{
    size=8;
    h0=new set[size];
    h1=new set[size];
    for(int i=0;i<size;++i){
        h0[i].key=-1;
        h1[i].key=-1;
        h0[i].value=-1;
        h1[i].value=-1;
    }
}

cuckoohash::~cuckoohash()
{
    delete h0;
    delete h1;
}

int cuckoohash::H0(int key)
{
    return key%size;
}

int cuckoohash::H1(int key)
{
    return (key/size)%size;
}

void cuckoohash::resize()
{
    size*=2;
    h0=new set[size];
    h1=new set[size];
    for(int i=0;i<size;++i){
        h0[i].key=-1;
        h0[i].value=-1;
        h1[i].key=-1;
        h1[i].value=-1;
    }
}

void cuckoohash::rehash(int key,int value)
{
    set *a=new set[size];
    set *b=new set[size];
    int s=size;
    for(int i=0;i<s;++i){
        a[i].key=h0[i].key;
        a[i].value=h0[i].value;
        b[i].key=h1[i].key;
        b[i].value=h1[i].value;
    }
    size*=2;
    h0=new set[size];
    h1=new set[size];
    for(int i=0;i<size;++i){
        h0[i].key=-1;
        h0[i].value=-1;
        h1[i].key=-1;
        h1[i].value=-1;
    }
    for(int i=0;i<s;++i){
        if(a[i].key!=-1) cuckoohash::Insert(a[i].key,a[i].value);
    }
    for(int i=0;i<s;++i){
        if(b[i].key!=-1) cuckoohash::Insert(b[i].key,b[i].value);
    }
    cuckoohash::Insert(key,value);
}

void cuckoohash::Lookup(int key)
{
    int s1=H0(key);
    int s2=H1(key);
    if(h0[s1].key!=key&&h1[s2].key!=key){cout<<"Key Not Found"<<endl;}
    else{
        if(h0[s1].key==key) cout<<h0[s1].value<<endl;
        else{
            if(h1[s2].key==key) cout<<h1[s2].value<<endl;
        }
    }
}

void cuckoohash::Delete(int key)
{
    int s1=H0(key);
    int s2=H1(key);
    if(h0[s1].key!=key&&h1[s2].key!=key){cout<<"Key Not Found"<<endl;return ;}
    if(h0[s1].key==key){
        h0[s1].key=-1;
        h0[s1].value=-1;
        return ;
    }
    else{
        h1[s2].key=-1;
        h1[s2].value=-1;
        return ;
    }
}

void cuckoohash::Kick1(int key,int value)
{
    int s1=H0(key);
    set s=h0[s1];
    if(s.key==-1){
        h0[s1].key=key;
        h0[s1].value=value;
        t=0;
        return ;
    }
    else{
        if(s.key==key){h0[s1].value=value;return ;}
        cout<<"Kick "<<s.key<<" with "<<key<<" in table "<<"0 "<<s1<<endl;
        h0[s1].key=key;
        h0[s1].value=value;
        t++;
        if(t==2*size){t=0;cout<<"Loop Detect"<<endl;f1=true;cuckoohash::rehash(s.key,s.value);return ;}
        Kick2(s.key,s.value);
    }
}

void cuckoohash::Kick2(int key,int value)
{
    int s1=H1(key);
    set s=h1[s1];
    if(s.key==-1){
        h1[s1].key=key;
        h1[s1].value=value;
        t=0;
        return ;
    }
    else{
        if(s.key==key){h1[s1].value=value;return ;}
        cout<<"Kick "<<s.key<<" with "<<key<<" in table "<<"1 "<<s1<<endl;
        h1[s1].key=key;
        h1[s1].value=value;
        t++;
        if(t==2*size){t=0;cout<<"Loop Detect"<<endl;f1=true;cuckoohash::rehash(s.key,s.value);return ;}
        Kick1(s.key,s.value);
    }
}

void cuckoohash::Insert(int key,int value)
{
    int s1=H0(key);
    int s2=H1(key);
    if(h0[s1].key==-1){
        h0[s1].key=key;
        h0[s1].value=value;
        return ;
    }
    if(h1[s2].key==-1){
        h1[s2].key=key;
        h1[s2].value=value;
        return ;
    }
    Kick1(key,value);
    return ;
}
