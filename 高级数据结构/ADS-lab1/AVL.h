#ifndef AVL_H
#define AVL_H
class AVL{
public:
    struct AVLNode{
        int val;
        AVLNode* left;
        AVLNode* right;
        int h;
        AVLNode(int data, AVLNode* lt, AVLNode* rt, int h = 1):
            val(data),left(lt),right(rt),h(h){

        }
    };
    int times;//记录旋转次数
    AVLNode* root;
    int height( AVLNode *t ) const
    {
        return t == nullptr ? 0 : t->h;
    }//空树高度为0
    void LL( AVLNode *&t);
    void LR( AVLNode *&t);
    void RL( AVLNode *&t);
    void RR( AVLNode *&t);
    int max(int a, int b)
    {
        return (a>b) ? a : b;
    }
    void Insert(int &data, AVLNode *&t);
    bool Search(int &data);
    bool Delete(int &data, AVLNode*& t);
    bool Adjust(AVLNode*& t, int subTree);
};

#endif // AVL_H
