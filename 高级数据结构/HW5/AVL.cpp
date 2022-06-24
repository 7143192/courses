#include "AVL.h"

void AVL::Insert(int &x, AVLNode *&t)
{
    if(t == nullptr){
        t = new AVLNode(x, nullptr, nullptr);
    }
    else{
        if(x < t->val){
            Insert(x, t->left);
            if ( height(t->left) - height(t->right) == 2){
                if(x < t->left->val) LL(t);
                else LR(t);
            }
        }
        else{
            if( t->val < x) {
                Insert(x, t->right);
                if(height(t->right) - height(t->left) == 2){
                    if( t->right->val < x) RR(t);
                    else RL(t);
                }
            }
        }
    }
    t->h = max(height(t->left), height(t->right)) + 1;
}

void AVL::LL(AVLNode *&t)
{
    AVLNode *t1 = t->left; // 未来的树根
    t->left = t1->right;
    t1->right = t;
    t->h = max( height(t->left), height(t->right)) + 1;
    t1->h = max(height(t1->left), height(t)) + 1;
    t = t1;
}

void AVL::RR(AVLNode *&t)
{
    AVLNode *t1 = t->right; // 未来的树根
    t->right = t1->left;
    t1->left = t;
    t->h = max(height(t->left), height(t->right)) + 1;
    t1->h = max(height(t1->right), height(t)) + 1;
    t = t1;
}

void AVL::LR(AVLNode *&t)
{
    RR(t->left);
    LL(t);
}

void AVL::RL(AVLNode *&t)
{
    LL(t->right);
    RR(t);
}

bool AVL::Search(int &data)
{
    AVLNode* t = root;
    while(t != nullptr && t->val != data){
        if(t->val > data) t = t->left;
        else t = t->right;
    }
    if(t == nullptr) return false;
    return true;
}
