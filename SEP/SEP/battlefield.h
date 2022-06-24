#ifndef BOARD_H
#define BOARD_H
#endif // BOARD_H
#include <stack>
#include <iostream>
#include <cstdlib>
using namespace std;

// Don't change, width = N, height = N
#define N 100



class BattleField
{
    struct Node {
        int x, y;
        Node() = default;
        Node(int X, int Y) : x(X), y(Y) {}
    };
public:
    int field[N][N];
    int dir[3][2] = {
        {1,0},
        {0,-1},
        /*{-1,0},*/
        {0,1}
    };
    // find path in this function
    bool findPath();
    bool DFS(int dh,int dw);
    bool check(int x, int y) {
        if (x < 100 && x >= 0 && y >= 0 && y < 100)
            return true;
        else return false;
    }
    stack<Node> s, t;
    int map[N][N];
    Node temp;
};
