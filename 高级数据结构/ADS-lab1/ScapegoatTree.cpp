#include "ScapegoatTree.h"
#include <iostream>
#include <fstream>
#include <cmath>

bool ScapegoatTree::CheckNode(Node* t)//检测某个节点是否满足α权重平衡
{
    bool f = false;
    if(t->left && t->right){
        f = ((t->left)->size <= (int)(ALPHA * (double)(t->size)))
                && ((t->right)->size <= (int)(ALPHA * (double)(t->size)));
    }
    else{
        if(t->left && !t->right){
            f = ((t->left)->size <= (int)(ALPHA * (double)(t->size)));
        }
        else{
            if(!t->left && t->right){
                f = ((t->right)->size <= (int)(ALPHA * (double)(t->size)));
            }
            else f = true;
        }
    }
    return !f;
}

int ScapegoatTree::Height(Node* t)//获取某个节点的高度
{
    if(t == nullptr) return 0;
    int lt = Height(t->left);
    int rt = Height(t->right);//递归计算左右子树根节点高度
    return ((lt > rt) ? lt : rt) + 1;
}

bool ScapegoatTree::CheckHeight(Node* t)//检测某个节点是否满足α高度平衡
{
    int curheight = Height(t);
    int legalheight = (int)(log((double)(t->size)) / log(double(1) / ALPHA)) + 1;
    if(curheight <= legalheight) return false;//满足
    return true;//不满足
}

void ScapegoatTree::GetAllNodes(Node* t, vector<Node*> &vec)//获取要进行重构的节点对应子树的中序遍历序列
{
    //使用递归的中序遍历
    if(t == nullptr) return ;
    GetAllNodes(t->left, vec);
    vec.push_back(t);
    GetAllNodes(t->right, vec);
}

ScapegoatTree::Node* ScapegoatTree::RebalanceTree(vector<Node*> &vec, int l, int r)
//进行目标节点对应子树的重构操作
{
    if(l > r) return nullptr;//
    //if(l == r) return vec[l];//
    int mid = (l + r) / 2;
    Node* ans = vec[mid];//选取新的根节点
    ans->left = RebalanceTree(vec, l, mid - 1);
    if(ans->left != nullptr) ans->left->parent = ans;
    ans->right = RebalanceTree(vec, mid + 1, r);
    if(ans->right != nullptr) ans->right->parent = ans;
    ans->UpdateNode();//更新size信息
    return ans;
}

void ScapegoatTree::RebuildNodes(Node*& t)//节点重构的封装函数(结合上面两个函数)
{
    RebalanceTimes++;
    if(t == nullptr) return ;
    vector<Node*> vec;
    GetAllNodes(t, vec);
    Node* p = t->parent;
    t = nullptr;
    t = RebalanceTree(vec, 0, vec.size() - 1);
    t->parent = p;
    if(p != nullptr){
        if(t->val < p->val){
            p->left = t;
        }
        if(t->val > p->val){
            p->right = t;
        }
    }
}

ScapegoatTree::Node* ScapegoatTree::FindScapegoatNode(Node* t)
{
    if(t->parent == nullptr){//检查根节点
        if(CheckNode(t) == true){
            return t;
        }
    }
    while(t->parent != nullptr){
        if(CheckNode(t->parent) == true){
            return t->parent;//找到了从下而上的第一个替罪羊节点,直接返回
        }
        t = t->parent;
    }
    if(CheckNode(t) == true){
        return t;
    }
    return nullptr;//没有找到，返回空节点
}

void ScapegoatTree::UpdateNodesSize(Node* t)//更新size
{
    while(t->parent != nullptr){
        t = t->parent;
        (t->size)++;
    }
    return ;
}

bool ScapegoatTree::CheckDelete(Node* t)
{
    if(t == nullptr) return false;
    bool f = ((t->size) <= (int)(ALPHA * (double)(maxsize)));
    return f;
}

void ScapegoatTree::UpdateDeleteSize(Node* t)//进行delete之后的size调整
{
    while((t->parent) != nullptr){
        t = t->parent;
        (t->size)--;
    }
}

bool ScapegoatTree::CheckDepth(int depth, Node* t)
{
    bool f = depth <= (int)(log((double)(t->size)) / log(double(1) / ALPHA));
    return !f;
}

int ScapegoatTree::GetRebalanceTimes()
{
	// TODO
    return RebalanceTimes;
}

void ScapegoatTree::Search(int key)
{
    // TODO
    Node* t = root;
    int depth = 0;
    if(t == nullptr){//根节点为空，直接返回
        cout<<"Not Found"<<endl;
        return ;
    }
    if(t->val == key){
        cout<<depth<<endl;
        return ;//根节点即为目标点
    }
    while(t != nullptr && t->val != key){
        if(t->val > key){
            t = t->left;
            depth++;
        }
        else{
            if(t->val < key){
                t = t->right;
                depth++;
            }
            else break;
        }
    }
    if(t == nullptr){//最终没找到
        cout<<"Not Found"<<endl;
        return ;
    }
    if(t != nullptr && t->val == key){//最终找到了
        cout<<depth<<endl;
        return ;
    }
}

void ScapegoatTree::Insert(int key)//进行基本的插入操作，记得无论是否真的进行插入都要进行重构检察
{
    // TODO
    int depth = 0;
    if(root == nullptr){//根节点为空，则直接插入
        root = new Node(key);
        return ;
    }
    if(root->val == key){
        if(CheckDepth(depth, root) == true){
            RebuildNodes(root);
        }
        return ;
    }
    Node* t = root;
    Node* p = root;
    while(t != nullptr && t->val != key){
        if(t->val > key){
            p = t;
            t = t->left;
            depth++;
        }
        else{
            if(t->val < key){
                p = t;
                t = t->right;
                depth++;
            }
            else{
                break;
            }
        }
    }
    if(t != nullptr && t->val == key){
        if(CheckDepth(depth, root) == true){//发现新插入节点的深度不满足高度平衡
            Node* ans = FindScapegoatNode(t);//找到满足条件的替罪羊节点
            if(ans != nullptr) RebuildNodes(ans);//重排列
        }
        return ;//不考虑同数值节点的插入
    }
    if(t == nullptr){//找到插入位置
        t = new Node(key);
        t->parent = p;//更新父亲节点的位置
        UpdateNodesSize(t);
        maxsize = max(root->size, maxsize);//
        if(p != nullptr && p->val > key){
            p->left = t;
        }
        if(p != nullptr && p->val < key){
            p->right = t;
        }
        /*if(CheckHeight(root) == true){//发现不满足高度平衡
            Node* ans = FindScapegoatNode(t);//找到满足条件的替罪羊节点
            if(ans != nullptr) RebuildNodes(ans);//重排列
        }*/
        if(CheckDepth(depth, root) == true){//发现不满足高度平衡
            Node* ans = FindScapegoatNode(t);//找到满足条件的替罪羊节点
            if(ans != nullptr) RebuildNodes(ans);//重排列
        }
    }

    return ;//仍平衡或者调整之后直接返回
}

void ScapegoatTree::Delete(int key)//进行基本的删除操作，记得无论是否真的进行删除都要进行重构检察
{
    // TODO
    if(root == nullptr){//根节点为空，直接返回
        RebuildNodes(root);
        return ;
    }
    Node* t = root;
    while(t != nullptr && t->val != key){
        if(t->val > key){
            t = t->left;
        }
        else{
            if(t->val < key){
                t = t->right;
            }
            else break;
        }
    }
    if(t == nullptr){
        if(CheckDelete(root) == true){
            RebuildNodes(root);//若触发delete重构条件，则直接从根节点开始重构
            maxsize = (root->size);
        }
        return ;//没有找到
    }
    if(t != nullptr && t->val == key){//找到了目标节点
        if(t->left && t->right){//左右子树均存在，则取右子树最小值作为代替
            Node* p = t->right;
            if(p->left == nullptr){
                UpdateDeleteSize(p);
                t->val = p->val;
                t->right = p->right;
                if(p->right != nullptr) p->right->parent = t;
                delete p;//
                //p = nullptr;
            }
            else{
                while(p->left != nullptr) p = p->left;
                UpdateDeleteSize(p);
                t->val = p->val;
                if(!p->left && !p->right){
                    Node* par = p->parent;
                    par->left = nullptr;//
                    delete p;//
                    //p = nullptr;
                }
                else{
                    if(!p->left && p->right){
                        Node* par1 = p->parent;
                        par1->left = p->right;
                        p->right->parent = par1;
                        //p = nullptr;
                        delete p;//
                    }
                }
            }
        }
        else{
            if(t->left && !t->right){//只有左子树
                Node* p = t->left;
                Node* par = t->parent;
                if(par != nullptr){
                    UpdateDeleteSize(t);
                    if(p->val < par->val){
                        par->left = p;
                    }
                    else par->right = p;//将待删除节点的左子树直接连到删除节点的父节点上面(注意左右)
                    p->parent = par;
                    //t = nullptr;
                    delete t;//
                }
                else{//删除根节点
                    root = root->left;
                    //t->left = nullptr;
                    root->parent = nullptr;
                    delete t;
                }
            }
            else{
                if(!t->left && t->right){//只有右子树
                    Node* p = t->right;
                    Node* par = t->parent;
                    if(par != nullptr){
                        UpdateDeleteSize(t);
                        if(p->val < par->val){
                            par->left = p;
                        }
                        else par->right = p;//将待删除节点的右子树直接连到删除节点的父节点上面(注意左右)
                        p->parent = par;
                        //t = nullptr;
                        delete t;
                    }
                    else{//删除根节点
                        root = root->right;
                        //t->right = nullptr;
                        root->parent = nullptr;
                        delete t;
                    }
                }
                else{//待删除节点为叶子结点
                    Node* p3 = t->parent;                    
                    if(p3 != nullptr){
                        UpdateDeleteSize(t);
                        if(t->val < p3->val){
                            p3->left = nullptr;
                        }
                        if(t->val > p3->val){
                            p3->right = nullptr;
                        }
                        delete t;//
                        //t = nullptr;
                    }
                    else{//待删除节点为根节点
                        (root->size) = 0;
                        root = nullptr;
                        //t = nullptr;
                        delete t;
                    }
                }
            }
        }
    }
    if(CheckDelete(root) == true){
        RebuildNodes(root);//若触发delete重构条件，则直接从根节点开始重构
        maxsize = (root->size);
    }
}
