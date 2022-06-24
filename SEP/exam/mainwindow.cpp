#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QDataStream>
#include <QTextStream>
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
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    // set window title
    setWindowTitle(tr("Find Way To Exit!!!"));
    // @TODO write your codes here
    resize(N*5,N*5);
    for(int i = 0;i < N;++i){
        for(int j = 0;j < N;++j) battle_field.field[i][j] = 0;
    }
    for(int i = 0;i < N;++i){
        for(int j = 0;j < N;++j) battle_field.foundpath[i][j] = 0;
    }
    for(int i = 0;i < N;++i){
        for(int j = 0;j < 2;++j) battle_field.enemypos[i][j] = 0;
    }
    f = false;
    for(int i = 0;i < 2;++i){
        for(int j = 0;j < 2;++j) pos1[i][j] = 0;
    }
    k = 0;
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::load_data(){
    // @TODO write your codes here
    battle_field.num = N1;
    for(int i = 0;i < N1 * 2;++i){
        battle_field.enemypos[i][0] = data[i][0];
        battle_field.enemypos[i][1] = data[i][1];
    }
    for(int i = 0;i < battle_field.num * 2;i += 2){
        int x1 = battle_field.enemypos[i][0];
        int y1 = battle_field.enemypos[i][1];
        int x2 = battle_field.enemypos[i + 1][0];
        int y2 = battle_field.enemypos[i + 1][1];
        for(int j = x1;j <= x2;++j){
            for(int k = y1;k <= y2;++k) battle_field.field[j][k] = 1;
        }
    }
}

void MainWindow::keyPressEvent(QKeyEvent *event){
    // @TODO write your codes here
    if(event->key() == Qt::Key_P){
        load_data();
        f = battle_field.findPath();
        QWidget::update();
        return ;
    }
}


void MainWindow::paintEvent(QPaintEvent *)
{
    // @TODO write your codes here
    QPainter painter(this);
    painter.setWindow(this->width(), this-> height(), this->width(), -this->height());
    painter.translate(this->width(),0);//设置原点在左下角
    enemy_color = QColor(255,0,0);
    safe_color = QColor(0,255,0);
    painter.setPen(safe_color);
    painter.setBrush(safe_color);
    painter.save();
    painter.drawRect(50,50,N*5,N*5);
    painter.restore();
    painter.setPen(enemy_color);
    painter.setBrush(enemy_color);
    painter.save();
    load_data();
    for(int i = 0;i < battle_field.num * 2;i += 2){
        int x1 = battle_field.enemypos[i][0];
        int y1 = battle_field.enemypos[i][1];
        int l1 = battle_field.enemypos[i+1][0] - battle_field.enemypos[i][0];
        int l2 = battle_field.enemypos[i+1][1] - battle_field.enemypos[i][1];
        painter.drawRect(50+x1*5,50+y1*5,l1*5,l2*5);
    }
    painter.restore();
    path_color = Qt::black;
    if(f){
        painter.setPen(path_color);

        painter.save();
        while(!battle_field.s.empty()){
            if(k == 2){
                painter.drawLine(50+pos1[1][0]*5,50+pos1[1][1]*5,50+pos1[0][0]*5,50+pos1[0][1]*5);
                cout<<pos1[1][0]<<" "<<pos1[1][1]<<endl;
                cout<<pos1[0][0]<<" "<<pos1[0][1]<<endl;
                k = 0;
            }
            pos1[k][0] = battle_field.s.top().x;
            pos1[k][1] = battle_field.s.top().y;
            k++;
            battle_field.s.pop();
        }
        painter.restore();
    }    
}

void MainWindow::on_actionOpen_triggered()
{
    QString FileName;
    FileName = QFileDialog::getOpenFileName(this,"exam","./exam/testcase1.txt","Text File(*.txt)");
    QFile File(FileName);
    File.open(QIODevice::ReadOnly);
    QTextStream In(&File);
    int n = 0;
    int x = 0;
    int y = 0;
    In>>n>>endl;
    N1 = n;
    int s = N1 * 2;
    for(int i = 0;i < s;i += 2){
        In>>x>>y;
        /*battle_field.enemypos[i] = new int[2];*/
        data[i][0] = x;
        data[i][1] = y;
        In>>x>>y;
        /*battle_field.enemypos[i+1] = new int[2];*/
        data[i+1][0] = x;
        data[i+1][1] = y;
    }
    update();
}
