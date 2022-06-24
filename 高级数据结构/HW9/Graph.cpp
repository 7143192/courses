#include "Graph.h"
#include <queue>
#include <iostream>
using namespace std;

AdjListGraph::AdjListGraph(int size, const int d[])//邻接表类的构造函数
{
    Vers = size;
    Edges = 0;
    VerList = new VerNode[Vers];
    for(int i = 0;i < Vers;++i){
        VerList[i].ver = d[i];
    }
}

AdjListGraph::~AdjListGraph()
{
    EdgeNode* p;
    for(int i = 0;i < Vers;++i){
        while((p = VerList[i].head) != nullptr){
            VerList[i].head = p->next;
            delete p;
        }
    }
    delete []VerList;
}

void AdjListGraph::Insert(int x, int y, int w)
{
    int u = find(x);
    if(u == -1) return ;//没找到
    int v = find(y);
    if(v == -1) return ;//没找到
    VerList[u].head = new EdgeNode(v, w, VerList[u].head);
    ++Edges;
}

void AdjListGraph::DFSItem(int start, bool visited[])
{
    EdgeNode* p = VerList[start].head;
    cout<<VerList[start].ver<<"  ";
    visited[start] = true;
    while(p != nullptr){
        if(visited[p->end] == false){
            DFSItem(p->end, visited);
        }
        p = p->next;
    }
}

void AdjListGraph::DFS()
{
    bool* visited = new bool[Vers];
    for(int i = 0;i < Vers;++i){
        visited[i] = false;
    }
    for(int i = 0;i < Vers;++i){
        if(visited[i] == true) continue;
        DFSItem(i, visited);
    }
    cout<<endl;
}

void AdjListGraph::TopSort()
{
    cout<<"Top Sort Result:"<<endl;
    DFS();//利用深度优先遍历进行拓扑排序
    /*queue<int> que;
    EdgeNode* p;
    int cur;
    int *In = new int[Vers];
    for(int i = 0;i < Vers;++i) In[i] = 0;
    for(int i = 0;i < Vers;++i){
        for((p = VerList[i].head);p != nullptr; p = p->next){
            ++In[p->end];
        }
    }
    for(int i = 0;i < Vers;++i){
        if(In[i] == 0) que.push(i);
    }
    cout<<"Top Sort Result:"<<endl;
    while(!que.empty()){
        cur = que.front();
        que.pop();
        cout<<VerList[cur].ver<<"  ";
        for(p = VerList[cur].head;p != nullptr;p = p->next){
            if(--In[p->end] == 0){
                que.push(p->end);
            }
        }
    }
    cout<<endl;*/
}
