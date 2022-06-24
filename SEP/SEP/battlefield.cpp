#include "battlefield.h"

// find path in this function
// you can add other functions to solve this problem
// you should print the path if you can find one
// if you can find one, return true, otherwise false
bool BattleField::findPath(){
    for(int i=0;i<100;i++)
    {
        if(field[0][i]==-1)continue;
        if(DFS(0,i)){
            while (!s.empty()) {
                Node iter;
                iter = s.top();
                t.push(iter);
                s.pop();
            }
            while (!t.empty()) {
                field[t.top().x][t.top().y]=1;
                t.pop();
            }
            return true;}
        break;
    }
    return false;
}

bool BattleField::DFS(int dh, int dw)
{

    temp.x = dh;
    temp.y = dw;
    s.push(temp);
    if (dh == 99 )//判断当前点是否是出口
        return true;


    for (int i = 0; i < 3; ++i) {//寻找当前点四个方向上的点
        int th = dh + dir[i][0], tw = dw + dir[i][1];
        if (check(th, tw) && map[th][tw] != -1) {//如果能走通，就一直走，
            map[dh][dw] = -1;//标记当前点
            if (DFS(th, tw))
                return true;
        }

    }
    s.pop();//如果四个方向都走不通，说明这个点是错误的，弹出栈。往回走
    return false;


}
