#include <iostream>
#include <vector>
#include <algorithm>
#include <fstream>
#include <thread>
#include <map>
#include <mutex>
#include <condition_variable>
#include <windows.h>
using namespace std;

class Edge{//串行数据结构
public:
    int u;//边的起点
    int v;//边的终点
    int w;//边的权重
    friend bool operator<(const Edge& E1,const Edge& E2)
    {
        return E1.w < E2.w;
    }
};

vector<Edge> edges;

void makeSet(vector<int>& uset, int n)//创建初始的邻接矩阵
{
    for(int i = 0;i < n;++i) uset.push_back(0);
    for(int i = 0;i < n;++i) uset[i] = i;
}

int findSet(vector<int>& uset, int u)
{
    int i = u;
    while(uset[i] != i){
        i  = uset[i];
    }
    return i;
}

void Kruskal(vector<Edge>& edges, int n)//串行的kruskal算法
{
    vector<int> uset;
    vector<Edge> SpanTree;
    int cost = 0;
    int e1, e2;
    makeSet(uset, n);
    for (size_t i = 0; i < edges.size(); i++){
        e1 = findSet(uset,edges[i].u);
        e2 = findSet(uset,edges[i].v);
        if (e1 != e2){
            SpanTree.push_back(edges[i]);
            cost += edges[i].w;
            uset[e1] = e2;
        }
    }
}

class edge{//并行数据结构
public:
    int v1,v2;
    int w,tid;
    edge* next;
    edge() {};
    edge(int a,int b,int c):v1(a),v2(b),w(c),next(NULL) {};

};

class vertex
{
public:
    vertex(int v):vid(v),next(NULL) {};
    int vid;
    edge* next;
};

vector<vertex> graph;
const int thread_num = 6;
vector<thread> subthreads;
multimap<int, edge> edge_queue;
mutex mut;
bool isfinished = false;
condition_variable cond_v[thread_num];
vector<edge> mst;
int started[thread_num];
int sent[thread_num];
bool sentagain = false;
int sentNum = 0;

void construct()
{
    ifstream file("./3_3.txt");
    string line = "";
    int v_num = 5000,a_num = 12000;
    for (int i = 1; i <= v_num; i++)
        graph.push_back(vertex(i));
    for (int i = 0; i < a_num; i++){
        edge *temp1 = new edge(),*temp2;
        getline(file, line);
        temp1->v1 = atoi(line.c_str());
        line = "";
        getline(file, line);
        temp1->v2 = atoi(line.c_str());
        line = "";
        getline(file, line);
        temp1->w = atoi(line.c_str());
        line = "";
        temp2 = new edge(*temp1);
        temp1->next = graph[temp1->v1 - 1].next;
        graph[temp1->v1 - 1].next = temp1;
        temp2->next = graph[temp2->v2 - 1].next;
        graph[temp2->v2 - 1].next = temp2;
    }
    file.close();
}

void send_edge(multimap<int,edge>& m){
    if (!m.empty()){
        edge_queue.insert(*(m.begin()));
        m.erase(m.begin());
    }
}
void subthread_func(vector<vertex> v,int tid)
{
    started[tid] = 1;
    cout<<tid<<"thread in!"<<endl;
    /*double total1 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    QueryPerformanceCounter(&t1);*/
    multimap<int,edge> e;
    for (size_t i = 0; i < v.size(); i++){
        edge* temp = v[i].next;
        while (temp != NULL){
            temp->tid = tid;
            e.insert(pair<int,edge>(temp->w,*temp));
            temp = temp->next;
        }
    }
    unique_lock<mutex> lk(mut);
    send_edge(e);
    sentNum++;
    //sent[tid] = 0;
    while (true){
        cond_v[tid].wait(lk);
        if (isfinished) return;
        //if(!e.empty()) sent[tid] = 1;
        send_edge(e);
        sentagain = true;
    }
    /*QueryPerformanceCounter(&t2);
    total1 += (double)(t2.QuadPart-t1.QuadPart);
    cout<<"parallel time"<<tid<<":"<<total1<<endl;*/
}

void partition()
{
    vector<vertex> temp[thread_num];
    for (size_t i = 0; i < graph.size(); i++) temp[i % thread_num].push_back(graph[i]);
    for (int i = 0; i < thread_num; i++) subthreads.push_back(thread(subthread_func,temp[i],i));
}

void add_edge(edge e,map<int,int>& i,map<int,vector<int>>& rev_i){
    mst.push_back(e);
    int cid1 = i[e.v1],cid2 = i[e.v2];
    if (cid1 == -1 && cid2 == -1){
        int cid = rev_i.size() + 1;
        vector<int> temp;
        temp.push_back(e.v1);
        temp.push_back(e.v2);
        rev_i[cid] = temp;
        i[e.v1] = cid;
        i[e.v2] = cid;
    }
    else if (cid1 == -1){
        i[e.v1] = cid2;
        rev_i[cid2].push_back(e.v1);
    }
    else if (cid2 == -1){
        i[e.v2] = cid1;
        rev_i[cid1].push_back(e.v2);
    }
    else if(rev_i[cid1].size() <= rev_i[cid2].size()){
        for (size_t k = 0; k < rev_i[cid1].size(); k++){
            i[rev_i[cid1][k]] = cid2;
            rev_i[cid2].push_back(rev_i[cid1][k]);
        }
        rev_i.erase(cid1);
    }
    else{
        for (size_t k = 0; k < rev_i[cid2].size(); k++){
            i[rev_i[cid2][k]] = cid1;
            rev_i[cid1].push_back(rev_i[cid2][k]);
        }
        rev_i.erase(cid2);
    }
}

void kruskal()
{
    map<int,int> index;
    map<int,vector<int>> rev_index;
    for (size_t i = 0; i < graph.size(); i++){
        index[i + 1] = -1;
    }
    while(sentNum != thread_num){
        continue;
    }
    while (mst.size() < graph.size() - 1){
        unique_lock<mutex> lk(mut);
        if (edge_queue.empty()) break;
        pair<int,edge> temp = *(edge_queue.begin());
        edge_queue.erase(edge_queue.begin());
        lk.unlock();
        cond_v[temp.second.tid].notify_all();
        if (index[temp.second.v1] != index[temp.second.v2] ||
        index[temp.second.v1] == -1)
        add_edge(temp.second,index,rev_index);
        while(!sentagain){
            continue;
        }
        sentagain = false;
    }
    isfinished = true;
    for(int i = 0; i < thread_num; i++){
        cond_v[i].notify_all();
        subthreads[i].join();
    }
    /*QueryPerformanceCounter(&t2);
    total1 += (double)(t2.QuadPart-t1.QuadPart);
    cout<<"parallel time:"<<total1<<endl;*/
}

int edge_num[9] = {2000, 4000, 6000, 4000, 6000, 8000, 8000,
                 10000, 12000};

int main()
{
    int a = 1000;
    int b = 2000;
    int c = 5000;//三个不同的顶点数
    for(int i = 0;i < edge_num[3];++i){
        Edge e = Edge();
        edges.push_back(e);
    }
    ifstream file0("./2_1.txt");
    string line0 = "";
    for(int i = 0;i < edge_num[3];++i){
        getline(file0, line0);
        edges[i].u = atoi(line0.c_str()) - 1;
        line0 = "";
        getline(file0, line0);
        edges[i].v = atoi(line0.c_str()) - 1;
        line0 = "";
        getline(file0, line0);
        edges[i].w = atoi(line0.c_str());
    }
    file0.close();
    sort(edges.begin(), edges.end());
    double total1 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    QueryPerformanceCounter(&t1);
    Kruskal(edges, b);//串行部分
    QueryPerformanceCounter(&t2);
    total1 += (double)(t2.QuadPart-t1.QuadPart);
    cout<<"sequential time:"<<total1<<endl;
    total1 = 0;
    //QueryPerformanceCounter(&t1);
    construct();//创建表
    QueryPerformanceCounter(&t1);
    partition();//划分子图
    kruskal();//生成最小生成树
    QueryPerformanceCounter(&t2);
    total1 += (double)(t2.QuadPart-t1.QuadPart);
    cout<<"parallel time:"<<total1<<endl;
    /*QueryPerformanceCounter(&t2);
    total1 += (double)(t2.QuadPart-t1.QuadPart);
    cout<<"parallel time:"<<total1<<endl;*/
    return 0;
}
