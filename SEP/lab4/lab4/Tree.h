//
// Created by Smile on 2019/4/8.
//

#ifndef C_BINARYDIMEN_TREE_H
#define C_BINARYDIMEN_TREE_H

#include <stdio.h>
#include <iostream>
#include <vector>
using namespace std;

/****************************************************************
 *                    Write your code below
 ****************************************************************/



class BinaryTree
{
private:
    struct node
    {
        int x,y;
        node *left,*right;
        node():left(NULL),right(NULL){}
        node(int x0=0,int y0=0,node *l=NULL,node *r=NULL):x(x0),y(y0),left(l),right(r){}
        ~node(){}
    };
public:
    node *root;
    ~BinaryTree();
    BinaryTree():root(NULL){};
    BinaryTree(int x){root=new node(x);}
    bool isempty(){return root==NULL;}
    void clear();
    void clear(BinaryTree::node *&t);
};

class TreeNode
{
    friend ostream &operator<<(ostream &out, TreeNode &b);
    friend class BinaryTree;
    friend class BinaryDimonTree;

private:
  /* data */
    int data[2];
public:
  /* methods */
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x=0,int y=0);
    int getX();  /* DO NOT CHANGE */
    int getY();  /* DO NOT CHANGE */
    ~TreeNode(); /* DO NOT CHANGE */
};


class BinaryDimonTree
{
friend istream &operator>>(istream &in, BinaryDimonTree &tree); /* DO NOT CHANGE */

private:
  /* data */
    TreeNode *root;
    int m;
public:
  /* methods */
    BinaryDimonTree();          /* DO NOT CHANGE */
    TreeNode *find_nearest_node(int x, int y);  /* DO NOT CHANGE */
    ~BinaryDimonTree();
    void clear(TreeNode *&t);
    void recur_search(TreeNode *cur, int x, int y, long long int &min_distance, TreeNode **guess);
    long long int dis(TreeNode *cur,TreeNode *testpoint);
};

#endif //C_BINARYDIMEN_TREE_H
