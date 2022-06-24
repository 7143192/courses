#include "simple.h"

Simple::Simple()
{
    num = 100;
    box = new Box*[num + 1];
    for(int i = 0;i <= num;++i) box[i] = nullptr;
    WrongLinkSet();
    DirectLinkSet();
    OneCornerLinkSet();
    TwoCornerLinkSet();
    WrongTwoCornerLinkSet();
}

bool Simple::Check(Box *box1,Box *box2)             //检测可否连接
{
    if(box1 == nullptr||box2 == nullptr) return false;
    if(box1->type != box2->type) return false;
    if(box1->x == box2->x&&box1->y == box2->y) return false;
    if(DirectLink(box1,box2)) return true;
    if(OneCornerLink(box1,box2)) return true;
    if(TwoCornerLink(box1,box2)) return true;
    return false;
}

bool Simple::DirectLink(Box *box1,Box *box2)
{
    if(box1->x == box2->x){
        for(int i = 0;i <= num;++i){
            if(box[i] != nullptr&&box[i]->x == box1->x){
                if(box[i]->y > minimum(box1->y,box2->y)&&box[i]->y < maximum(box1->y,box2->y))
                    return false;
            }
        }
        int x = box1->x,
        y1 = minimum(box1->y,box2->y),y2 = maximum(box1->y,box2->y);
        Point p1(x * 50 + 25,y1 * 50 + 25);
        Point p2(x * 50 + 25,y2 * 50 + 25);
        while(!Points.empty()){
            Points.pop();
        }
        Points.push(p1);
        Points.push(p2);
        return true;
    }                                               //x值相等，判断能否画竖线
    if(box1->y == box2->y){
        for(int i = 0;i <= num;++i){
            if(box[i] != nullptr&&box[i]->y == box1->y){
                if(box[i]->x > minimum(box1->x,box2->x)&&box[i]->x < maximum(box1->x,box2->x))
                    return false;
            }
        }
        int y = box1->y,
        x1 = minimum(box1->x,box2->x),x2 = maximum(box1->x,box2->x);
        Point p1(x1 * 50 + 25,y * 50 + 25);
        Point p2(x2 * 50 + 25,y * 50 + 25);
        while(!Points.empty()){
            Points.pop();
        }
        Points.push(p1);
        Points.push(p2);
        return true;
    }                                              //y值相等，判断能否画横线
    return false;                                  //横竖都不能画，即不能直接用直线连接
}

void Simple::OneCornerPush(Box *box1,Box *box2,Box *box3)
{
    Point p1(box1->x * 50 + 25,box1->y * 50 + 25);
    Point p2(box2->x * 50 + 25,box2->y * 50 + 25);
    Point p3(box3->x * 50 + 25,box3->y * 50 + 25);
    while(!Points.empty()){
        Points.pop();
    }
    Points.push(p1);
    Points.push(p2);
    Points.push(p3);
}

bool Simple::OneCornerLink(Box *box1,Box *box2)
{
    Box *boxa = new Box(box1->x,box2->y);
    Box *boxb = new Box(box2->x,box1->y);                               //生成两个箱子作为中间量
    bool f1 = true;
    bool f2 = true;
    for(int i = 0;i <= num;++i){
        if(box[i] == nullptr) continue;
        if(box[i]->x == boxa->x && box[i]->y == boxa->y) f1 = false;
        if(box[i]->x == boxb->x && box[i]->y == boxb->y) f2 = false;    //防止真实箱子与中间箱子重叠
    }
    if(f1){
        if(DirectLink(box1,boxa)&&DirectLink(boxa,box2)){
            OneCornerPush(box1,boxa,box2);
            delete boxa;
            delete boxb;
            return true;
        }
    }
    if(f2){
        if(DirectLink(box1,boxb)&&DirectLink(boxb,box2)){
            OneCornerPush(box1,boxb,box2);
            delete boxa;
            delete boxb;
            return true;
        }
    }
    delete boxa;
    delete boxb;
    return false;
}

bool Simple::TwoCornerLink(Box *box1,Box *box2)
{
    bool f = true;
    if(box1->x > box2->x){
        int a = box1->x;
        int b = box1->y;
        int t1 = box1->type;
        int t2 = box2->type;
        box1 = new Box(box2->x,box2->y,t1);
        box2 = new Box(a,b,t2);
    }                                                           //始终使得box1的x小，便于讨论
    for(int i = 0;i <= size_y - 1;++i){
        if(i != box1->y&&i != box2->y){
            Box *boxa = new Box(box1->x,i);
            bool f = true;
            for(int j = 0;j <= num;++j){
                if(box[j] == nullptr) continue;
                if(box[j]->x == boxa->x&&box[j]->y == boxa->y) f = false;
            }
            if(f&&DirectLink(box1,boxa)&&OneCornerLink(boxa,box2)){
                while(!Points.empty()){
                    Points.pop();
                }
                Point p1(box1->x * 50 + 25,box1->y * 50 + 25);
                Point p2(boxa->x * 50 + 25,boxa->y * 50 + 25);
                Point p3(box2->x * 50 + 25,boxa->y * 50 + 25);
                Point p4(box2->x * 50 + 25,box2->y * 50 + 25);
                Points.push(p1);
                Points.push(p2);
                Points.push(p3);
                Points.push(p4);
                return true;
            }
        }
    }
    f = true;//竖线
    for(int k = 0;k <= size_x - 1;++k){
        if(k != box1->x&& k != box2->x){
            for(int j = 0;j <= num;++j){
                if(box[j] != nullptr&&box[j]->x == k&&box[j]->y == box1->y){
                    f = false;
                    break;
                }
            }
            if(!f){
                f = true;
                continue;
            }
            Box *boxb = new Box(k,box1->y);
            if(DirectLink(box1,boxb)&&OneCornerLink(boxb,box2)){
                while(!Points.empty()){
                    Points.pop();
                }
                Point p1(box1->x * 50 + 25,box1->y * 50 + 25);
                Point p2(boxb->x * 50 + 25,boxb->y * 50 + 25);
                Point p3(boxb->x * 50 + 25,box2->y * 50 + 25);
                Point p4(box2->x * 50 + 25,box2->y * 50 + 25);
                Points.push(p1);
                Points.push(p2);
                Points.push(p3);
                Points.push(p4);
                return true;
            }
        }
    }                                                       //横线
    //边界情况？
    return false;
}

bool Simple::CheckIsEqual(stack<Point> Points1,stack<Point> Points2)//判断程序得到的点和理想的正确的点是否相同
{
    while(!Points1.empty() && !Points2.empty()){
        Point p1 = Points1.top();
        Point p2 = Points2.top();
        Points1.pop();
        Points2.pop();
        if(p1 != p2) return false;
    }
    return true;
}

void Simple::WrongLinkSet()//用于设置检测异常情况的箱子位置的函数
{
    box[0] = nullptr;
    box[1] = nullptr;                               //测试1：两个均为空
    box[2] = nullptr;
    box[3] = new Box(1,1,1);                        //测试2：有一个为空
    box[4] = new Box(2,1,1);
    box[5] = new Box(3,1,2);                        //测试3：两个箱子均不为空，但是种类不同
    box[6] = new Box(4,1,3);
    box[7] = new Box(4,1,3);                        //测试4：两个箱子类型相同但是坐标重合
}

void Simple::DirectLinkSet()//用于设置直接连接中各种情况的箱子位置的函数
{
    box[8] = new Box(2,2,1);
    box[9] = new Box(2,5,1);
    box[10] = new Box(4,2,1);
    box[11] = new Box(4,5,1);
    box[12] = new Box(4,3,2);                       //测试5：两个箱子之间的竖直线,8,9能画出，10,11不能画出
    box[13] = new Box(6,1,2);
    box[14] = new Box(9,1,2);
    box[15] = new Box(6,3,2);
    box[16] = new Box(9,3,2);
    box[17] = new Box(8,3,1);                       //测试6：两个箱子之间的横直线，13,14能画出，15,16不能
}

void Simple::OneCornerLinkSet()//用于设置一个拐点连接中各种情况的箱子位置的函数
{
    box[18] = new Box(12,3,1);
    box[19] = new Box(11,1,1);
    box[20] = new Box(13,3,1);
    box[21] = new Box(14,1,1);
    box[22] = new Box(13,1,2);
    box[23] = new Box(16,3,1);
    box[24] = new Box(15,1,1);
    box[25] = new Box(16,2,3);                      //测试7：一个拐点的直线能成功连接的几种情况
    box[26] = new Box(6,6,2);
    box[27] = new Box(8,8,2);
    box[28] = new Box(6,8,1);
    box[29] = new Box(8,6,1);
    box[30] = new Box(10,6,2);
    box[31] = new Box(12,8,2);
    box[32] = new Box(12,6,1);
    box[33] = new Box(10,7,1);
    box[34] = new Box(14,6,2);
    box[35] = new Box(16,8,2);
    box[36] = new Box(14,7,1);
    box[37] = new Box(16,7,1);                      //测试8：无法通过一个拐点的直线来连接的几种情况
}

void Simple::TwoCornerLinkSet()//用于设置两个拐点连接中各种情况的箱子位置的函数
{
    box[38] = new Box(17,0,1);
    box[39] = new Box(19,1,1);
    box[40] = new Box(17,19,1);
    box[41] = new Box(19,18,1);
    box[42] = new Box(17,4,1);
    box[43] = new Box(19,5,1);
    box[44] = new Box(17,5,2);
    box[45] = new Box(19,7,2);
    box[46] = new Box(17,7,3);
    box[47] = new Box(19,8,3);      //测试9：先画竖线再画横线再画竖线的两个拐点的连线可以被画出的情况
    box[48] = new Box(0,10,1);
    box[49] = new Box(1,12,1);
    box[50] = new Box(6,12,1);
    box[51] = new Box(7,10,1);
    box[52] = new Box(7,12,2);
    box[53] = new Box(9,10,2);
    box[54] = new Box(9,12,3);
    box[55] = new Box(10,10,3);     //测试10：先画横线再画竖线再画横线的两个拐点的连线可以被画出来的情况
    box[56] = new Box(0,9,1);
    box[57] = new Box(0,11,2);
    box[58] = new Box(7,9,2);
    box[59] = new Box(7,11,1);
    box[60] = new Box(10,11,2);
    box[61] = new Box(6,11,2);      //56~61号箱子是为了构造符合条件的情况
}

void Simple::WrongTwoCornerLinkSet()
{
    box[62] = new Box(22,0,1);
    box[63] = new Box(24,1,1);
    box[64] = new Box(22,1,2);
    box[65] = new Box(23,2,2);
    box[66] = new Box(24,0,2);
    box[67] = new Box(23,1,1);
    box[68] = new Box(0,14,1);
    box[69] = new Box(1,16,1);
    box[70] = new Box(0,16,2);
    box[71] = new Box(1,14,2);
    box[72] = new Box(2,15,2);
    box[73] = new Box(1,15,1);      //测试11：二拐点连线失败的几种情况
}
