#include <vector>
#include <iostream>
using namespace std;

#define ALPHA 0.6

class ScapegoatTree
{
public:
    struct Node{
        Node* left;
        Node* right;
        Node* parent;
        int val;
        int size;//记录以此节点为根节点的子树的节点个数
        Node(int v, Node* l = nullptr, Node* r = nullptr, Node* p = nullptr)
            :left(l), right(r), parent(p){
            val = v;
            size = 1;//最开始的时候只有该节点本身
        }
        void UpdateNode()
        {
            if(left && right){
                size = (left->size) + (right->size) + 1;
            }
            else{
                if(left && !right){
                    size = (left->size) + 1;
                }
                else{
                    if(right && !left) size = (right->size) + 1;
                    else size = 1;
                }
            }
        }
    };
    Node* root;
    int RebalanceTimes = 0;//记录重构的次数
    int maxsize;//达到过的最大节点数
    ScapegoatTree() {
        root = nullptr;
        maxsize = 0;
        RebalanceTimes = 0;
    }
    ~ScapegoatTree() {}

    int max(int a, int b)
    {
        if(a >= b) return a;
        return b;
    }

    bool CheckNode(Node* t);//检测某个节点是否满足α权重平衡

    int Height(Node* t);//获取某个节点的高度

    bool CheckHeight(Node* t);//检测某个节点是否满足α高度平衡

    bool CheckDepth(int depth, Node* t);//检查新插入节点的深度是否满足平衡要求

    void GetAllNodes(Node* t, vector<Node*> &vec);//获取要进行重构的节点对应子树的中序遍历序列

    Node* RebalanceTree(vector<Node*> &vec, int l, int r);//进行目标节点对应子树的重构操作

    void RebuildNodes(Node*& t);//节点重构的封装函数

    Node* FindScapegoatNode(Node* t);//若高度失衡，则去寻找替罪羊节点

    void UpdateNodesSize(Node* t);//从插入节点位置开始进行上部节点的size的更新

    bool CheckDelete(Node* t);//用于检查在delete之后是否需要重构

    void UpdateDeleteSize(Node* t);//进行删除之后的size的调整

    /**
     * @brief Get the Rebalance Times
     *
     * @return int
     */
	int GetRebalanceTimes();

    /**
     * @brief Look up a key in scapegoat tree. Same as trivial binary search tree
     *
     * @param key
     */
    void Search(int key);

    /**
     * @brief Insert a new node into the tree. If the key is already in the tree, then do nothing
     *
     * @param key
     */
    void Insert(int key);

    /**
     * @brief Delete a node of the tree. If the key is not in the tree, do nothing.
     *
     * @param key
     */
    void Delete(int key);
};
