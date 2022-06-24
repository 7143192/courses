#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QPainter>
#include <QKeyEvent>
#include <cstdlib>
#include <iostream>
#include <QPushButton>
#include <QMessageBox>
#include <QFileDialog>
#include <QDebug>
#include <QTime>
#include <QDir>
#include <QFile>
#include <QIODevice>
using namespace std;
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)                //初始化成员变量
{
    srand(time(0));                         //rand函数要自己设置种子，不然序列相同_(:з」∠)_
    ui->setupUi(this);
    num = 1 + rand() * 200 / (RAND_MAX + 1);
    box = new Box*[num + 1];
    HintPos = new int[2];
    HintPos[0] = 0;
    HintPos[1] = 0;
    IsLeft = new bool[4];
    for(int i = 0;i < 4;++i) IsLeft[i] = false;
    IsHinted = false; IsFlashing = false;
    LeftNum = 0;
    box[0] = new Box(0,0,1);
    Frozen = false;
    Paused = false;
    IsDouble = false;
    AGrade = 0;
    BGrade = 0;                             //对类中的变量进行初始化
    for(int i = 1;i <= num;++i){
        int t = 1 + rand() * 3 / (RAND_MAX  + 1);
        int x = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
        int y = 2 + rand() * (size_y - 2) / (RAND_MAX + 1);
        for(int j = 0;j <= i-1;++j){
            if((box[j]->x == x&&box[j]->y == y)||y == 0||y == 1) x = (x + 1) % size_x;
        }                                                           //防止初始时箱子间产生重叠
        box[i] = new Box(x,y,t);            //随机生成箱子
    }
    int x = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
    int y = 2 + rand() * (size_y - 2) / (RAND_MAX + 1);
    int xb = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
    int yb = 2 + rand() * (size_y - 2) / (RAND_MAX + 1);//随机生成角色位置
    for(int i = 1;i <= num; ++i){
        for(int j = 0;j <= i - 1;++j){
            if(box[j]->x == x && box[j]->y == y) x = (x + 1) % size_x;
            if(box[j]->x == xb && box[j]->y == yb) xb = (xb + 1) % size_x;
        }
    }                                                               //防止角色与箱子在初始时重叠
    charater_a = new Charater(x,y);                                 //生成角色a
    charater_b = new Charater(xb,yb);                               //生成角色b
    int x1 = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
    int y1 = 2 + rand() * (size_y - 2) / (RAND_MAX + 1);
    int x2 = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
    int y2 = 2 + rand() * (size_y - 2) / (RAND_MAX + 1);
    int x3 = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
    int y3 = 2 + rand() * (size_y - 2) / (RAND_MAX + 1);
    int x4 = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
    int y4 = 2 + rand() * (size_y - 2) / (RAND_MAX + 1);//随机生成各个道具的位置
    int t1 = 1,t2 = 2,t3 = 3,t4 = 4;
    TimePlusTool = new Tools(x1,y1,t1);                 //生成+1s道具
    ShuffleTool = new Tools(x2,y2,t2);                  //生成重置地图道具
    HintTool = new Tools(x3,y3,t3);                     //生成hint道具
    FlashTool = new Tools(x4,y4,t4);                    //生成Flash道具
    Prevent();
    Set();
    // 设置窗口的标题
    setWindowTitle(tr("Qlink"));
    // 设置 widget 大小
    resize(size_x * 50,size_y * 50);
}

MainWindow::~MainWindow()                   //析构函数
{
    delete ui;
}

void MainWindow::paintEvent(QPaintEvent *)  //绘图函数
{
    if(!IsDouble){
        bool f = CheckGameOver();           //检查单人模式下游戏是否结束
        if(f) return ;
    }
    else{
        bool f = CheckDoubleWin();          //检查双人模式下游戏是否结束
        if(f) return ;
    }
    CheckIsPaused();                        //检测是否暂停
    QPoint posa = QPoint(charater_a->x * 50 + 25,charater_a->y * 50 + 25);
    QColor colora(0,255,0);
    QPainter painter(this);
    // 设置 painter 的抗锯齿，让画出来的线更平滑
    painter.setRenderHint(QPainter::Antialiasing);
    painter.setPen(Qt::NoPen);
    painter.setBrush(colora);
    painter.save();
    painter.drawEllipse(posa,20,20);            //画角色a
    painter.restore();
    if(IsDouble){
        QPoint posb = QPoint(charater_b->x * 50 + 25,charater_b->y * 50 + 25);
        QColor colorb(0,0,255);
        painter.setBrush(colorb);
        painter.save();
        painter.drawEllipse(posb,20,20);            //若是双人模式则画角色b
        painter.restore();
    }
    PaintTimePlusTool(painter);
    PaintShuffleTool(painter);
    PaintHintTool(painter);
    PaintFlashTool(painter);
    while(!points.empty() && points.size() >= 2){
        QPoint p1 = points.top();
        points.pop();
        QPoint p2 = points.top();
        QColor linecolor(255,0,0);
        painter.setPen(linecolor);              //划线时需要设置边框颜色为线的颜色
        painter.setBrush(linecolor);
        painter.drawLine(p1,p2);                //通过栈中存储的点画出两个方块之间的能使之消除的连线
    }
    for(int i = 1;i <= num; ++i){
        painter.setPen(Qt::NoPen);             
        if(j == 2) ACheckIsLink();
        if(IsDouble&&k == 2) BCheckIsLink();
        if(box[i] == nullptr) continue;
        PaintBox(painter, box[i], i);
    }                                           //画出三种不同类型的矩形，并且随机位置放置
    /*QColor line_color(0,0,0);
    painter.setPen(line_color);
    painter.setBrush(line_color);
    int x1=0,x2=size_x,y1=0,y2=0;
    for(;y1<=size_y;++y1,++y2)
        painter.drawLine(x1*50,y1*50,x2*50,y2*50);//划线分出格子
    x1=0,x2=0,y1=0,y2=size_y;
    for(;x1<=size_x;++x1,++x2)
        painter.drawLine(x1*50,y1*50,x2*50,y2*50);  //划线分区*/
}

void MainWindow::keyPressEvent(QKeyEvent *event)    //判断按键的函数,WASD控制角色A，UHJK控制角色B
{
    if(event->key() == Qt::Key_W){                    //W(A向上移动)
        charater_a->y = (charater_a->y + size_y - 1) % size_y;
        CheckIsChosenA();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
    if(event->key() == Qt::Key_A){                    //A(A向左移动)
        charater_a->x = (charater_a->x + size_x - 1) % size_x;
        CheckIsChosenA();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
    if(event->key() == Qt::Key_S){                    //S(A向下移动)
        charater_a->y = (charater_a->y + 1) % size_y;
        CheckIsChosenA();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
    if(event->key() == Qt::Key_D){                    //D(A向右移动)
        charater_a->x = (charater_a->x + 1) % size_x;
        CheckIsChosenA();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
    if(event->key() == Qt::Key_U && IsDouble){       //U(B向上移动)
        charater_b->y = (charater_b->y + size_y - 1) % size_y;
        CheckIsChosenB();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
    if(event->key() == Qt::Key_H && IsDouble){     //H(B向左移动)
        charater_b->x = (charater_b->x + size_x - 1) % size_x;
        CheckIsChosenB();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
    if(event->key() == Qt::Key_J && IsDouble){    //J(B向下移动)
        charater_b->y = (charater_b->y + 1) % size_y;
        CheckIsChosenB();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
    if(event->key() == Qt::Key_K && IsDouble){   //K(B向右移动)
        charater_b->x = (charater_b->x + 1) % size_x;
        CheckIsChosenB();
        if(!Paused && !CheckIsFrozen() && !CheckIsWin() && MaxTime > 0 && !CheckDoubleWin()) update();
        return ;
    }
}

bool MainWindow::DirectLink(Box *box1,Box *box2)  //判断两个箱子能否直接通过直线连接,两个参数分别为要判断的两个箱子
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
        if(!Frozen){
            QPoint p1(x * 50 + 25,y1 * 50 + 25);
            QPoint p2(x * 50 + 25,y2 * 50 + 25);
            while(!points.empty()){
                points.pop();
            }
            points.push(p1);
            points.push(p2);
        }
        return true;
    }                                               //情况一：x值相等，判断能否画竖线
    if(box1->y == box2->y){
        for(int i = 0;i <= num;++i){
            if(box[i] != nullptr&&box[i]->y == box1->y){
                if(box[i]->x > minimum(box1->x,box2->x)&&box[i]->x < maximum(box1->x,box2->x))
                    return false;
            }
        }
        int y = box1->y,
        x1 = minimum(box1->x,box2->x),x2 = maximum(box1->x,box2->x);
        if(!Frozen){
            QPoint p1(x1 * 50 + 25,y * 50 + 25);
            QPoint p2(x2 * 50 + 25,y * 50 + 25);
            while(!points.empty()){
                points.pop();
            }
            points.push(p1);
            points.push(p2);
        }
        return true;
    }                                              //情况二：y值相等，判断能否画横线
    return false;                                  //情况三：横竖都不能画，即不能直接用直线连接
}                                                  // 函数返回值是说明能否用直线连接

bool MainWindow::OneCornerLink(Box *box1,Box *box2)//判断两个箱子能否通过有一个拐点的折线连接
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
        if(DirectLink(box1,boxa)&&DirectLink(boxa,box2)){               //将双折线问题分解为两个直线
            if(!Frozen){
                OneCornerPush(box1,boxa,box2);                          //若未形成僵局则记录数据点
            }
            delete boxa;
            delete boxb;
            return true;
        }
    }
    if(f2){
        if(DirectLink(box1,boxb)&&DirectLink(boxb,box2)){
            if(!Frozen){
                OneCornerPush(box1,boxb,box2);
            }
            delete boxa;
            delete boxb;
            return true;
        }
    }
    delete boxa;
    delete boxb;
    return false;
}                                                   //函数返回值说明能否用一拐点折线连接

bool MainWindow::TwoCornerLink(Box *box1,Box *box2)//判断两个箱子能否通过有两个拐点的折线连接
{                                          //两个拐点的折线可以理解成由一个直线和一个一拐点的折线构成
    bool f = true;
    if(box1->x > box2->x){
        int a = box1->x;
        int b = box1->y;
        box1 = new Box(box2->x,box2->y);
        box2 = new Box(a,b);
    }                                                           //始终使得box1的x小，便于讨论
    for(int i = 2;i <= size_y - 1;++i){
        if(i != box1->y&&i != box2->y){                         //利用循环来寻找可能的拐点
            Box *boxa = new Box(box1->x,i);
            bool f = true;
            for(int j = 0;j <= num;++j){
                if(box[j] == nullptr) continue;
                if(box[j]->x == boxa->x&&box[j]->y == boxa->y) f = false;
            }
            if(f&&DirectLink(box1,boxa)&&OneCornerLink(boxa,box2)){
                if(!Frozen){
                    while(!points.empty()){
                        points.pop();
                    }
                    QPoint p1(box1->x * 50 + 25,box1->y * 50 + 25);
                    QPoint p2(boxa->x * 50 + 25,boxa->y * 50 + 25);
                    QPoint p3(box2->x * 50 + 25,boxa->y * 50 + 25);
                    QPoint p4(box2->x * 50 + 25,box2->y * 50 + 25);
                    points.push(p1);
                    points.push(p2);
                    points.push(p3);
                    points.push(p4);                            //利用一个std栈来实现数据点的存储
                }
                return true;
            }
        }
    }                                                        //情况一：先画无拐点竖线再画一拐点折线
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
                if(!Frozen){
                    while(!points.empty()){
                        points.pop();
                    }
                    QPoint p1(box1->x * 50 + 25,box1->y * 50 + 25);
                    QPoint p2(boxb->x * 50 + 25,boxb->y * 50 + 25);
                    QPoint p3(boxb->x * 50 + 25,box2->y * 50 + 25);
                    QPoint p4(box2->x * 50 + 25,box2->y * 50 + 25);
                    points.push(p1);
                    points.push(p2);
                    points.push(p3);
                    points.push(p4);                        //用栈来记录数据点
                }
                return true;
            }
        }
    }                                                       //情况二：先画无拐点横线再画一拐点折线
    return false;
}                                                           //返回值是说明能否用二拐点折线进行连接

bool MainWindow::Check(Box *box1,Box *box2)                 //检测可否连接
{
    if(box1 == nullptr||box2 == nullptr) return false;      //待判断的箱子有一个为空则不能连接
    if(box1->type != box2->type) return false;              //两个箱子类型（颜色）不同不能连接
    if(box1->x == box2->x&&box1->y == box2->y) return false;//两个箱子重合不能连接
    if(DirectLink(box1,box2)) return true;
    if(OneCornerLink(box1,box2)) return true;
    if(TwoCornerLink(box1,box2)) return true;               //由简入繁，按照无拐点、一拐点、二拐点的顺序进行判断
    return false;                                           //若三种折线（或直线）都无法连接则判断结束
}

void MainWindow::ACheckIsLink()                              //用于检测被a选中的两个箱子是否可连接
{
    bool f = Check(box[AToBeChecked[0]],box[AToBeChecked[1]]);//检测两个箱子能否连接
    ui->OutLabel->setGeometry(1000, 0, 200, 100);
    QString str0 = "A可连接";
    QString str1 = "A不可连接";
    if(f){
        j = 0;
        int t1 = box[AToBeChecked[0]]->type;
        if(t1 == 1) AGrade+=10;
        if(t1 == 2) AGrade+=20;
        if(t1 == 3) AGrade+=30;                             //对三类不同的箱子分别记分处理
        box[AToBeChecked[0]] = nullptr;                     //若判断两个箱子可以连接，则删除两个箱子
        box[AToBeChecked[1]] = nullptr;
        ui->OutLabel->setText(str0);
        ui->OutLabel->setAlignment(Qt::AlignCenter);
        QFont Ft;
        Ft.setPointSize(20);
        ui->OutLabel->setFont(Ft);                          //显示可连接
        update();
    }
    else{
        j = 1;
        AToBeChecked[0] = AToBeChecked[1];                  //若不能连接，重新记录
        ui->OutLabel->setText(str1);
        ui->OutLabel->setAlignment(Qt::AlignCenter);
        QFont Ft;
        Ft.setPointSize(20);
        ui->OutLabel->setFont(Ft);                          //显示不可连接
    }
}

void MainWindow::BCheckIsLink()                             //用于检测被b选中的两个箱子是否可连接(与A同理)
{
    bool f = Check(box[BToBeChecked[0]],box[BToBeChecked[1]]);//检测两个箱子能否连接
    ui->OutLabel1->setGeometry(1300, 0, 200, 100);
    QString str0 = "B可连接";
    QString str1 = "B不可连接";
    if(f){
        k = 0;
        int t1 = box[BToBeChecked[0]]->type;
        if(t1 == 1) BGrade+=10;
        if(t1 == 2) BGrade+=20;
        if(t1 == 3) BGrade+=30;                             //对三类不同的箱子进行不同的记分处理
        box[BToBeChecked[0]] = nullptr;
        box[BToBeChecked[1]] = nullptr;                     //若可以连接则删除两个箱子
        ui->OutLabel1->setText(str0);
        ui->OutLabel1->setAlignment(Qt::AlignCenter);
        QFont Ft;
        Ft.setPointSize(20);
        ui->OutLabel1->setFont(Ft);                          //显示可连接
        update();
    }
    else{
        k = 1;
        BToBeChecked[0] = BToBeChecked[1];                  //若不可连接则忽略第一个被选中的箱子重新计数
        ui->OutLabel1->setText(str1);
        ui->OutLabel1->setAlignment(Qt::AlignCenter);
        QFont Ft;
        Ft.setPointSize(20);
        ui->OutLabel1->setFont(Ft);                          //显示不可连接
    }
}

bool MainWindow::CheckIsFrozen()                            //用于检测游戏是否可以继续进行
{
    for(int i = 1;i < num;++i){
        for(int j = i + 1;j <= num;++j){
            Frozen = true;
            if(Check(box[i],box[j])){
                HintPos[0] = i;                             //在检测能否连接的同时，若能则记录可能的提示
                HintPos[1] = j;
                Frozen = false;                             //若存在可连接的点，则不是僵局
                return false;
            }
        }
    }
    Frozen = false;
    return true;                                            //若不存在可连接的点则是僵局
}

bool MainWindow::CheckIsWin()                               //用于检测是否有剩余箱子（即判断是否游戏胜利）
{
    for(int i = 1;i <= num;++i){
        if(box[i] != nullptr) return false;                 //单人模式下若未形成僵局且有剩余箱子则游戏未结束
    }
    return true;                                            //若无剩余箱子则游戏结束
}

bool MainWindow::CheckDoubleWin()                           //双人模式中在游戏结束时判断哪方获胜
{
    if(CheckGameOver()){
        if(AGrade > BGrade){                                //A胜利
            QString str = "游戏结束，A获胜！";
            ui->label1->setGeometry(0,100,1750,900);
            ui->label1->setText(str);
            timer->stop();
            HintTimer->stop();
            return true;
        }
        else{                                               //B胜利
            if(AGrade < BGrade){
                QString str = "游戏结束，B获胜！";
                ui->label1->setGeometry(0,100,1750,900);
                ui->label1->setText(str);
                timer->stop();
                HintTimer->stop();
                return true;
            }
            else{                                           //AB平手
                QString str = "游戏结束，双方平手！";
                ui->label1->setGeometry(0,100,1750,900);
                ui->label1->setText(str);
                timer->stop();
                HintTimer->stop();
                return true;
            }
        }
    }
    else return false;
}

void MainWindow::TimePlus()                                 //实现加时功能(加30s)
{
    if(TimePlusTool->f1){                                   //加时道具被A选中
        MaxTime += 30;
        if(MaxTime > 90) MaxTime = 90;
        TimePlusTool = nullptr;
    }
    else{
        if(IsDouble&&TimePlusTool->f2){                     //(在双人模式下)加时道具被B选中
            MaxTime1 += 30;
            if(MaxTime1 > 90) MaxTime1 = 90;
            TimePlusTool = nullptr;
        }
    }
}

void MainWindow::Shuffle()                                  //实现重新排序功能
{
    Box **box1 = box;
    for(int i = 1;i <= num;++i){
        if(box1[i] != nullptr){
            int x = 1 + rand() * (size_x - 1) / (RAND_MAX + 1);
            int y = 2 + rand() * (size_y - 2) / (RAND_MAX + 1); //再次随机生成各个箱子的位置
            if(x == charater_a->x && y == charater_a->y) x = (x + 1) % size_x;
            if(IsDouble && x == charater_b->x && y == charater_b->y) x = (x + 1) % size_y;
            for(int j = 0;j <= i-1;++j){
                if(box[j] != nullptr){
                    if(box[j]->x == x&&box[j]->y == y) x = (x + 1) % size_x;
                    if(TimePlusTool != nullptr) if(x == TimePlusTool->x && y == TimePlusTool->y) x = (x + 1) % size_x;
                    if(ShuffleTool != nullptr) if(x == ShuffleTool->x && y == ShuffleTool->y) x = (x + 1) % size_x;
                    if(HintTool != nullptr) if(x == HintTool->x && y == HintTool->y) x = (x + 1) % size_x;
                    if(FlashTool != nullptr) if(x == FlashTool->x && y == FlashTool->y) x = (x + 1) % size_x;//防止箱子和道具重合
                }
            }
            box[i] = new Box(x,y,box1[i]->type);
        }
        else box[i] = nullptr;
    }
}

void MainWindow::ATimerEvent()                               //与A计时器相关的handler函数
{
    ui->Bar->setValue(MaxTime);
    MaxTime--;
}

void MainWindow::BTimerEvent()                              //与B计时器有关的handler函数
{
    if(IsDouble){
        ui->Bar1->setValue(MaxTime1);
        MaxTime1--;
    }
}

void MainWindow::AGradeEvent()                              //与A的得分显示相关的handler函数
{
    ui->labela2->setNum(AGrade);
}

void MainWindow::BGradeEvent()                              //与B的得分显示相关的handler函数
{
    ui->labelb2->setNum(BGrade);
}

void MainWindow::HintEvent()                                //与提示时间相关的handler函数
{
    ui->bar->setValue(HintTime--);
    update();
}

void MainWindow::FlashEvent()                               //与鼠标控制时间相关的handler函数
{
    ui->bar1->setValue(FlashTime--);
}

void MainWindow::Prevent()                                  //防止可能出现的道具与其他元素碰撞的产生
{
    if((TimePlusTool->x == ShuffleTool->x&&TimePlusTool->y == ShuffleTool->y)
    ||(TimePlusTool->x == HintTool->x&&TimePlusTool->y == HintTool->y)||(TimePlusTool->x == FlashTool->x&&TimePlusTool->y == FlashTool->y)){
        TimePlusTool->x = (TimePlusTool->x + 1) % size_x;
    }
    if((ShuffleTool->x == TimePlusTool->x&&ShuffleTool->y == TimePlusTool->y)
    ||(ShuffleTool->x == HintTool->x&&ShuffleTool->y == HintTool->y)||(ShuffleTool->x == FlashTool->x&&ShuffleTool->y == FlashTool->y)){
        ShuffleTool->x = (ShuffleTool->x + 1) % size_x;
    }
    if((HintTool->x == TimePlusTool->x&&HintTool->y == TimePlusTool->y)
    ||(HintTool->x == ShuffleTool->x&&HintTool->y == ShuffleTool->y)||(HintTool->x == FlashTool->x&&HintTool->y == FlashTool->y)){
        HintTool->x = (HintTool->x + 1) % size_x;
    }
    if((FlashTool->x == TimePlusTool->x&&FlashTool->y == TimePlusTool->y)
    ||(FlashTool->x == HintTool->x&&FlashTool->y == HintTool->y)||(FlashTool->x == ShuffleTool->x&&FlashTool->y == ShuffleTool->y)){
        FlashTool->x = (FlashTool->x + 1) % size_x;
    }
    for(int i = 1;i <= num;++i){
        for(int j = 0;j <= i - 1;++j){
            if(box[j]->x == TimePlusTool->x && box[j]->y == TimePlusTool->y) TimePlusTool->x = (TimePlusTool->x + 1) % size_x;
            if(box[j]->x == ShuffleTool->x && box[j]->y == ShuffleTool->y) ShuffleTool->x = (ShuffleTool->x + 1) % size_x;
            if(box[j]->x == HintTool->x && box[j]->y == HintTool->y) HintTool->x = (HintTool->x + 1) % size_x;
            if(box[j]->x == FlashTool->x && box[j]->y == FlashTool->y) FlashTool->x = (FlashTool->x + 1) % size_x;//防止箱子和道具重合
        }
    }
    if(TimePlusTool->x == charater_a->x && TimePlusTool->y == charater_a->y) TimePlusTool->x = (TimePlusTool->x + 1) % size_x;
    if(ShuffleTool->x == charater_a->x && ShuffleTool->y == charater_a->y) ShuffleTool->x = (ShuffleTool->x + 1) % size_x;
    if(HintTool->x == charater_a->x && HintTool->y == charater_a->y) HintTool->x = (HintTool->x + 1) % size_x;
    if(FlashTool->x == charater_a->x && FlashTool->y == charater_a->y) FlashTool->x = (FlashTool->x + 1) % size_x;//防止道具和角色a重合
    if(IsDouble){
        if(TimePlusTool->x == charater_b->x && TimePlusTool->y == charater_b->y) TimePlusTool->x = (TimePlusTool->x + 1) % size_x;
        if(ShuffleTool->x == charater_b->x && ShuffleTool->y == charater_b->y) ShuffleTool->x = (ShuffleTool->x + 1) % size_x;
        if(HintTool->x == charater_b->x && HintTool->y == charater_b->y) HintTool->x = (HintTool->x + 1) % size_x;
        if(FlashTool->x == charater_b->x && FlashTool->y == charater_b->y) FlashTool->x = (FlashTool->x + 1) % size_x;//防止道具和角色b重合
    }
}

void MainWindow::Set()                                      //用于设置一些用于显示的条等
{
    ui->Bar->setMaximum(MaxTime);
    ui->Bar->setMinimum(0);
    ui->Bar->setValue(MaxTime);                         //设置用于对A进行计时的进度条
    ui->Bar->setFormat("%v");
    ui->Bar->setStyleSheet("QProgressBar{background:white;} QProgressBar::chunk{background:blue}");
    ui->Bar1->setMaximum(MaxTime1);
    ui->Bar1->setMinimum(0);
    ui->Bar1->setValue(MaxTime1);                       //设置用于对B进行计时的进度条
    ui->Bar1->setFormat("%v");
    ui->Bar1->setStyleSheet("QProgressBar{background:white;} QProgressBar::chunk{background:red}");
    ui->bar->setMaximum(HintTime);
    ui->bar->setMinimum(0);
    ui->bar->setValue(HintTime);                        //设置用于在提示时进行计时的进度条
    ui->bar->setFormat("%v");
    ui->bar->setStyleSheet("QProgressBar{background:white;} QProgressBar::chunk{background:green}");
    ui->bar1->setMaximum(FlashTime);
    ui->bar1->setMinimum(0);
    ui->bar1->setValue(FlashTime);                      //设置用于在用鼠标控制时的进度条
    ui->bar1->setFormat("%v");
    ui->bar1->setStyleSheet("QProgressBar{background:white;} QProgressBar::chunk{background:green}");
    QString str0 = "A的得分：";
    ui->labela1->setText(str0);
    ui->labela2->setNum(AGrade);                        //设置用于显示A的得分的label
    QString str1 = "B的得分：";
    ui->labelb1->setText(str1);
    ui->labelb2->setNum(BGrade);                        //设置用于显示B的得分的label
    timer = new QTimer(this);
    HintTimer = new QTimer(this);
    FlashTimer = new QTimer(this);
    QPalette Pa;
    Pa.setColor(QPalette::WindowText,Qt::red);
    ui->label1->setPalette(Pa);
    QFont Ft;
    Ft.setPointSize(25);
    ui->label1->setFont(Ft);
    ui->label1->setAlignment(Qt::AlignCenter);
    ui->label1->setGeometry(0,100,3500,1000);           //设置开始界面的字体及字体颜色等特征
    connect(timer,SIGNAL(timeout()),this,SLOT(ATimerEvent()));
    connect(timer,SIGNAL(timeout()),this,SLOT(BTimerEvent()));
    connect(timer,SIGNAL(timeout()),this,SLOT(AGradeEvent()));
    connect(timer,SIGNAL(timeout()),this,SLOT(BGradeEvent()));
    connect(HintTimer,SIGNAL(timeout()),this,SLOT(HintEvent()));
    connect(FlashTimer,SIGNAL(timeout()),this,SLOT(FlashEvent()));//设置槽函数与连接函数
}

bool MainWindow::CheckGameOver()                            //检测游戏是否结束（僵局或胜利）
{
    if(MaxTime == 0 || MaxTime1 == 0){                      //时间到，游戏结束
        QString str1 = "游戏结束!";
        ui->label1->setText(str1);
        ui->label1->setAlignment(Qt::AlignCenter);
        ui->label1->setGeometry(0,0,1750,950);
        timer->stop();
        HintTimer->stop();
        FlashTimer->stop();
        return true;
    }
    if(CheckIsFrozen() && !CheckIsWin()){                   //形成僵局，且有箱子剩余，则游戏结束        
        QString str1 = "形成僵局，游戏结束！";
        ui->label1->setText(str1);
        HintTimer->stop();
        FlashTimer->stop();
        timer->stop();
        return true;
    }
    if(CheckIsWin()){                                       //没有箱子剩余，则在单人模式下胜利
        QString str2 = "游戏结束！";
        ui->label1->setText(str2);
        HintTimer->stop();
        FlashTimer->stop();
        timer->stop();
        return true;
    }
    return false;
}

void MainWindow::PauseButtonPressEvent()                    //与按下暂停有关的handler函数
{
    Paused = true;
    if(HintTime > 0 && HintTimer->isActive()) HintTimer->stop();
    if(FlashTime > 0 && FlashTimer->isActive()) FlashTimer->stop();
    timer->stop();
    if(Time % 2) Time++;
}

void MainWindow::PauseButtonRepressEvent()                  //与暂停之后再次按下暂停键有关的handler函数
{
    Paused = false;
    if(HintTool == nullptr && HintTime > 0) HintTimer->start();
    if(FlashTool == nullptr && FlashTime > 0) FlashTimer->start();
    timer->start();
    if(Time % 2 == 0) Time++;
}

void MainWindow::CheckIsPaused()                            //用于判断button的连接状态
{
    if(Time % 2){
        if(Time > 1) disconnect(ui->button,SIGNAL(pressed()),this,SLOT(PauseButtonRepressEvent()));
        connect(ui->button,SIGNAL(pressed()),this,SLOT(PauseButtonPressEvent()));
    }                                                       //注意要disconnect在重新connect
    if(Time % 2 == 0){
        disconnect(ui->button,SIGNAL(pressed()),this,SLOT(PauseButtonPressEvent()));
        connect(ui->button,SIGNAL(pressed()),this,SLOT(PauseButtonRepressEvent()));
    }
}

void MainWindow::CheckIsChosenA()                           //利用f1检测某个物体是否被角色a选中
{
    for(int i = 0;i <= num;++i){
        if(box[i] == nullptr) continue;
        if(charater_a->x == box[i]->x&&charater_a->y == box[i]->y) box[i]->f1 = true;
    }
    if(TimePlusTool != nullptr){
        if(charater_a->x == TimePlusTool->x&&charater_a->y == TimePlusTool->y)
            TimePlusTool->f1 = true;
    }
    if(ShuffleTool != nullptr){
        if(charater_a->x == ShuffleTool->x&&charater_a->y == ShuffleTool->y)
            ShuffleTool->f1 = true;
    }
    if(HintTool != nullptr){
        if(charater_a->x == HintTool->x&&charater_a->y == HintTool->y)
            HintTool->f1 = true;
    }
    if(FlashTool != nullptr){
        if(charater_a->x == FlashTool->x&&charater_a->y == FlashTool->y)
            FlashTool->f1 = true;
    }
}

void MainWindow::CheckIsChosenB()                           //检测f2某个物体在双人模式下是否被角色b选中
{
    for(int i = 0;i <= num;++i){
        if(box[i] == nullptr) continue;
        if(charater_b->x == box[i]->x&&charater_b->y == box[i]->y) box[i]->f2 = true;
    }
    if(TimePlusTool != nullptr){
        if(charater_b->x == TimePlusTool->x&&charater_b->y == TimePlusTool->y)
            TimePlusTool->f2 = true;
    }
    if(ShuffleTool != nullptr){
        if(charater_b->x == ShuffleTool->x&&charater_b->y == ShuffleTool->y)
            ShuffleTool->f2 = true;
    }
    if(HintTool != nullptr){
        if(charater_b->x == HintTool->x&&charater_b->y == HintTool->y)
            HintTool->f2 = true;
    }
    if(FlashTool != nullptr){
        if(charater_b->x == FlashTool->x&&charater_b->y == FlashTool->y)
            FlashTool->f2 = true;
    }
}

void MainWindow::mousePressEvent(QMouseEvent *event)        //与单人模式flash功能相关的handler函数
{                                                           //该函数会在鼠标点击时自动调用
    if(IsFlashing == true && FlashTime > 0 && FlashTimer->isActive()){
        Box *box1 = new Box(event->x() / 50,event->y() / 50);
        Box *box2 = new Box(charater_a->x,charater_a->y);
        if(Check(box1,box2)){
            charater_a = new Charater(event->x() / 50,event->y() / 50);
            CheckIsChosenA();
            while(!points.empty()) points.pop();
            update();
        }
    }
    else return ;
}

void MainWindow::OneCornerPush(Box *box1,Box *box2,Box *box3)//实现一拐点连线时的记录关键点的功能
{
    QPoint p1(box1->x * 50 + 25,box1->y * 50 + 25);
    QPoint p2(box2->x * 50 + 25,box2->y * 50 + 25);
    QPoint p3(box3->x * 50 + 25,box3->y * 50 + 25);
    while(!points.empty()){
        points.pop();
    }
    points.push(p1);
    points.push(p2);
    points.push(p3);
}

void MainWindow::on_actionOpen_triggered()                   //与打开已保存的文件相关的handler函数(自动生成了connect)
{                                                            //其读入信息顺序与save功能输出顺序相同
    QString FileName;
    FileName = QFileDialog::getOpenFileName(this,"QLink","./Qlink/QLink.txt","Text File(*.txt)");
    if(FileName == "") return ;
    else{
        QFile File(FileName);
        if(File.open(QIODevice::ReadOnly)){
            if(!File.isReadable()) QMessageBox::warning(this,"error","this file is not readable!");
            else{
                QTextStream In(&File);
                int x = 0,y = 0,type = 1,n = 0;
                int t1 = 0,t2 = 0,t3 = 0,t4 = 0;QString s1;
                int grade1 = 0,grade2 = 0;
                In>>x>>endl;
                if(x == 1) IsDouble = true;
                else IsDouble = false;
                In>>x>>endl;
                if(x == 1) IsHinted = true;
                else IsHinted = false;
                In>>x>>endl;
                if(x == 1) IsFlashing = true;
                else IsFlashing = false;
                In>>t3>>endl;
                if(!IsDouble) In>>t4>>endl;
                HintTime = t3;
                if(!IsDouble) FlashTime = t4;
                In>>x>>endl;
                if(x == 0 && HintTimer->isActive()){
                    ui->bar->setValue(HintTime);
                    HintTimer->stop();
                }
                if(!IsDouble){
                    In>>x>>endl;
                    if(x == 0 && FlashTimer->isActive()){
                        ui->bar1->setValue(FlashTime);
                        FlashTimer->stop();
                    }
                }
                In>>x>>endl>>y>>endl;
                charater_a = new Charater(x,y);
                if(IsDouble){
                    In>>x>>endl>>y>>endl;
                    charater_b = new Charater(x,y);
                }
                In>>s1>>endl;
                if(s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    TimePlusTool = nullptr;
                    TimePlusTool = new Tools(x,y);
                }
                In>>s1>>endl;
                if(s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    ShuffleTool = nullptr;
                    ShuffleTool = new Tools(x,y);
                }
                In>>s1>>endl;
                if(s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    HintTool = nullptr;
                    HintTool = new Tools(x,y);
                }
                In>>s1>>endl;
                if(!IsDouble && s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    FlashTool = nullptr;
                    FlashTool = new Tools(x,y);
                }
                In>>x>>endl;
                LeftNum = x;
                for(int i = 0;i < LeftNum;++i){
                    In>>n>>endl;
                    In>>x>>endl>>y>>endl>>type>>endl;
                    box[n] = nullptr;
                    box[n] = new Box(x,y,type);
                }
                In>>t1>>endl>>t2>>endl>>grade1>>endl>>grade2>>endl;
                MaxTime = t1;
                MaxTime1 = t2;
                AGrade = grade1;
                BGrade = grade2;
            }
            show();
            File.close();
        }
    }
}

void MainWindow::on_actionSave_triggered()                  //与保存文件数据有关的handler函数(自动生成了connect)
{
    QFile File("QLink.txt");//创建一个用于输出文件的文本文件
    if(File.open(QFile::WriteOnly)){
        QTextStream Out(&File);
        if(IsDouble) Out<<1<<endl;
        else Out<<0<<endl;                                  //读入游戏模式(单人/双人)
        if(IsHinted) Out<<1<<endl;
        else Out<<0<<endl;                                  //读入提示状态
        if(IsFlashing) Out<<1<<endl;
        else Out<<0<<endl;                                  //读入鼠标移动状态
        Out<<HintTime<<endl;
        if(!IsDouble) Out<<FlashTime<<endl;
        if(HintTimer->isActive()) Out<<1<<endl;
        else Out<<0<<endl;
        if(!IsDouble){
            if(FlashTimer->isActive()) Out<<1<<endl;
            else Out<<0<<endl;
        }
        Out<<charater_a->x<<endl<<charater_a->y<<endl;
        if(IsDouble) Out<<charater_b->x<<endl<<charater_b->y<<endl;//输出角色信息
        if(TimePlusTool != nullptr){
            Out<<"True"<<endl;
            Out<<TimePlusTool->x<<endl<<TimePlusTool->y<<endl;
            IsLeft[0] = true;
        }
        else Out<<"False"<<endl;
        if(ShuffleTool != nullptr){
            Out<<"True"<<endl;
            Out<<ShuffleTool->x<<endl<<ShuffleTool->y<<endl;
            IsLeft[1] = true;
        }
        else Out<<"False"<<endl;
        if(HintTool != nullptr){
            Out<<"True"<<endl;
            Out<<HintTool->x<<endl<<HintTool->y<<endl;
            IsLeft[2] = true;
        }
        else Out<<"False"<<endl;
        if(!IsDouble && FlashTool != nullptr){
            Out<<"True"<<endl;
            Out<<FlashTool->x<<endl<<FlashTool->y<<endl;
            IsLeft[3] = true;
        }                                                       //输出道具信息，并且保存道具是否存在的信息
        else Out<<"False"<<endl;
        for(int i = 1;i <= num;++i){
            if(box[i] != nullptr) LeftNum++;                    //输出剩余箱子数目
        }
        Out<<LeftNum<<endl;
        for(int i = 1;i <= num;++i){
            if(box[i] != nullptr){
                Out<<i<<endl;
                Out<<box[i]->x<<endl<<box[i]->y<<endl<<box[i]->type<<endl;
            }
        }                                                       //输出剩余箱子的信息
        Out<<MaxTime<<endl<<MaxTime1<<endl<<AGrade<<endl<<BGrade<<endl; //输出游戏中各个时间和分数信息
    }
}

void MainWindow::PaintTimePlusTool(QPainter &painter)       //与绘制加时道具相关的函数
{
    if(TimePlusTool != nullptr&&(TimePlusTool->f1||TimePlusTool->f2)){
        TimePlus();
    }                                               //加时道具被选中
    if(TimePlusTool != nullptr){
        static const QPoint Point1[3] =
        {
            QPoint(TimePlusTool->x * 50 + 10,TimePlusTool->y * 50 + 10),
            QPoint(TimePlusTool->x * 50 + 25,TimePlusTool->y * 50 + 35),
            QPoint(TimePlusTool->x * 50 + 40,TimePlusTool->y * 50 + 10)
        };
        QColor ToolColor1(100,0,0);
        painter.setPen(Qt::NoPen);
        painter.setBrush(ToolColor1);
        painter.drawConvexPolygon(Point1,3);
    }                                               //加时道具未被选中
}

void MainWindow::PaintShuffleTool(QPainter &painter)        //与绘制重排道具相关的函数
{
    if(ShuffleTool != nullptr && (ShuffleTool->f1||ShuffleTool->f2)){
        Shuffle();
        ShuffleTool = nullptr;
    }                                               //重排道具被选中
    if(ShuffleTool != nullptr){
        static const QPoint Point2[3] =
        {
            QPoint(ShuffleTool->x * 50 + 10,ShuffleTool->y * 50 + 30),
            QPoint(ShuffleTool->x * 50 + 25,ShuffleTool->y * 50 + 15),
            QPoint(ShuffleTool->x * 50 + 40,ShuffleTool->y * 50 + 30)
        };
        QColor ToolColor2(0,100,0);
        painter.setPen(Qt::NoPen);
        painter.setBrush(ToolColor2);
        painter.drawConvexPolygon(Point2,3);
    }                                               //重排道具未被选中
}

void MainWindow::PaintHintTool(QPainter &painter)       //与绘制提示道具相关的函数
{
    if(HintTool != nullptr && (HintTool->f1||HintTool->f2)){
        HintTimer->start(1000);
        IsHinted = true;
        HintTool = nullptr;
    }                                               //hint道具被选中则开始计时并消除道具
    if(HintTool != nullptr){
        static const QPoint Point3[3] =
        {
            QPoint(HintTool->x * 50 + 15,HintTool->y * 50 + 10),
            QPoint(HintTool->x * 50 + 15,HintTool->y * 50 + 40),
            QPoint(HintTool->x * 50 + 35,HintTool->y * 50 + 25)
        };
        QColor ToolColor3(0,0,100);
        painter.setPen(Qt::NoPen);
        painter.setBrush(ToolColor3);
        painter.drawConvexPolygon(Point3,3);
    }
}

void MainWindow::PaintFlashTool(QPainter &painter)      //与绘制鼠标移动道具相关的函数
{
    if(!IsDouble && FlashTool != nullptr && (FlashTool->f1||FlashTool->f2)){
        FlashTimer->start(1000);
        IsFlashing = true;
        FlashTool = nullptr;
    }                                               //flash道具被选中
    if(!IsDouble&&FlashTool != nullptr){
        static const QPoint Point4[3] =
        {
            QPoint(FlashTool->x * 50 + 15,FlashTool->y * 50 + 25),
            QPoint(FlashTool->x * 50 + 40,FlashTool->y * 50 + 10),
            QPoint(FlashTool->x * 50 + 40,FlashTool->y * 50 + 40)
        };
        QColor ToolColor4(100,100,0);
        painter.setPen(Qt::NoPen);
        painter.setBrush(ToolColor4);
        painter.drawConvexPolygon(Point4,3);
    }                                                 //flash道具未被选择则画出
}

void MainWindow::PaintBox(QPainter &painter, Box *box, int Num) //与绘制箱子有关的函数,box为具体的箱子指针，Num为该箱子对应的标号
{
    if(box->type == 1){
        QColor color(127,127,0);
        painter.setBrush(color);
    }
    if(box->type == 2){
        QColor color(127,0,127);
        painter.setBrush(color);
    }
    if(box->type == 3){
        QColor color(0,127,127);
        painter.setBrush(color);
    }
    if((IsHinted == true)&&(Num == HintPos[0]||Num == HintPos[1])&&(HintTime >0) &&(MaxTime > 0)&&(HintTimer->isActive())){
        QColor color(0,50,255);
        painter.setBrush(color);
    }                                          //通过type的数值来判断基本颜色（即未被选中时的颜色）
    if(box->f1){
        QColor color(255,0,0);
        painter.setBrush(color);
        AToBeChecked[j++] = Num;
        box->f1 = false;
    }                                       //利用bool变量判断是否被a选中，选中则令被选中的箱子变为红色
    if(IsDouble&&box->f2){
        QColor color(0,255,0);
        painter.setBrush(color);
        BToBeChecked[k++] = Num;
        box->f2 = false;                 //双人模式下，利用bool变量判断箱子是否被b角色选中
    }
    painter.drawRect(box->x * 50 + 10,box->y * 50 + 10,30,30);
}
