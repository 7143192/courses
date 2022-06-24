#ifndef RBTREE_H
#define RBTREE_H
class RBTree
{
public:
    enum Color{red, black};
    struct RBNode{
        int data;
        RBNode* left;
        RBNode* right;
        RBNode* parent;//这里的parent是为bottom-up插入服务的，top-down并不需要
        Color color;
        RBNode(int d, RBNode* l = nullptr, RBNode* r = nullptr, RBNode* p = nullptr, Color c = red)
            :data(d), left(l), right(r), parent(p), color(c){}
    };
    RBNode* root;
    int times;//记录旋转的次数
    RBTree(RBNode* t)
    {
        root = t;
    }
    void insert(int val);
    RBNode* search(int val);
    void InsertAdjust(RBNode* gp, RBNode* p, RBNode* t);
    void LL(RBNode* gp);
    void LR(RBNode* gp);
    void RL(RBNode* gp);
    void RR(RBNode* gp);
    void RotateL(RBNode* t);
    void RotateR(RBNode* t);
    bool IsRed(RBNode* t)
    {
        return t->color == red;//判断是否是红色节点
    }
    bool IsBlack(RBNode* t)
    {
        return t->color == black;//判断是否是黑色节点
    }
};

#endif // RBTREE_H
