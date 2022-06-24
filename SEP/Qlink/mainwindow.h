#pragma once
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include<cstdlib>
#include<stack>
#include<QTimer>
#include<QPushButton>
#include<QMouseEvent>
#include<QMenuBar>
#include<QMenu>
QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class Charater:public QWidget
{
    Q_OBJECT

public:
    int x;
    int y;  //角色的位置参数
    Charater(int x = 0,int y = 0):x(x),y(y){}
};

class Box:public QWidget
{
    Q_OBJECT

public:
    int x;
    int y;           //箱子的位置参数
    int type;        //箱子的类型参数
    bool f1 = false; //判断某个方向是否被a选中
    bool f2 = false; //判断某个方向是否被b选中
    Box(int x = 0,int y = 0,int t = 1):x(x),y(y),type(t),
    f1(false),f2(false){}      //构造函数
    ~Box(){}
};

class Tools:public QWidget
{
    Q_OBJECT

public:
    int x;
    int y;          //道具的坐标位置
    int type;       //道具的类型
    bool f1 = false;//用于判断是否被a选中
    bool f2 = false;//用于判断是否被b选中
    Tools(int x = 0,int y = 0,int t = 1):x(x),y(y)
    ,type(t),f1(false),f2(false){}  //构造函数

};

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    Charater *charater_a = nullptr;
    Charater *charater_b = nullptr;
    Box **box;                      //初始化
    static const int size_x = 35;
    static const int size_y = 19;                //设置格数，每格边长认为是50
    int num; 
    int AToBeChecked[2] = {0};      //用于存储待检测被a选中的两个箱子是否可连接
    int BToBeChecked[2] = {0};      //用于存储待检测被b选中的两个箱子是否可连接
    bool Frozen;                    //用于判断剩余箱子能否继续消除
    std::stack<QPoint> points;      //存储用于画两个箱子之间的连线的点
    int MaxTime = 90;               //设置A最大时间
    int MaxTime1 = 90;              //设置B最大时间
    int HintTime = 20;              //设置最大提醒时间
    int FlashTime = 20;             //设置最大鼠标控制时间
    int AGrade;                     //用于记录A的得分
    int BGrade;                     //用于记录B的得分
    int *HintPos;                   //用于存储待检测是否可连接的两个箱子的下标
    int LeftNum;                    //用于记录剩余箱子的数量
    bool *IsLeft;                   //用于判断save时各个道具是否存在
    bool IsHinted;                  //用于判断是否进入了提示状态
    bool IsFlashing;                //用于判断是否进入了鼠标控制状态
    QTimer *timer;                  //总时间进度条
    QTimer *HintTimer;              //提示时间进度条
    QTimer *FlashTimer;             //鼠标控制时间进度条
    Tools *TimePlusTool;            //加时道具
    Tools *ShuffleTool;             //重排道具
    Tools *HintTool;                //提示道具
    Tools *FlashTool;               //鼠标控制道具
    bool Paused;                    //用于判断游戏是否处于暂停状态
    bool IsDouble;                  //用于判断游戏是否处于双人模式
    int TimePlusTimes;              //用于记录游戏中进行过的加时次数
    int j = 0;
    int k = 0;
    int Time = 1;                   //用于记录暂停键被按下的次数
    void ACheckIsLink();
    void BCheckIsLink();
    bool CheckIsFrozen();
    bool CheckIsWin();
    bool CheckDoubleWin();
    void Set();
    void CheckIsPaused();
    void File();
private:
    Ui::MainWindow *ui;
private slots:
    void ATimerEvent();
    void BTimerEvent();
    void AGradeEvent();
    void BGradeEvent();
    void HintEvent();
    void FlashEvent();
    void PauseButtonPressEvent();
    void PauseButtonRepressEvent();
    void on_actionOpen_triggered();
    void on_actionSave_triggered();
protected:
    virtual void keyPressEvent(QKeyEvent *event) override;
    virtual void paintEvent(QPaintEvent *event) override;
    bool DirectLink(Box *box1,Box *box2);
    bool OneCornerLink(Box *box1,Box *box2);
    bool TwoCornerLink(Box *box1,Box *box2);
    bool Check(Box *box1,Box *box2);
    int minimum(int a,int b)
    {
        return (a < b ? a : b);
    }
    int maximum(int a,int b)
    {
        return (a > b ? a : b);
    }
    void TimePlus();
    void Shuffle();
    void Prevent();
    bool CheckGameOver();
    void CheckIsChosenA();
    void CheckIsChosenB();
    void mousePressEvent(QMouseEvent *event) override;
    void OneCornerPush(Box *box1,Box *box2,Box *box3);
    void PaintTimePlusTool(QPainter &painter);
    void PaintShuffleTool(QPainter &painter);
    void PaintHintTool(QPainter &painter);
    void PaintFlashTool(QPainter &painter);
    void PaintBox(QPainter &painter, Box *box, int Num);
};
#endif // MAINWINDOW_H
