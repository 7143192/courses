#include "FixedSP.h"
#include <algorithm>
#include <iostream>

vector<int> FixedSP::getFixedPointShortestPath(int source, vector<int> intermediates)
{

    sort(intermediates.begin(), intermediates.end());
    vector<int> permutation(intermediates);
    intermediates.insert(intermediates.begin(), source);//在开头加入起点

    vector<int> distance(nodeNum, INF);
    vector<dis> distances;

    for (size_t i = 0; i < intermediates.size(); i++) {

        vector<int> path;
        distance.clear();
        path.clear();

        getShortestPath(intermediates[i], distance, path);//直接再一次Dijkstra中找到一个点距离其他所有点的
                                                            //最短距离
        for (size_t j = 0; j < intermediates.size(); j++) {

            if (i == j) continue;
            if (distance[intermediates[j]] == INF) {
                // cout << "a";
                return vector<int>(0);//不直接连通
            }

            vector<int> path_temp;
            path_temp.clear();

            path_temp.push_back(intermediates[j]);
            int index_tmp = intermediates[j];

            while (path[index_tmp] != intermediates[i]) {//采用逆序迭代的方式获取逆序的最短路径
                path_temp.insert(path_temp.begin(),path[index_tmp]);
                index_tmp = path[index_tmp];
            }
            path_temp.insert(path_temp.begin(),intermediates[i]);
            dis d(make_pair(intermediates[i], intermediates[j]), distance[intermediates[j]], path_temp);
            distances.push_back(d);
        }
    }

    vector<int> path;
    path.clear();
    int min_d = INF;

    vector<int> inFlag, notInFlag;

    while (next_permutation(permutation.begin(), permutation.end()))//对于每个全排列序列
    {
        getShortestPath(source, permutation, distances, path, min_d);
    }

    for (auto it = path.begin(); it != path.end()-1;) {
        if (*(it) == *(it+1)) it = path.erase(it);
        else it++;
    }

    return path;

}

void FixedSP::getShortestPath(int source, vector<int> &distance, vector<int> &path) {//Dijkstra

    vector<bool> visited(nodeNum, false);//记录某个顶点是否被访问
    distance.clear();
    distance.clear();
    distance.resize(nodeNum, INF);
    path.resize(nodeNum, -1);

    distance[source] = 0;

    for (int i = 0; i < nodeNum; i++) {
        int min = INF;//
        int minIndex = -1;
        for (int j = 0; j < nodeNum; j++) {
            if (!visited[j] && distance[j] < min) {
                min = distance[j];
                minIndex = j;
            }//找到当次迭代中的最短边以及最近点
        }
        if (minIndex == -1) {
            break;
        }
        visited[minIndex] = true;
        for (int j = 0; j < nodeNum; j++) {
            if (!visited[j] && matrix[minIndex][j] != INF) {
                if (distance[minIndex] + matrix[minIndex][j] < distance[j]) {
                    distance[j] = distance[minIndex] + matrix[minIndex][j];
                    path[j] = minIndex;
                }
            }
        }//利用找到的最近点进行距离的更新
    }

}

void FixedSP::getShortestPath(int source, vector<int> intermediates, vector<dis> &distances, vector<int> &path, int &min_d) {

    intermediates.push_back(source);
    intermediates.insert(intermediates.begin(), source);//构成一条路径

    vector<int> path_tmp;
    path_tmp.clear();
    int dis_tmp = 0;
    for (auto it = intermediates.begin(); it != intermediates.end()-1; it++) {
        int start = *it;
        int end = *(it+1);

        pair<int, int> p(start, end);
        for(auto it2 = distances.begin(); it2 != distances.end(); it2++) {
            if (it2->p == p) {
                dis_tmp += it2->d;
                path_tmp.insert(path_tmp.end(),  it2->path.begin(), it2->path.end());
                break;
            }
        }
    }

    if (dis_tmp < min_d) {
        min_d = dis_tmp;
        path = path_tmp;
    }

}
