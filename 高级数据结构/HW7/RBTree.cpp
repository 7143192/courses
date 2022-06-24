#include "RBTree.h"
#include <algorithm>
using namespace std;
RBTree::RBNode* RBTree::search(int val)//查找函数
{
    RBNode* t = root;
    while(t != nullptr && t->data != val){
        if(t->data < val) t = t->right;
        else t = t->left;
    }
    if(t == nullptr) return nullptr;
    return t;
}

//四个用于旋转的函数
void RBTree::LL(RBNode* gp)
{
    RBNode* p = gp->left;
    RBNode* t = p->left;
    RBNode tmp = *gp;
    gp->data = p->data;//注意这里的处理，实际上是通过交换data的方式来间接的交换两个节点的位置
    gp->left = t;
    gp->right = p;
    p->data = tmp.data;
    p->left = p->right;
    p->right = tmp.right;
}

void RBTree::LR(RBNode* gp)
{
    RBNode* p = gp->left;
    RBNode* t = p->right;
    RBNode tmp = *gp;
    gp->data = t->data;
    gp->right = t;
    p->right = t->left;
    t->data = tmp.data;
    t->left = t->right;
    t->right = tmp.right;
}

void RBTree::RR(RBNode* gp)
{
    RBNode* p = gp->right;
    RBNode* t = p->right;
    RBNode tmp = *gp;
    gp->data = p->data;
    gp->right = t;
    gp->left = p;
    p->data = tmp.data;
    p->right = p->left;
    p->left = tmp.left;
}

void RBTree::RL(RBNode* gp)
{
    RBNode* p = gp->right;
    RBNode* t = p->left;
    RBNode tmp = *gp;
    gp->data = t->data;
    gp->left = t;
    p->left = t->right;
    t->data = tmp.data;
    t->right = t->left;
    t->left = tmp.left;
}

//以下为top down实现
void RBTree::InsertAdjust(RBNode *gp, RBNode *p, RBNode *t)//插入之后的调整用的函数
{
    if(p->color == black) return ;//没有出现连续的红结点
    if(p == root){//出现连续红结点但是是根节点，则直接染黑
        p->color = black;
        return ;
    }
    //p不为黑节点，则说明出现了双红的情况(默认插入的是红色节点),则根据情况先旋转在染色
    if(gp->left == p){
        if(p->left == t){
            times++;
            LL(gp);
        }
        else{
            times++;
            LR(gp);
        }
    }
    else{
        if(p->right == t){
            times++;
            RR(gp);
        }
        else{
            times++;
            RL(gp);
        }
    }
}

/*void RBTree::insert(int val)//top-down插入函数
{
    RBNode* t, *p, *gp;
    if(root == nullptr){
        root = new RBNode(val, nullptr, nullptr, black);//如果根节点为空节点,直接插入作为树根，并且一定为黑色
        return ;
    }
    p = gp = t = root;
    while(true){
        if(t){
            if(t->left && t->left->color == red && t->right && t->right->color == red){
                t->left->color = black;
                t->right->color = black;
                t->color = red;//以上部分的循环是开始top down操作，即从root开始确保每个红结点只有黑色孩子
                InsertAdjust(gp, p, t);//每次将对应的根节点变为红色节点之后都要检查是否出现双红现象
            }
            gp = p;
            p = t;//将祖父节点与父节点都下降一层
            t = (t->data > val ? t->left : t->right);//循环地寻找插入的位置
        }
        else{
            t = new RBNode(val);//找到插入位置，直接插入
            if(val < p->data){
                p->left = t;
            }
            else p->right = t;
            InsertAdjust(gp, p, t);
            root->color = black;
            return ;
        }
    }
}*/

void RBTree::RotateL(RBNode* t)//单次左旋
{
    RBNode* p = t->right;
    if(p != nullptr){
        t->right = p->left;
        p->left = t;
        p->parent = t->parent;
    }
    t->parent = p;
}

void RBTree::RotateR(RBNode* t)//单次右旋
{
    RBNode* p = t->left;
    if(t != nullptr){
        t->left = p->right;
        p->right = t;
        p->parent = t->parent;
    }
    t->parent = p;
}

void RBTree::insert(int val)//bottom-up插入
{
    if(root == nullptr){
        root = new RBNode(val, nullptr, nullptr, nullptr, black);
        return ;//没有节点则直接插入到根节点并且一定为黑色
    }
    RBNode* p = nullptr;
    RBNode* t = root;
    while(t != nullptr){//尝试去寻找插入的位置
        if(t->data > val){//val<data,想左面走去找位置
            p = t;
            t = t->left;
        }
        else{
            if(t->data < val){//val>data,向右走去找位置
                p = t;
                t = t->right;
            }
            else return ;//已经存在，不需要重复插入
        }
    }
    //找到插入位置，开始插入
    t = new RBNode(val);
    t->color = red;//默认插入的是红色节点
    if(p->data > val){
        p->left = t;
        t->parent = p;
    }
    else{
        p->right = t;
        t->parent = p;
    }
    //插入结束之后开始调整可能存在的双红情况
    while(p != nullptr && p->color == red){
        RBNode* gp = p->parent;
        if(gp == nullptr){
            p->color = black;
            return ;//若p的父亲节点不存在，说明是根节点，直接染成黑色然后结束插入
        }
        if(p == gp->left){
            RBNode* u = gp->right;//找叔父节点
            if(u != nullptr && u->color == red){//uncle节点存在且为红结点，直接变色，位置基本不变
                p->color = black;
                u->color = black;
                gp->color = red;
                t = gp;
                p = t->parent;//向上再走一层
            }
            else{//uncle不存在或为黑色节点的情况(此时需要进行旋转)
                if(t == p->right){
                    times++;
                    RotateL(p);
                    swap(p, t);
                }
                times++;
                RotateR(gp);
                p->color = black;
                gp->color = red;
            }
        }
        else{//和上一种情况基本相同
            RBNode* u = gp->left;
            if(u != nullptr && u->color == red){
                p->color = black;
                u->color = black;
                gp->color = red;
                t = gp;
                p = gp->parent;
            }
            else{
                if(t == p->left){
                    times++;
                    RotateR(p);
                    swap(p, t);
                }
                times++;
                RotateL(gp);
                p->color = black;
                gp->color = red;
            }
        }
    }
    root->color = black;//根节点的颜色无论如何都是黑色！
    return ;//插入结束
}
