#include <vector>
#include <string>
#include <string.h>

using namespace std;

#define INF 1e8

class dis {
public:
    pair<int, int> p;
    int d;
    vector<int> path;
    dis() {}
    dis(pair<int, int> p, int d, vector<int> path) {
        this->p = p;
        this->d = d;
        this->path = path;
    }
    ~dis() {
    }

};//使用dist数据结构来存储，这样就不用每次用到的时候在重新计算距离了！

class FixedSP
{

private:
    int nodeNum;
    vector<vector<int>> matrix;
public:
    FixedSP(vector<vector<int>> m) { nodeNum = m[0].size(); matrix = m; }
    ~FixedSP() {vector<vector<int>>().swap(matrix);}

    vector<int> getFixedPointShortestPath(int source, vector<int> intermediates);
    void getShortestPath(int source, vector<int>& distance, vector<int> &path);
    void getShortestPath(int source, vector<int> intermediates, vector<dis> &distances, vector<int> &path, int &min_d);
};
