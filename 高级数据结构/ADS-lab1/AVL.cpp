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
                if(x < t->left->val){
                    times++;
                    LL(t);
                }
                else{
                    times++;
                    LR(t);
                }
            }
        }
        else{
            if( t->val < x) {
                Insert(x, t->right);
                if(height(t->right) - height(t->left) == 2){
                    if( t->right->val < x){
                        times++;
                        RR(t);
                    }
                    else{
                        times++;
                        RL(t);
                    }
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

bool AVL::Delete(int& x, AVLNode*& t)
{
    if(t == nullptr) return true;
    if(x == t->val){
        if(t->left == nullptr || t->right == nullptr){
            AVLNode* oldNode = t;
            t = (t->left != nullptr) ? t->left : t->right;
            delete oldNode;
            return false;
        }
        else{
            AVLNode* tmp = t->right;
            while(tmp->left != nullptr){
                tmp = tmp->left;
            }
            t->val = tmp->val;
            if(Delete(tmp->val, t->right)) return true;
            return Adjust(t, 1);
        }
    }
    if(x < t->val){
        if(Delete(x, t->left)) return true;
        return Adjust(t, 0);
    }
    else{
        if(Delete(x, t->right)) return true;
        return Adjust(t, 1);
    }
}

bool AVL::Adjust(AVLNode*& t, int subTree)
{
    if(subTree){
        if(height(t->left) - height(t->right) == 1){
            return true;
        }
        if(height(t->left) == height(t->right)){
            (t->h)--;
            return false;
        }
        if(height(t->left->right) > height(t->left->left)){
            LR(t);
            return false;
        }
        LL(t);
        if(height(t->left) == height(t->right)){
            return false;
        }
        else return true;
    }
    else{
        if(height(t->right) - height(t->left) == 1){
            return true;
        }
        if(height(t->left) == height(t->right)){
            (t->h)--;
            return false;
        }
        if(height(t->right->left) > height(t->right->right)){
            RL(t);
            return false;
        }
        RR(t);
        if(height(t->right) == height(t->left)){
            return false;
        }
        else return true;
    }
}
