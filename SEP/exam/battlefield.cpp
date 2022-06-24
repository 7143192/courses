 #include "battlefield.h"
#include <iostream>
using namespace std;
// find path in this function
// you can add other functions to solve this problem
// you should print the path if you can find one
// if you can find one, return true, otherwise false
bool BattleField::findPath(){
    flag = false;
    for(int i = 0;i < 100;++i){
        if(field[0][i] == 1) continue;
        Path(0,i);
        if(flag) return true;
        else{
            while(!s.empty()) s.pop();
            for(int i = 0;i < N;++i){
                for(int j = 0;j < N;++j) foundpath[i][j] = 0;
            }
        }
    }
    return false;
}

void BattleField::Path(int x,int y,int LastDirect)
{        
    if(x < 0 || x > 99 || y < 0 || y > 99) return ;
    if(field[x][y] == 1) return ;
    if(foundpath[x][y] == 1) return ;
    if(x == 99 && field[x][y] == 0){
        flag = true;
        s.push(Point(x,y));
        foundpath[x][y] = 0;
        return ;
    }
    foundpath[x][y] = 1;
    for(int i = 0;i < 4;++i){
        if(i == 3 - LastDirect) continue;
        Path(x+dx[i],y+dy[i],i);
        if(flag){
            s.push(Point(x,y));
            foundpath[x][y] = 0;
            return ;
        }
    }
    foundpath[x][y] = 0;
}
