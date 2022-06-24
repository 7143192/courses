#include "mainWindow.h"
#include <QPainter>
#include <QKeyEvent>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    // set window title
    setWindowTitle(tr("Find Way To Exit!!!"));
    // @TODO write your codes here

    setFixedSize(600, 624);
    createActions();
    createMenu();
    initBattleField();
}

void MainWindow::load_data(){
    // @TODO write your codes here
    memset(battle_field.field,0,sizeof(battle_field.field));
    filename=QFileDialog::getOpenFileName(this,"open a file","","text files(*.txt)");
    if(!filename.isEmpty())ifLoadFile=true;
    char*  ch;
    int Num;
    int enemy1x,enemy1y,enemy2x,enemy2y;
    QByteArray ba = filename.toLatin1();
    ch=ba.data();
    ifstream in(ch,ios::in);
    in >> Num;
    for(int i=0;i<Num;i++)
    {
        in>>enemy1x
                >>enemy1y
                >>enemy2x
                >>enemy2y;
        for(int x=enemy1x;x<=enemy2x;x++)
            for(int y=99-enemy1y;y>=(99-enemy2y);y--)
                battle_field.field[x][y]=-1;
    }
    in.close();

    QWidget::update();
    for(int i=0;i<100;i++)
        for(int j=0;j<100;j++)
            battle_field.map[i][j]=battle_field.field[i][j];
}

void MainWindow::keyPressEvent(QKeyEvent *event){
    // @TODO write your codes here
    switch(event->key()){
    case Qt::Key_P:{
        findPath();
        QWidget::update();
    }
        break;
    }
}


void MainWindow::paintEvent(QPaintEvent *)
{
    // @TODO write your codes here

    QPainter paint(this);
    paint.translate(0,24);
    paint.setPen(QColor(200, 0, 0));
    QPen pen;
    pen.setColor(Qt::gray);
    QBrush brush;
    brush.setStyle(Qt::SolidPattern);
    for(int i=0;i<600;i+=block)
        for(int j=0;j<600;j+=block){
            if(battle_field.field[i/6][j/6]==0){
                brush.setColor(QColor(0, 255, 0));
                paint.setBrush(brush);
                paint.setPen(pen);
                paint.drawRect(i,j,block,block);}
            if(battle_field.field[i/6][j/6]==-1){
                brush.setColor(QColor(255, 0, 0));
                paint.setBrush(brush);
                paint.setPen(pen);
                paint.drawRect(i,j,block,block);}
            if(battle_field.field[i/6][j/6]==1){
                brush.setColor(QColor(0, 0, 255));
                paint.setBrush(brush);
                paint.setPen(pen);
                paint.drawRect(i,j,block,block);}
        }
}

void MainWindow::createMenu()
{
    QMenu *options = menuBar()->addMenu("options");
    options->addAction(loadAction);
}

void MainWindow::createActions()
{
    loadAction = new QAction("load file",this);
    connect(loadAction,&QAction::triggered,this,&MainWindow::loadFile);
    findAction = new QAction("find path",this);
    connect(findAction,&QAction::triggered,this,&MainWindow::findPath);
}

void MainWindow::initBattleField()
{
    memset(battle_field.field,0,sizeof(battle_field.field));
}

void MainWindow::loadFile()
{
    load_data();
}

void MainWindow::findPath()
{
    if(!battle_field.findPath()){
        QMessageBox box;
        box.setText("can not find path");
        box.exec();
    }
}
