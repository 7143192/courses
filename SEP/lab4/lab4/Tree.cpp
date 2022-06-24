#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <iostream>
#include <fstream>
#include <limits.h>
#include <vector>
#include <queue>
#include <algorithm>

#include "Tree.h"

using namespace std;

/****************************************************************
 *                    Write your code below
 ****************************************************************/

int k=1;
int l=0;
void insert(int x,int y,TreeNode *&t,int l);

ostream &operator<<(ostream &out, TreeNode &b)
{
    out<<b.getX()<<" "<<b.getY()<<endl;
    return out;
}

void insert(int x,int y,TreeNode *&t,int l)
{
    if(t==NULL){
        t=new TreeNode(x,y);
        return ;
    }
    else{
        if(l==0){
            if(x<t->getX()) insert(x,y,t->left,(l+1)%2);
            else insert(x,y,t->right,(l+1)%2);
        }
        else{
            if(y<t->getY()) insert(x,y,t->left,(l+1)%2);
            else insert(x,y,t->right,(l+1)%2);
        }
    }
}

istream &operator>>(istream &in, BinaryDimonTree &tree)
{
    in>>tree.m;
    int x=0,y=0;
    in>>x;
    in>>y;
    tree.root=new TreeNode(x,y);
    for(int i=1;i<tree.m;++i){
        in>>x;
        in>>y;
        insert(x,y,tree.root,l);
    }
    return in;
}

void BinaryTree::clear(BinaryTree::node *&t)
{
    if(t==NULL) return ;
    clear(t->left);
    clear(t->right);
    delete t;
    t=NULL;
}

void BinaryTree::clear()
{
    clear(root);
}

BinaryTree::~BinaryTree()
{
    clear();
}

int TreeNode::getX()
{
    return data[0];
}

int TreeNode::getY()
{
    return data[1];
}

TreeNode::TreeNode(int x,int y)
{
    data[0]=x;
    data[1]=y;
    left=NULL;
    right=NULL;
}

TreeNode::~TreeNode()
{
    delete left;
    delete right;
}

BinaryDimonTree::BinaryDimonTree()
{
    root=new TreeNode();
    m=1;
}

void BinaryDimonTree::clear(TreeNode *&t)
{
    if(t==NULL) return ;
    clear(t->left);
    clear(t->right);
    delete t;
    t=NULL;
}

BinaryDimonTree::~BinaryDimonTree()
{
    clear(root);
}

long long int BinaryDimonTree::dis(TreeNode *cur,TreeNode *testpoint)
{
    int x1=cur->getX();
    int x2=testpoint->getX();
    int y1=cur->getY();
    int y2=testpoint->getY();
    long long int distance=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    return distance;
}

void BinaryDimonTree::recur_search(TreeNode *cur, int x, int y, long long int &min_distance, TreeNode **guess)
{
    if(cur==NULL) return ;
    TreeNode *test=new TreeNode(x,y);
    if(dis(cur,test)<min_distance){
        min_distance=dis(cur,test);
        *guess=cur;
    }
    if(dis(cur,test)==min_distance){
        if(cur->getX()<(*guess)->getX()){*guess=cur;}
        else{
            if(cur->getX()==(*guess)->getX()){
                if(cur->getY()<=(*guess)->getY()){*guess=cur;}
            }
        }
    }
    if(l==0){
        l=(l+1)%2;
        if(x<cur->getX()){
            recur_search(cur->left,x,y,min_distance,guess);
            if(abs(cur->getX()-x)<min_distance) recur_search(cur->right,x,y,min_distance,guess);
        }
        else{
            recur_search(cur->right,x,y,min_distance,guess);
            if(abs(cur->getX()-x)<min_distance) recur_search(cur->left,x,y,min_distance,guess);
        }
    }
    else{
        l=(l+1)%2;
        if(y<cur->getY()){
            recur_search(cur->left,x,y,min_distance,guess);
            if(abs(cur->getY()-y)<min_distance) recur_search(cur->right,x,y,min_distance,guess);
        }
        else{
            recur_search(cur->right,x,y,min_distance,guess);
            if(abs(cur->getY()-y)<min_distance) recur_search(cur->left,x,y,min_distance,guess);
        }
    }
}

TreeNode *BinaryDimonTree::find_nearest_node(int x, int y)
{
    TreeNode *guess=NULL;
    long long int bestdis=100000;
    recur_search(root,x,y,bestdis,&guess);
    l=0;
    return guess;
}
