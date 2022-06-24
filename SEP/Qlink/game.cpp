#include "game.h"
#include "ui_game.h"

Game::Game(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Game)
{
    ui->setupUi(this);
    w = new MainWindow(parent);
    ui->Label->setGeometry(200,200,700,300);
    QPalette Pa;
    Pa.setColor(QPalette::WindowText,Qt::red);
    ui->Label->setPalette(Pa);
    QFont Ft;
    Ft.setPointSize(25);
    ui->Label->setFont(Ft);
    ui->Label->setText("QT小游戏--连连看");               //设置文本框的位置及文字的颜色和大小
    ui->ButtonA->setGeometry(700,600,200,50);
    ui->ButtonB->setGeometry(700,700,200,50);           //设置开关的位置和大小
    connect(ui->ButtonA,SIGNAL(pressed()),this,SLOT(ButtonAPressEvent()));
    connect(ui->ButtonB,SIGNAL(pressed()),this,SLOT(ButtonBPressEvent()));//设置connect函数
    setWindowTitle(tr("开始界面"));                      // 设置窗口的标题
    resize(size_x * 50,size_y * 50);                    // 设置 widget 大小
}

Game::~Game()
{
    delete ui;
    delete w;
}

void Game::ButtonAPressEvent()                      //按下开关A时，进入单人模式
{
    hide();
    w->IsDouble = false;
    w->timer->start(1000);
    w->show();
}

void Game::ButtonBPressEvent()                      //按下开关B时，进入双人模式
{
    hide();
    w->IsDouble = true;
    w->timer->start(1000);
    w->show();
}

void Game::ButtonCPressEvent()                      //与mainwindow中实现的open功能基本相同
{
    QString FileName;
    FileName = QFileDialog::getOpenFileName(this,"QLink","./Qlink/QLink.txt","Text File(*.txt)");
    if(FileName == "") return ;
    else{
        QFile File(FileName);
        if(File.open(QIODevice::ReadOnly)){
            if(!File.isReadable()) return ;
            else{
                QTextStream In(&File);
                for(int i = 0;i <= w->num;++i) w->box[i] = nullptr;
                w->TimePlusTool = nullptr;
                w->ShuffleTool = nullptr;
                w->HintTool = nullptr;
                w->FlashTool = nullptr;
                int x = 0,y = 0,type = 1,n = 0;
                int t1 = 0,t2 = 0,t3 = 0,t4 = 0;QString s1;
                int grade1 = 0,grade2 = 0;
                In>>x>>endl;
                if(x == 1) w->IsDouble = true;
                else w->IsDouble = false;
                In>>x>>endl>>y>>endl;
                w->charater_a = new Charater(x,y);
                if(w->IsDouble){
                    In>>x>>endl>>y>>endl;
                    w->charater_b = new Charater(x,y);
                }
                In>>s1>>endl;
                if(s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    w->TimePlusTool = nullptr;
                    w->TimePlusTool = new Tools(x,y);
                }
                In>>s1>>endl;
                if(s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    w->ShuffleTool = nullptr;
                    w->ShuffleTool = new Tools(x,y);
                }
                In>>s1>>endl;
                if(s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    w->HintTool = nullptr;
                    w->HintTool = new Tools(x,y);
                }
                In>>s1>>endl;
                qDebug()<<s1<<endl;
                if(!w->IsDouble && s1 == "True"){
                    In>>x>>endl>>y>>endl;
                    w->FlashTool = nullptr;
                    w->FlashTool = new Tools(x,y);
                }
                In>>x>>endl;
                w->LeftNum = x;
                for(int i = 0;i < w->LeftNum;++i){
                    In>>n>>endl;
                    In>>x>>endl>>y>>endl>>type>>endl;
                    w->box[n] = nullptr;
                    w->box[n] = new Box(x,y,type);
                }
                In>>t1>>endl>>t2>>endl>>t3>>endl>>t4>>endl>>grade1>>endl>>grade2>>endl;
                w->MaxTime = t1;
                w->MaxTime1 = t2;
                w->HintTime = t3;
                w->FlashTime = t4;
                w->AGrade = grade1;
                w->BGrade = grade2;
            }
            hide();
            w->timer->start(1000);
            w->show();
            File.close();
        }
    }
}
