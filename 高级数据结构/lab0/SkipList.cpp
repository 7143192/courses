#include <iostream>
#include <stdlib.h>
using namespace std;
#include "SkipList.h"

int LEVEL = 0;

double SkipList::my_rand()
{
    s = (16807 * s) % 2147483647ULL;
    return (s + 0.0) / 2147483647ULL;
}

int SkipList::randomLevel()
{
    int result = 1;
    while (result < MAX_LEVEL && my_rand() < 0.5)
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
    //int level = 0;
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
    //cout<<LEVEL<<endl;
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
    //SKNode* q = head;
    //int FindLevel = 0;
    int i;
    for(i = l - 1;i >= 0;--i){
        if(!head->forwards[i]->forwards[i]) cout<<i + 1<<",h ";
        else{
            LEVEL = i + 1;
            break;
        }
    }
    if(i == -1){
        LEVEL = 1;
        cout<<"1,N Not Found"<<endl;
        return ;
    }
    if(LEVEL == 0){
        cout<<"Not Found"<<endl;
        return ;
    }
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
        if(p->type == 1) cout<<i + 1<<",h ";
        if(p->type == 3) cout<<i + 1<<",N ";
        if(p->type == 2) cout<<i + 1<<","<<p->key<<" ";
        p = p->forwards[i];
        //if(p->type == 3) cout<<i + 1<<",N ";
        //if(p->type == 2) cout<<i + 1<<","<<p->key<<" ";
    }
    if(p->forwards[i] && p->forwards[i]->key >= key){
        if(p->type == 1) cout<<i + 1<<",h ";
        if(p->type == 2) cout<<i + 1<<","<<p->key<<" ";
    }
    }
    p = p->forwards[0];
    if(p->type == 1) cout<<"1,h ";
    else if(p->type == 3) cout<<"1,N ";
    else cout<<"1,"<<p->key<<" ";
    //p = p->forwards[0];
    if(p && p->key == key){
        cout<<p->val<<endl;
    return ;
    }
    else{
        cout<<"Not Found"<<endl;
    return ;
    }
}

void SkipList::Delete(int key)
{
    //TODO
    std::vector<SKNode*> update(MAX_LEVEL);
    SKNode* p = head;
    //SKNode* q = head;
    int l = MAX_LEVEL;
    for(int i = l - 1;i >= 0;--i){
        if(p->type == 3) continue;
    else{
        LEVEL = i + 1;
        break;
    }
    }
    if(LEVEL == 0) return ;
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < key){
        p = p->forwards[i];
    }
    update[i] = p;
    }
    p = p->forwards[0];
    if(!p) return ;
    if(p->key != key) return ;
    else{
        for(int i = 0;i < LEVEL;++i){
        if(update[i]->forwards[i] != p) break;
        update[i]->forwards[i] = p->forwards[i];
    }
    delete p;
    while(LEVEL > 1 && head->forwards[LEVEL] == NIL) LEVEL--;
    }
}

void SkipList::Display()
{
    for (int i = MAX_LEVEL - 1; i >= 0; --i)
    {
        std::cout << "Level " << i + 1 << ":h";
        SKNode *node = head->forwards[i];
        while (node->type != SKNodeType::NIL)
        {
            std::cout << "-->(" << node->key << "," << node->val << ")";
            node = node->forwards[i];
        }

        std::cout << "-->N" << std::endl;
    }
}

//以下是为了进行测试而额外添加的函数
void SkipList::SearchScope(int low, int high)
{
    SKNode* p = head;
    int l = MAX_LEVEL;
    for(int i = l - 1;i >= 0;--i){
        if(p->forwards[i]->type == 3) continue;
        else{
            LEVEL = i + 1;
            break;
        }
    }
    for(int i = LEVEL - 1;i >= 0;--i){
        while(p->forwards[i] && p->forwards[i]->key < low){
            p = p->forwards[i];
        }
        if(p->forwards[i] && p->forwards[i]->key >= low){
            SKNode* q = p->forwards[i];
            while(q && q->key <= high && q->key >= low){
                testans.push_back(q);
                q = q->forwards[i];
            }
        }
    }
    int s = testans.size();
    if(s == 0) cout<<"Not Found!"<<endl;
    else{
        for(int i = 0;i < s;++i){
            cout<<testans[i]->key<<","<<testans[i]->val<<endl;
        }
    }
}
