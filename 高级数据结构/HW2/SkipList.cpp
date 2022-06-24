#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>
#include <cstdlib>
using namespace std;
#include "SkipList.h"

int LEVEL = 0;
double e = exp(1);
double SkipList::my_rand()
{
    //s = (16807 * s) % 2147483647ULL;
    //return (s + 0.0) / 2147483647ULL;
    return randnum[randpos % 10000];
}

int SkipList::randomLevel()
{
    int result = 1;
    double a = my_rand();
    while (result < MAX_LEVEL && a <= double(1) / 2)
    {
        ++result;
    }
    return result;
}

void SkipList::Insert(int key, int value)
{
    // TODO
    std::vector<SKNode*> update(MAX_LEVEL);
    SKNode* p = head;
    int l = MAX_LEVEL;
    for(int i = l - 1;i >= 0;--i){
        if(!head->forwards[i]->forwards[i]) continue;
    else{
        LEVEL = i + 1;
        break;
    }
    }
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
        p = p->forwards[i];
    }
    update[i] = p;
    }
    p = p->forwards[0];
    if(!p) return ;
    if(p->key == key){
        p->val = value;
    return ;
    }
    int NewLevel = randomLevel();
    if(NewLevel > MAX_LEVEL) return ;
    if(NewLevel > LEVEL){
        for(int i = LEVEL + 1;i <= NewLevel;++i){
        update[i - 1] = head;
    }
    LEVEL = NewLevel;
    }
    SKNode* New = new SKNode(key, value, NORMAL);
    for(int i = NewLevel - 1;i >= 0;--i){
    p = update[i];
        New->forwards[i] = p->forwards[i];
    p->forwards[i] = New;
    }
    return ;
}

void SkipList::Search(int key)
{
    // TODO
    int l = MAX_LEVEL;
    SKNode* p = head;
    double SearchPath = 0;
    for(int i = l - 1;i >= 0;--i){
        if(!head->forwards[i]->forwards[i]){
            //cout<<i + 1<<",h ";
            SearchPath++;
        }
    else{
        LEVEL = i + 1;
        break;
    }
    }
    if(LEVEL == 0){
        //cout<<"Not Found"<<endl;
        return ;
    }
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
        //if(p->type == 1) cout<<i + 1<<",h ";
        //if(p->type == 3) cout<<i + 1<<",N ";
        //if(p->type == 2) cout<<i + 1<<","<<p->key<<" ";
        p = p->forwards[i];
        SearchPath++;
        //if(p->type == 3) cout<<i + 1<<",N ";
        //if(p->type == 2) cout<<i + 1<<","<<p->key<<" ";
    }
    if(p->forwards[i] && p->forwards[i]->key >= key){
        SearchPath++;
        //if(p->type == 1) cout<<i + 1<<",h ";
        //if(p->type == 2) cout<<i + 1<<","<<p->key<<" ";
    }
    }
    p = p->forwards[0];
    SearchPath++;
    //if(p->type == 1) cout<<"1,h ";
    //else if(p->type == 3) cout<<"1,N ";
    //else cout<<"1,"<<p->key<<" ";
    if(p && p->key == key){
        //cout<<p->val<<endl;
        length.push_back(SearchPath);
        //cout<<SearchPath<<endl;
        return ;
    }
    else{
        length.push_back(SearchPath);
        //cout<<"Not Found"<<endl;
        //cout<<SearchPath<<endl;
        return ;
    }
}

void SkipList::SearchTimes()
{
    srand((unsigned)time(0));
    for(int i = 0;i < 10000;++i){
        int val = rand() % 50 + 1;
        Search(val);
    }
    double ans = 0;
    for(int i = 0;i < 10000;++i){
        ans += length[i];
        //cout<<length[i]<<endl;
    }
    ans = ans / 10000;
    cout<<ans<<endl;
    return ;
}
