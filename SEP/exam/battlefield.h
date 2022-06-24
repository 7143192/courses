#ifndef BOARD_H
#define BOARD_H
#endif // BOARD_H

// Don't change, width = N, height = N
#define N 100
#include <stack>
class BattleField
{
public:
    class Point
    {
    public:
        int x;
        int y;
        Point(int x1,int y1)
        {
            x = x1;
            y = y1;
        }
    };
    int field[N][N];
    int foundpath[N][N];
    const int dx[4] = {1, 0, 0, -1};
    const int dy[4] = {0, -1, 1, 0};
    int num = 0;
    bool flag = false;
    std::stack<Point> s;
    int enemypos[N][2];
    // find path in this function
    bool findPath();
    void Path(int x,int y,int LastDirect = -1);
};


