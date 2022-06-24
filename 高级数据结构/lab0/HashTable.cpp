#include <iostream>
using namespace std;
#include "HashTable.h"

int HashTable::hash(int key)
{
    return key % BUCKET_SIZE;
}

void HashTable::Insert(int key, int value)
{
    // TODO
    int pos = hash(key);
    HashNode* hn = bucket[pos];
    if(hn == nullptr){
    bucket[pos] = new HashNode(key, value);
    return ;
    }
    HashNode* p = bucket[pos];
    if(p->key == key){
        p->val = value;
    return ;
    }
    while(p->next != nullptr){
        if(p->key == key){
        p->val = value;
        return ;
    }
    p = p->next;
    }
    if(p->key == key){
        p->val = value;
    return ;
    }
    p->next = new HashNode(key, value);
    return ;

}

void HashTable::Search(int key)
{
    // TODO
    int pos = hash(key);
    int num = 0;
    //int value = 0;
    HashNode* p = bucket[pos];

    if(p == nullptr){
        cout<<"Not Found"<<endl;
    return ;
    }
    if(p->key == key){
        cout<<"bucket "<<pos<<" index "<<num<<" key "<<key<<" value "<<p->val<<endl;
    return ;
    }
    while(p->next != nullptr){
        if(p->key == key){
        cout<<"bucket "<<pos<<" index "<<num<<" key "<<key<<" value "<<p->val<<endl;
        return ;
    }
    num++;
    p = p->next;
    }
    if(p->next == nullptr && p->key != key){
        cout<<"Not Found"<<endl;
    return ;
    }
    cout<<"bucket "<<pos<<" index "<<num<<" key "<<key<<" value "<<p->val<<endl;
    return ;
}

void HashTable::Delete(int key)
{
    // TODO
    int pos = hash(key);
    if(bucket[pos] == nullptr) return ;
    if(bucket[pos]->next == nullptr && bucket[pos]->key != key) return ;
    HashNode* q = bucket[pos];
    if(q->key == key){
        if(q->next){
        bucket[pos] = q->next;
    }
    else bucket[pos] = nullptr;
    delete q;
    return ;
    }
    HashNode* p = bucket[pos]->next;
    if(p->key == key){
        bucket[pos]->next = p->next;
    delete p;
    return ;
    }
    HashNode* hn = bucket[pos];
    while(p->next != nullptr){
        if(p->key == key){
        hn->next = p->next;
        delete p;
        return ;
    }
    hn = hn->next;
    p = p->next;
    }
    if(p->key == key){
        hn->next = nullptr;
    delete p;
    return ;
    }
    return ;
}

void HashTable::Display()
{
    for (int i = 0; i < BUCKET_SIZE; ++i)
    {
        std::cout << "|Bucket " << i << "|";
        HashNode *node = bucket[i];
        while (node)
        {
            std::cout << "-->(" << node->key << "," << node->val << ")";
            node = node->next;
        }
        std::cout << "-->" << std::endl;
    }
}

//以下是为测试额外加的函数对应的代码
void HashTable::SearchScope(int low, int high)//进行范围查找
{
    //clock_t Start = clock();
    for(int i = 0;i < BUCKET_SIZE;++i){
        HashNode* p = bucket[i];
        if(!p) continue;
        while(p != nullptr){
            if(p->key >= low && p->key <= high) testans.push_back(p);
            p = p->next;
        }
    }
    //clock_t End = clock();
    //ScopeTimes = End - Start;
    int s = testans.size();
    if(s == 0) cout<<"Not Found!"<<endl;
    else{
        for(int i = 0;i < s;++i){
            cout<<testans[i]->key<<","<<testans[i]->val<<endl;
        }
    }
    return ;
}
