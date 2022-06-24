#ifndef SIMPLE_H
#define SIMPLE_H
#include<stack>
using namespace std;
class Box
{
public:
    int x;
    int y;                      //坐标
    int type;                   //箱子类型
    Box(int x = 0,int y = 0,int t = 1):x(x),y(y),type(t){}//构造函数
    ~Box(){}
};

struct Point
{
    int x;
    int y;
    Point(int x = 0,int y = 0):x(x),y(y){}
    bool operator!=(Point point)
    {
        if(x != point.x || y != point.y) return true;
        else return false;
    }
};                          //用于存放线段上的拐点的结构体

class Simple
{
public:
    int num;
    static const int size_x = 30;
    static const int size_y = 20;   //设置地图的最大长度宽度，每个格子默认50*50
    Box **box;
    stack<Point> Points;
    Simple();
    bool DirectLink(Box *box1,Box *box2);
    bool OneCornerLink(Box *box1,Box *box2);
    bool TwoCornerLink(Box *box1,Box *box2);
    bool Check(Box *box1,Box *box2);
    void OneCornerPush(Box *box1,Box *box2,Box *box3);
    bool CheckIsEqual(stack<Point> Points1,stack<Point> Points2);
    void WrongLinkSet();
    void DirectLinkSet();
    void OneCornerLinkSet();
    void TwoCornerLinkSet();
    void WrongTwoCornerLinkSet();
    int minimum(int a,int b)
    {
        return (a < b ? a : b);
    }
    int maximum(int a,int b)
    {
        return (a > b ? a : b);
    }

};

#endif // SIMPLE_H
