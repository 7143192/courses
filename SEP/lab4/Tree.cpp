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

bool X(TreeNode *t1,TreeNode *t2)
{
    return t1->getX()<t2->getX();
}

bool Y(TreeNode *t1,TreeNode *t2)
{
    return t1->getY()<t2->getY();
}

ostream &operator<<(ostream &out, TreeNode &b)
{
    out<<b.getX()<<" "<<b.getY()<<endl;
    return out;
}

void BinaryDimonTree::create(TreeNode *node,int start,int end,int l)
{
    int m=(start+end)/2;
    if(start>=m&&end<=m) return ;
    TreeNode *p1,*p2;
    if(l==0){
        l=(l+1)%2;
        if(start<m){
            sort(s+start-1,s+m-1,X);
            p1=s[(start+m-1)/2-1];
            node->left=p1;
            create(p1,start,m-1,l);
        }
        if(end>m){
            sort(s+m,s+end,X);
            p2=s[(m+end+1)/2-1];
            node->right=p2;
            create(p2,m+1,end,l);
        }
    }
    else{
        l=(l+1)%2;
        if(start<m){
            sort(s+start-1,s+m-1,Y);
            p1=s[(start+m-1)/2-1];
            node->left=p1;
            create(p1,start,m-1,l);
        }
        if(end>m){
            sort(s+m,s+end,Y);
            p2=s[(m+end+1)/2-1];
            node->right=p2;
            create(p2,m+1,end,l);
        }
    }
}

/*void insert(int x,int y,TreeNode *&t,int l)
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
}*/

istream &operator>>(istream &in, BinaryDimonTree &tree)
{
    in>>tree.m;
    int x=0,y=0;
    tree.s=new TreeNode*[tree.m];
    for(int i=0;i<tree.m;++i){
        in>>x;
        in>>y;
        TreeNode *t=new TreeNode(x,y);
        tree.s[i]=t;
    }
    sort(tree.s,tree.s+tree.m);
    tree.root=tree.s[(tree.m-1)/2];
    tree.create(tree.root,1,tree.m,l);
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
    long long int distance=(x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
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
