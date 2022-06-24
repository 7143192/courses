#ifndef GRAPH_H
#define GRAPH_H
class Graph{//实现之后邻接表以及拓扑排序的基类
public:
    int NumofVers()
    {
        return Vers;
    }
    int NumofEdge()
    {
        return Edges;
    }
    virtual void Insert(int x, int y, int weight) = 0;
protected:
    int Vers;
    int Edges;
};

class AdjListGraph:public Graph{
private:
    struct EdgeNode{//存储边的类型
        int end;
        int weight;
        EdgeNode* next;
        EdgeNode(int e, int w, EdgeNode* n = nullptr){
            end = e;
            weight = w;
            next = n;
        }
    };
    struct VerNode{//存储节点的类型
        int ver;
        EdgeNode* head;
        VerNode(EdgeNode* h = nullptr){
            head = h;
        }
    };
    VerNode* VerList;
    int find(int v){
        int pos = -1;
        for(int i = 0;i < Vers;++i){
            if(VerList[i].ver == v){
                pos = i;
                break;
            }
        }
        return pos;
    }

public:
    AdjListGraph(int size, const int d[]);
    void Insert(int x, int y, int w);
    void DFSItem(int start, bool visited[]);
    void DFS();//进行全图的DFS遍历的递归函数
    void TopSort();//进行拓扑排序的核心函数
    ~AdjListGraph();
};

#endif // GRAPH_H
