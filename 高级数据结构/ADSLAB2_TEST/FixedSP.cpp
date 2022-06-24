#include "FixedSP.h"
#include <thread>
#include <windows.h>
#include <iostream>
using namespace std;

vector<vector<int>> pairs;//记录所有点集对
vector<vector<int>> SP;//记录每一对点对应的最短路径
int FixedSP::CountPathLen(vector<int> path)
{
    int len = 0;
    int size = path.size();
    for(int i = 0;i < size;++i){
        len += data[path[i]][path[(i + 1) % path.size()]];
    }
    return len;
}

int FixedSP::GetMinPath(vector<int> Len)
{
    int min = INT_MAX;
    int pos = -1;
    int size = Len.size();
    for(int i = 0;i < size;++i){
        if(Len[i] < min){
            min = Len[i];
            pos = i;
        }
    }
    return pos;
}

void FixedSP::GetAllPath(vector<int> node, int start, int end, vector<vector<int>> &ans)
{
    int len = end - start;
    if(len == 1){
        ans.push_back(node);//只有一个元素则不需要进行排列
        return ;
    }
    if(start == end){//递归终止条件,此时说明已经找到了单一的数字，即以一个数字固定在开头的一个序列完成
        vector<int> temp;
        for(int i = 0;i < end;++i) temp.push_back(node[i]);
        ans.push_back(temp);
    }
    for(int i = start;i < end;++i){
        int tmp = node[start];
        node [start] = node[i];
        node[i] = tmp;//交换头部元素和当前要换到头部的元素
        GetAllPath(node, start + 1, end, ans);//每次固定一个数字在头部，进行剩下数字的全排列
        int tmp1 = node[start];
        node [start] = node[i];
        node[i] = tmp1;//再交换回去，为下一个要换到头部的数字做准备
    }
}

vector<int> FixedSP::FindMatchedPath(vector<int> pair, vector<vector<int>> pairs, vector<vector<int>> paths)
{
    int pos = -1;
    bool reverse = false;
    vector<int> ans;
    int size = pairs.size();
    for(int i = 0;i < size;++i){
        if((pair[0] == pairs[i][0]) && (pair[1] == pairs[i][1])){
            pos = i;
            reverse = false;
            break;
        }
        if((pair[1] == pairs[i][0]) && (pair[0] == pairs[i][1])){
            pos = i;
            reverse = true;
            break;
        }
    }
    if(pos >= 0 && reverse == false){
        ans = paths[pos];
    }
    if(pos >= 0 && reverse == true){
        vector<int> temp = paths[pos];
        int size = temp.size();
        for(int i = size - 1;i >= 0;--i) ans.push_back(temp[i]);
    }
    return ans;
}

vector<int> FixedSP::Dijkstra(int start, int end)
{
    vector<int> ans;//记录得到的最短路径
    if(start == end){
        ans.push_back(start);
        return ans;
    }
    int size = data.size();//获取邻接矩阵中节点个数
    int* checked = new int[size];//检查某个节点是否被访问过
    int* distance = new int[size];//记录最短路径
    int* preNode = new int[size];//记录每个位于最短路径上的点的前驱节点的索引值
    for(int i = 0;i < size;++i){
        checked[i] = 0;
        distance[i] = data[start][i];
        preNode[i] = start;
    }
    checked[start] = 1;//起点认为已经被访问过了
    for(int i = 0;i < size;++i){
        int min = INF;//最小值的初始化取为INF，这样就可以直接跳过非联通边了
        int pos = -1;
        for(int j = 0;j < size;++j){
            if(checked[j] == 1) continue;
            if(checked[j] == 0 && distance[j] < min){
                min = distance[j];
                pos = j;
            }
        }
        if(pos == -1){
            ans.clear();
            return ans;//若没有找到最小边，说明这组点集不连通
        }
        checked[pos] = 1;//将当前处理的点设置为已经访问过
        if(pos == end) break;//找到了目标终点，则停止继续的查找
        for(int j = 0;j < size;++j){
            if(checked[j] == 1) continue;
            int newdist = min + data[pos][j];
            if(newdist < distance[j]){//利用三角形法则进行距离的更新
                distance[j] = newdist;
                preNode[j] = pos;
            }
        }
    }
    int pathPos = end;
    while(pathPos != start){//回溯，找到从起点到终点的最短路径
        ans.push_back(pathPos);
        pathPos = preNode[pathPos];
    }
    ans.push_back(start);
    delete []checked;
    delete []distance;
    delete []preNode;
    return ans;
}

void FixedSP::getMinPath_parallel(vector<vector<int>> AllPaths, int &min_len, vector<int> &min_path,
                                  int start, int end, int source)
{
    double total1 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    QueryPerformanceCounter(&t1);
    for(int i = start;i < end;++i){
        vector<int> temp;
        int len = AllPaths[i].size();
        temp.push_back(source);//记得放入起点
        for(int j = 0;j < len;++j){
            temp.push_back(AllPaths[i][j]);
        }
        temp.push_back(source);
        int total = 0;
        vector<int> detailpath;
        bool connected = true;
        int temp_size = temp.size();
        for(int j = 0;j < temp_size - 1;++j){
            /*vector<int> temp_pair;
            temp_pair.push_back(temp[j]);
            temp_pair.push_back(temp[j + 1]);*/
            vector<int> ans = Dijkstra(temp[j], temp[j + 1]);
            if(ans.size() == 0){
                connected = false;
                break;
            }
            for(ssize_t k = ans.size() - 1;k > 0;--k){
                detailpath.push_back(ans[k]);
            }
        }
        if(!connected){//说明不连通
            //path.clear();
            //return path;
            return ;//
        }
        detailpath.push_back(temp[temp.size() - 1]);//用详细的最短路径代替原来路径
        total = CountPathLen(detailpath);
        if(total < min_len){
            min_len = total;
            min_path = detailpath;
        }
    }
    QueryPerformanceCounter(&t2);
    cout<<"function time:"<<(double)(t2.QuadPart-t1.QuadPart)<<endl;
    //return true;
}

vector<int> FixedSP::getFixedPointShortestPath(int source, vector<int> intermediates)
{
    vector<int> path;
    // TODO
    vector<vector<int>> AllPaths;//记录中间结点全排列生成的所有路径组合

    int size = intermediates.size();
    /*for(int i = 0;i < size;++i){
        vector<int> pair;
        pair.push_back(source);
        pair.push_back(intermediates[i]);
        pairs.push_back(pair);
        vector<int> ans = Dijkstra(source, intermediates[i]);
        SP.push_back(ans);
    }
    for(int i = 0;i < size;++i){
        for(int j = i + 1;j < size;++j){
            vector<int> pair;
            pair.push_back(intermediates[i]);
            pair.push_back(intermediates[j]);
            pairs.push_back(pair);
            vector<int> ans = Dijkstra(intermediates[i], intermediates[j]);
            SP.push_back(ans);
        }
    }*/
    GetAllPath(intermediates, 0, size, AllPaths);//获取路径全排列信息
    int Num = AllPaths.size();
    int min_len = INT_MAX;
    vector<int> min_path;
    vector<thread> threads;
    int N = 16;//记录线程数量
    int block_size = (Num / N);//计算每一个thread应该处理的数据量
    int start = 0;
    for(int i = 0;i < (N);++i){
        int end = start + block_size - 1;
        threads.emplace_back(&FixedSP::getMinPath_parallel, this, AllPaths, ref(min_len), ref(min_path)
                 , start, end, source);//创建线程(注意线程在进行参数引用的格式)
        start = end + 1;
    }
    for(size_t i = 0;i < threads.size();++i) threads[i].join();
    //cout<<"total time:"<<total1<<endl;
    path = min_path;
    for(size_t i = 0;i < AllPaths.size();++i) AllPaths[i].clear();
    AllPaths.clear();
    //for(size_t i = 0;i < pairs.size();++i) pairs[i].clear();
    //pairs.clear();
    //for(size_t i = 0;i < SP.size();++i) SP[i].clear();
    //SP.clear();
    return path;
}
