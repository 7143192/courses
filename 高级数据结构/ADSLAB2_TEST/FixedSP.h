#include <vector>
#include <string>
#include <string.h>

using namespace std;

#define INF 1e8

class FixedSP
{
private:
    vector<vector<int>> data;
public:
    FixedSP(vector<vector<int>> matrix) {
        data = matrix;
    }
    ~FixedSP() {}

    vector<int> getFixedPointShortestPath(int source, vector<int> intermediates);

    vector<int> Dijkstra(int start, int end);//找某两个给定点之间的最短路径和距离
    //获取所有全排列路径
    void GetAllPath(vector<int> node, int start, int end, vector<vector<int>> &ans);

    int CountPathLen(vector<int> path);//获取某一条路径的总长度

    int GetMinPath(vector<int> Len);//获取所有路径中最短的一条

    vector<int> FindMatchedPath(vector<int> pair, vector<vector<int>> pairs, vector<vector<int>> paths);

    void getMinPath_parallel(vector<vector<int>> AllPaths, int &min_len, vector<int> &min_path
                             , int start, int end, int source);
};
