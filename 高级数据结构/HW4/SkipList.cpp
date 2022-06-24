#include <iostream>
#include <stdlib.h>
#include <random>
#include <ctime>

#include "SkipList.h"


int SkipList::randomLevel()
{
    int result = 1;
    while (result < MAX_LEVEL && rand[position % 10000] < p)
    {
        ++result;
        ++position;
    }
    ++position;
    return result;
}

void SkipList::Insert(int key, int value)
{
    // TODO
    std::vector<SKNode *> update(MAX_LEVEL);
    SKNode* x = head;
    for(int i = l - 1; i >= 0; i--){
        while(x->forwards[i]->key < key) x = x->forwards[i];
        update[i] = x;
    }
    x = x->forwards[0];
    if(x->key == key) x->val = value;
    else{
        int v = randomLevel();
        if(v > l){
            for(int i = l; i < v; i++) update[i] = head;
            l = v;
        }
        x = new SKNode(key, value, NORMAL);
        for(int i = 0; i < v; i++){
            x->forwards[i] = update[i]->forwards[i];
            update[i]->forwards[i] = x;
        }
    }
}

int SkipList::Search(int key)
{
    // TODO
    SKNode* x = head;
    int n = 0;
    for(int i = l - 1; i >= 0; i--){
        /*if(x->type == HEAD) std::cout << i + 1 << ",h ";
        else std::cout << i + 1 << ',' << x->key << ' ';*/
        n++;
        while(x->forwards[i]->key < key){
            x = x->forwards[i];
            //std::cout << i + 1 << ',' << x->key << ' ';
            n++;
        }
    }
    x = x->forwards[0];
    n++;
    if(x->key == key){
        //std::cout << "1," << x->key << ' ' << x->val << std::endl;
    }
    else{
        /*if(x == NIL) std::cout << "1,N ";
        else std::cout << "1," << x->key << ' ';
        std::cout << "Not Found" << std::endl;*/
    }
    return n;
}

