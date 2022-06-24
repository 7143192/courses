#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "program.h"
#include "statement.h"
#include "parser.h"
#include "tokenizer.h"
#include <cstdlib>
#include <iostream>
#include <QPushButton>
#include <QMessageBox>
#include <QFileDialog>
#include <QFile>
#include <QIODevice>
#include <queue>
#include <stack>
#include <cmath>
bool Input = false;//用于判断是否处于输入状态
bool End = false;//用于判断一个输入语句是自定义cmd还是程序语言
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    pro = new Program();
    parser = new Parser();
    tokens = new Tokens();
    InputPos = new Statement();
    RootNode = "";
    LevelNum = new int[10000];
    for(int i = 0;i < 1000;++i) LevelNum[i] = 0;
    TreeNode = new QString[10000];
    for(int i = 0;i < 10000;++i) TreeNode[i] = "";
    for(int i = 0;i < 9;++i) times[i] = 0;
    ui->treeDisplay->clear();
    ui->textBrowser->clear();
    ui->CodeDisplay->clear();
    PrintIf = true;
    ErrorFound = false;
    Running = false;
}

MainWindow::~MainWindow()                        //在析构函数中一定要记得删除动态数组的分配空间
{
    delete pro;
    delete InputPos;
    delete []TreeNode;
    delete parser;
    delete tokens;
    delete []LevelNum;
    delete ui;
}

bool MainWindow::CheckEnd(Statement* )
{
    /*QList<QString> list1 = curline->list;
    while(curline != nullptr){
        QList<QString> list1 = curline->list;
        if(curline->type == 7) return true;//说明存在end行
        curline = curline->next;
    }*/
    return true;                           //说明不存在END行，即函数没有出口
}

void MainWindow::on_cmdLineEdit_editingFinished()//与编辑代码有关的函数
{
    if(ui->cmdLineEdit->hasFocus() && !Input){  //处于非输入状态
        QString cmd = ui->cmdLineEdit->text();
        ui->cmdLineEdit->setText("");           //读入输入的内容
        Token.clear();
        OtherOptions(cmd);                      //判断是不是除了标准命令之外的其他command
        if(End){
            End = false;
            return ;                            //如果是的话执行完后直接停止(因为不是代码的一部分)
        }
        QList<QString> list = cmd.split(" ", QString::SkipEmptyParts);
        if(list[0].toInt() < 0 || list[0].toInt() > 1000000){
            ui->textBrowser->append("Wrong format of Input of the code line!");
            return ;
        }
        pro->InsertLine(list[0].toInt(),cmd);
        ui->CodeDisplay->clear();
        pro->head = pro->SortLines(pro->head);//插入新的行并排序
        Statement *p = pro->head;
        p = p -> next;
        while(p != nullptr){
            QList<QString> list = p->list;
            int l = list.length();
            for(int i = 0;l != 0 && i < l;++i){
                ui->CodeDisplay->insertPlainText(list[i]);
                ui->CodeDisplay->insertPlainText(" ");
                if(i == l - 1){
                    QString temp="";
                    ui->CodeDisplay->insertPlainText(temp+='\n');
                }
            }                                   //显示新的行的内容
            p = p->next;
        }
        return ;
    }
    if(ui->cmdLineEdit->hasFocus() && Input){   //处于输入状态
        QString cmd = ui->cmdLineEdit->text();
        string s = cmd.toStdString();
        QList<QString> list1 = tokens->ConvertToTokens(cmd);
        if(list1.length() > 1){                 //只允许输入一个数字
            QString error = "Wrong Input Of the Value of the Input Var!";
            ui->textBrowser->append(error);
            return ;
        }
        int l = s.length();
        string s1 = "";
        for(int i = 0;i < l;++i){
            if(s[i] != '?') s1 += s[i];         //读取输入的内容
        }
        cmd = QString::fromStdString(s1);
        int val = cmd.toInt();
        if(!context.isDefined(InputName.toStdString())){//对新读入的变量进行(重新)赋值
            context.PutValue(InputName.toStdString(),val);
        }
        else context.setValue(InputName.toStdString(),val);
        Input = false;
        ui->cmdLineEdit->clear();
        if(InputPos->next != nullptr) Run(InputPos->next);
        return ;
    }
}

void MainWindow::on_btnLoadCode_clicked() //与打开文件并读入程序有关的槽函数
{
    LOAD();
}

void MainWindow::on_btnClearCode_clicked()  //与清除程序栏有关的槽函数
{
    ui->CodeDisplay->clear();
    ui->treeDisplay->clear();
    ui->textBrowser->clear();               //清空三个框
    InputPos = nullptr;
    InputVal = 0;
    Input = false;                          //与INPUT有关的状态归零
    pro->ClearPro();
    pro = new Program();                    //pro置空并重新指向下一个新的程序
}

void MainWindow::on_btnRunCode_clicked()    //与运行程序相关的槽函数
{
    Statement* p = pro->head->next;
    if(p == nullptr){
        string error = "No program in the BASIC!";
        ui->textBrowser->append("0 " + QString::fromStdString(error));
        return ;
    }                                       //程序为空，直接结束
    ui->textBrowser->clear();
    ui->treeDisplay->clear();
    try {
        if(!CheckEnd(p)){
            string error = "No END is found in  the program!";
            ui->textBrowser->append(QString::fromStdString(error));
            return ;
        }
        p = pro->head->next;
        PrintAllTrees(p);                   //先将所有代码遍历一遍同时打印可能的错误
        context.Clear();
        p = pro->head->next;
        Run(pro->head->next);                             //正式运行并输出可能存在的结果
        context.Clear();
        return ;
    } catch (string error) {
        string s = "";
        s += error;
        QString s1 = QString::fromStdString(s);
        ui->textBrowser->append(s1);
    }                                       //出错就抓住
}

void MainWindow::Run(Statement *curline)
{
    if(ErrorFound){
        ErrorFound = false;
    }                                           //找到错误直接结束运行
    PrintIf = false;
    while(curline != nullptr){
        tokens = new Tokens();
        parser = new Parser();                  //此处要注意重新赋值，因为要清空上一条指令的遗留内容
        int linenum = curline->LineNum;
        if(linenum <= 0 || linenum > 1000000){   //行号超标
            string error = "LineNum out of range!";
            QList<QString> list1 = curline->list;
            curline = curline->next;
            if(times[0] == 0){
                ui->textBrowser->append(list1[0] + " " + QString::fromStdString(error));
                //ui->treeDisplay->append(list1[0] + " " + "Error");
            }
            continue;
        }
        if(curline->type == 8){                 //标准命令输入格式不对
            QString error = "Wrong format of Input of the code line!";
            if(times[curline->type] == 0){
                //ui->treeDisplay->append(curline->list[0] + " Error");
                ui->textBrowser->append(curline->list[0] + " " + error);
            }
            curline = curline->next;
            continue;
        }
        if(curline->type == 1){ //REM
            QList<QString>list1 = curline->context.split(" ", QString::SkipEmptyParts);
            curline = curline->next;            //REM相当于注释，直接忽略
            /*ui->treeDisplay->append(list1[0] + " " + "REM");*/
            int l = list1.length();
            QString s1 = "";
            for(int i  =2;i < l;++i){
                s1 += list1[i];
                s1 += " ";
            }
            /*ui->treeDisplay->append(s1);*/
            continue;
        }
        if(curline->type == 2){ //LET
            int val = 0;
            Expression* exp;
            QList<QString> list1 = curline->context.split(" ", QString::SkipEmptyParts);
            int l  = list1.length();
            if(l <= 2){
                string s = "Lack of a Expression!";
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    //ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }                                           //缺少表达式部分
            QString s1 = "";
            for(int i = 2;i < l;++i){                   //从2开始是为了去除LET和行号以得到具体的表达式
                s1 += list1[i];
            }
            string ss = list1[2].toStdString();
            if((ss[0] >= '1' && ss[0] <= '9') || ss == "IF" || ss == "THEN" || ss == "WHILE" || ss == "RUN"
                    ||ss == "INPUT" || ss == "GOTO" || ss == "REM" || ss == "QUIT" || ss == "PRINT"){
                string s1 = "Wrong input of the name of the var!";
                if(times[curline->type] == 0){
                    //ui->treeDisplay->append(list1[0] + " " + "Error");
                    ui->textBrowser->append(list1[0] + " " + QString::fromStdString(s1));
                }
                curline = curline->next;
                continue;
            }                                           //监测非法变量名
            try{
                QList<QString> tokenslist = tokens->ConvertToTokens(s1);
                exp = parser->BuildExpTree(tokenslist);//将提取出来的表达式转化为树
                parser->StackClear();
            }
            catch(string Error){                        //出现错误
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    //ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }
            try {
                    val = exp->eval(context);           //计算转化出来的表达式的结果

                    cout<<val<<endl;
            } catch (string Error) {
                cout<<list1[0].toInt()<<" "<<Error<<endl;

                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    //ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }
            /*if(times[curline->type] == 0){
                ui->treeDisplay->append(list1[0] + " " + "LET");//未出现错误则显示正确的语法树
                Expression *exp1 = exp;
                PrintTheTree(exp1);
            }*/
            curline = curline->next;
            continue;
        }
        if(curline->type == 3){ //PRINT
            int val = 0;
            Expression* exp;
            QList<QString> list1;
            list1 = curline->context.split(" ", QString::SkipEmptyParts);
            int l  = list1.length();
            if(l <= 2){
                string s = "Lack of a Expression!";
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    //ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }                                               //缺少表达式部分
            QString s1 = "";
            for(int i = 2;i < l;++i){                       //从2开始是为了去除PRINT和行号以得到具体的表达式
                s1 += list1[i];
            }
            try{
                QList<QString> tokenslist = tokens->ConvertToTokens(s1);
                exp = parser->BuildExpTree(tokenslist);
                parser->StackClear();
            }
            catch(string Error){                            //出现生成树时的错误
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    //ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }
            try {                                           //出现计算值时的错误
                val = exp->eval(context);
            } catch (string Error) {
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    //ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }
            /*if(times[curline->type] == 0){
                ui->treeDisplay->append(list1[0] + " " + "PRINT");//未出现错误则将正确表达式树显示出来
                Expression *exp1 = exp;
                PrintTheTree(exp1);
            }*/
            QString s = QString::number(val,10);
            ui->textBrowser->append(s);                     //将PRINT运行后的结果打印在结果区
            curline = curline->next;
            continue;
        }
        if(curline->type == 4){ //INPUT
            QList<QString> list = curline->list;            
            int l  = list.length();
            if(l <= 2){
                string s = "Lack of a Expression!";
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + s1);
                    //ui->treeDisplay->append(list[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }                                               //缺少表达式部分
            QList<QString> ll = tokens->ConvertToTokens(list[2]);
            if(ll.length() > 1){                            //INPUT后输入的内容过长
                QString error = "Wrong input of the length of the var!";
                ui->textBrowser->append(list[0] + " " + error);
                curline = curline->next;
                continue;
            }
            if(l > 3){
                QString error = "Wrong input of the length of the var!";
                ui->textBrowser->append(list[0] + " " + error);
                curline = curline->next;
                continue;
            }
            string s = list[2].toStdString();
            if((s[0] >= '1' && s[0] <= '9') || s == "IF" || s == "THEN" || s == "WHILE" || s == "RUN"
                    ||s == "INPUT" || s == "GOTO" || s == "REM" || s == "QUIT" || s == "PRINT"){
                string s1 = "Wrong input of the name of the var!";
                if(times[curline->type] == 0){
                    //ui->treeDisplay->append(list[0] + " " + "Error");
                    ui->textBrowser->append(list[0] + " " + QString::fromStdString(s1));
                }
                curline = curline->next;
                continue;
            }                                               //监测非法变量名
            Input = true;
            InputName = list[2];
            InputPos = curline;
            /*if(times[curline->type] == 0){
                ui->treeDisplay->append(InputPos->list[0] + " " + "INPUT");
                ui->treeDisplay->append("   " + InputName);
            }*/
            ui->cmdLineEdit->setText("?");
            return ;
        }
        if(curline->type == 5){ //GOTO
            QList<QString> list = curline->list;
            bool ok;
            if(list.length() < 3){
                QString s = "Not Input A Line num!";         //未输入行号
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + s);
                    //ui->treeDisplay->append(list[0] + " " + "Error");
                }
                curline = curline->next;
                continue;
            }
            QList<QString> ll = tokens->ConvertToTokens(list[2]);//以下两种情况是GOTO后输入了内容但是过长
            if(ll.length() > 1){
                QString error = "Wrong Input of the length of GOTO dest!";
                ui->textBrowser->append(list[0] + " " + error);
                curline = curline->next;
                continue;
            }
            if(list.length() > 3){
                QString error = "Wrong Input of the length of GOTO dest!";
                ui->textBrowser->append(list[0] + " " + error);
                curline = curline->next;
                continue;
            }
            int dest = list[2].toInt(&ok);
            if(ok){
                if(dest < 0){                               //要跳到的行号<0
                    QString s1 = "Wrong LineNum!";
                    if(times[curline->type] == 0){
                        ui->textBrowser->append(list[0] + " " + s1);
                        //ui->treeDisplay->append(list[0] + " " + "Error");
                    }
                    curline = curline->next;
                    continue;
                }
                Statement *p = pro->head;
                p = p -> next;
                while(p != nullptr){                        //尝试找到要跳转的目标行
                    QList<QString> list = p->list;
                    int n = list[0].toInt();
                    if(n == dest) break;
                    p = p->next;
                }
                if(p == nullptr){                           //没找到目标行
                    QString s1 = "Not find the targeted line!";
                    if(times[curline->type] == 0){
                        ui->textBrowser->append(list[0] + " " + s1);
                        //ui->treeDisplay->append(list[0] + " " + "Error");
                    }
                    curline = curline->next;
                    continue;
                }
                /*if(times[curline->type] == 0){
                    ui->treeDisplay->append(curline->list[0] + " " + "GOTO");
                    ui->treeDisplay->append("  " + QString::number(dest,10));
                }*/
                curline = p;
                continue;
            }
        }
        if(curline->type == 6){ //IF
            PrintIf = false;
            QString s = "";
            int val = 0;//存储then后面的数值
            QList<QString>list = curline->context.split(" ", QString::SkipEmptyParts);
            QList<QString> tokenslist;
            int i = 2;
            while(list[i] != "THEN"){
                s += list[i];
                i++;
            }                                               //此处是在读取if和then之间的判断式
            if(s == ""){                                    //if和then之间没有判断式
                QString error = "Lack of the expression!";
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + error);
                    //ui->treeDisplay->append(list[0] + " Error");
                }
                curline = curline->next;
                continue;
            }
            try {
                tokenslist = tokens->ConvertToTokens(s);
            } catch (string Error) {
                curline = curline->next;
                continue;
            }
            QList<QString> ll = tokenslist;
            bool f = false;            
            i++;
            if(i == list.length()){                         //then后面没有输入dest行号
                QString error = "Lack of the dest num!";
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + error);
                    //ui->treeDisplay->append(list[0] + " Error");
                }
                curline = curline->next;
                continue;
            }
            if(!parser->IsConstant(list[i])){               //输入的dest部分形式不对
                string error = "Wrong Input of the THEN Statement!";
                if(times[curline->type] == 0){
                    //ui->treeDisplay->append(list[0] + " " + "Error");
                    ui->textBrowser->append(list[0] + " " + QString::fromStdString(error));
                }
                curline = curline->next;
                continue;
            }
            val = list[i].toInt();
            /*if(times[curline->type] == 0) ui->treeDisplay->append(list[0] + " " + "IF" + " " + "THEN");
             */
            try {
                f = CheckIf(ll);//判断 判断式是否为真
            } catch (string Error) {
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 =QString::fromStdString(s);
                //ui->treeDisplay->append(list[0] + " Error");
                ui->textBrowser->append(list[0] + " " + s1);
                curline = curline->next;
                continue;
            }
            if(f){                
                Statement *p = pro->head;
                p = p -> next;
                while(p != nullptr){                        //尝试找到要跳转的目标行
                    QList<QString> list = p->list;
                    int n = list[0].toInt();
                    if(n == val) break;
                    p = p->next;
                }
                if(p == nullptr){                           //没找到目标行
                    QString s1 = "Not find the targeted line!";
                    if(times[curline->type] == 0){
                        ui->textBrowser->append(list[0] + " " + s1);
                        /*ui->treeDisplay->append(list[0] + " " + "Error");*/
                    }
                    curline = curline->next;
                    continue;
                }
                curline = p;
                f = false;
            }
            else{                       //若不为真，则到if的下一行
                curline = curline->next;
            }

            /*if(times[curline->type] == 0){
                ui->treeDisplay->append("  " + QString::number(val,10));
            }*/
            continue;
        }
        if(curline->type == 7){ //END,程序终止
            /*ui->treeDisplay->append(curline->list[0] + " " + "END");*/
            return ;
        }
        curline = curline->next;
    }
}

void MainWindow::LOAD()                     //与加载文件有关的函数
{
    QString FileName;
    FileName = QFileDialog::getOpenFileName(this,"QBasic","./QBasic/code.txt","Text File(*.txt)");
    QFile file(FileName);
    file.open(QIODevice::ReadOnly);
    while(!file.atEnd()){
        QString s = file.readLine();
        s.remove('\r');
        s.remove('\n');                     //去除读入的换行符
        QList<QString> list = s.split(" ", QString::SkipEmptyParts);
        pro->InsertLine(list[0].toInt(),s);//此处改为先将文件边读入边插入是考虑到文件原始顺序不对的情况
    }
    pro->head = pro->SortLines(pro->head);
    Statement *p = pro->head;
    p = p->next;
    while(p != nullptr){
        QList<QString> list = p->list;
        int l = list.length();
        for(int i = 0;i < l;++i){
            ui->CodeDisplay->insertPlainText(list[i]);
            ui->CodeDisplay->insertPlainText(" ");
            if(i == l - 1){
                QString temp="";
                ui->CodeDisplay->append(temp+='\n');
            }
        }                               //显示读入的新的行的内容
        p = p->next;
    }
    delete p;
    file.close();
}

void MainWindow::OtherOptions(QString str)
{
    QList<QString> list = str.split(" ", QString::SkipEmptyParts);
    Token = tokens->ConvertToTokens(str);
    bool OK;
    list[0].toInt(&OK);
    if(str == "RUN"){      //RUN，应该与按下RUN按键效果相同
        Statement* p = pro->head->next;
        if(p == nullptr){
            string error = "No program in the BASIC!";
            ui->textBrowser->append("0 " + QString::fromStdString(error));
            return ;
        }           //程序为空，直接结束
        ui->textBrowser->clear();
        ui->treeDisplay->clear();
        try {
            PrintAllTrees(p);
            PrintIf = false;
            Run(p);
        } catch (string error) {
            string s = "";
            s += error;
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
        }
        End = true;
        return ;
    }
    if(str == "LOAD"){//LOAD,效果应该与按下LOAD按键效果相同
        LOAD();
        End = true;
        return ;
    }
    if(str == "LIST"){//LIST，此版本此功能什么都不做
        End = true;
        return ;
    }
    if(str == "CLEAR"){
        ui->CodeDisplay->clear();
        ui->textBrowser->clear();
        ui->cmdLineEdit->clear();
        ui->treeDisplay->clear();//清空所有界面
        pro->ClearPro();
        delete pro;
        pro = new Program();    //不要忘记重新赋值PROGRAM的指针以便用于保存下一个运行程序
        End = true;
        return ;
    }
    if(str == "QUIT"){//退出
        this->close();
        End = true;
        return ;
    }
    if(str == "HELP"){//帮助
        ui->textBrowser->clear();
        ui->textBrowser->append("各个命令具体使用方法详见PDF文档~");
        ui->textBrowser->append("左上角输出框是用于以只读的方式显示你已经读入/输入的程序");
        ui->textBrowser->append("右上角输出框是用于以只读的方式显示已经运行的程序的正确结果");
        ui->textBrowser->append("左下角的输出框是用于以只读的方式输出正在/刚结束的程序的语法树以及报错信息");
        ui->textBrowser->append("最下方的输入框是用于输入你的自定义命令并插入"
                                "左上角方框中，具体命令输入格式见PDF~");
        End = true;
        return ;
    }
    if(OK){            //删除某一行
        if(list.length() > 1 && (list[1] == "REM" || list[1] == "LET" || list[1] == "PRINT" ||
                list[1] == "INPUT" || list[1] == "IF" || list[1] == "GOTO" || list[1] == "END")){
            End = false;
            return ;
        }                           //判断是否是程序中的标准命令
        if(list.length() > 1){
            QString error = "Wrong INput of the format of the command!";
            ui->textBrowser->append(error);
            End = true;
            return ;
        }
        if(pro->head->next == nullptr){ //此时没有程序
            QString s = "No Pro is in the BASIC!";
            ui->textBrowser->append(s);
            End = true;
            return ;
        }
        bool ok;
        int linenum = Token[0].toInt(&ok);
        if(!ok){                        //没有输入正确的参数
            QString s = "Wrong format of the input!";
            ui->textBrowser->append(s);
            End = true;
            return ;
        }
        try {
            pro->DeleteLine(linenum);   //删除同时检查是否存在这一行
        } catch (string error) {
            string s = "";
            s += error;
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
        }
        ui->CodeDisplay->clear();           //删除成功之后重新显示删除后的程序
        Statement *p = pro->head;
        p = p->next;
        while(p != nullptr){
            QList<QString> list = p->list;
            int l = list.length();
            for(int i = 0;i < l;++i){
                ui->CodeDisplay->insertPlainText(list[i]);
                ui->CodeDisplay->insertPlainText(" ");
                if(i == l - 1){
                    QString temp="";
                    ui->CodeDisplay->append(temp+='\n');
                }
            }
            p = p->next;
        }
        End = true;
        return ;
    }
    if(list[0] == "LET"){
        int val = 0;
        Expression* exp;
        QList<QString> list1 = list;
        int l  = list1.length();
        if(l < 2){
            string s = "Lack of a Expression!";
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
            End = true;
            return ;
        }                                           //缺少表达式部分
        QString s1 = "";
        for(int i = 1;i < l;++i){                   //从2开始是为了去除LET和行号以得到具体的表达式
            s1 += list1[i];
        }
        string ss = list1[1].toStdString();
        if((ss[0] >= '1' && ss[0] <= '9') || ss == "IF" || ss == "THEN" || ss == "WHILE" || ss == "RUN"
                ||ss == "INPUT" || ss == "GOTO" || ss == "REM" || ss == "QUIT" || ss == "PRINT"){
            string s1 = "Wrong input of the name of the var!";
            ui->textBrowser->append(QString::fromStdString(s1));
            End = true;
            return ;
        }                                           //监测非法变量名
        try{
            QList<QString> tokenslist = tokens->ConvertToTokens(s1);
            exp = parser->BuildExpTree(tokenslist);//将提取出来的表达式转化为树
            int type = exp->GetType();
            if(type == 3){
                val = exp->eval(context);           //计算转化出来的表达式的结果
            }
        }
        catch(string Error){                        //出现错误
            string s = "";
            s += Error;
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
            End = true;
            return ;
        }
        End = true;
        return ;
    }
    if(list[0] == "PRINT"){
        int val = 0;
        Expression* exp;
        QList<QString> list1;
        list1 = list;
        int l  = list1.length();
        if(l < 2){
            string s = "Lack of a Expression!";
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
            End = true;
            return ;
        }                                               //缺少表达式部分
        QString s1 = "";
        for(int i = 1;i < l;++i){                       //从2开始是为了去除PRINT和行号以得到具体的表达式
            s1 += list1[i];
        }
        try{
            QList<QString> tokenslist = tokens->ConvertToTokens(s1);
            exp = parser->BuildExpTree(tokenslist);
            parser->StackClear();
        }
        catch(string Error){                            //出现生成树时的错误
            string s = "";
            s += Error;
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
            End = true;
            return ;
        }
        try {                                           //出现计算值时的错误
            val = exp->eval(context);
        } catch (string Error) {
            string s = "";
            s += Error;
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
            End = true;
            return ;
        }
        QString s = QString::number(val,10);
        ui->textBrowser->append(s);                     //将PRINT运行后的结果打印在结果区
        End = true;
        return ;
    }
    if(list[0] == "INPUT"){
        Input = true;
        int l  = list.length();
        if(l < 2){
            string s = "Lack of a Expression!";
            QString s1 = QString::fromStdString(s);
            ui->textBrowser->append(s1);
            End = true;
            return ;
        }                                               //缺少表达式部分
        QList<QString> ll = tokens->ConvertToTokens(list[1]);
        if(ll.length() > 1){                            //INPUT后面输入的内容过长
            QString error = "Wrong input of the length of the var!";
            ui->textBrowser->append(error);
            End = true;
            return ;
        }
        if(l > 2){
            QString error = "Wrong input of the length of the var!";
            ui->textBrowser->append(error);
            End = true;
            return ;
        }
        string s = list[1].toStdString();
        if((s[0] >= '1' && s[0] <= '9') || s == "IF" || s == "THEN" || s == "WHILE" || s == "RUN"
                ||s == "INPUT" || s == "GOTO" || s == "REM" || s == "QUIT" || s == "PRINT"){
            string s1 = "Wrong input of the name of the var!";
            ui->textBrowser->append(QString::fromStdString(s1));
            End = true;
            return ;
        }                                               //监测非法变量名
        InputName = list[1];
        ui->cmdLineEdit->setText("?");
        End = true;
        return ;
    }
    if(!OK && str != "RUN" && str != "LOAD" && str != "LIST" && str != "CLEAR" && str != "HELP" && str !=
            "QUIT" &&list[0] != "LET" && list[0] != "PRINT"
            && list[0] != "INPUT"){                             //不带行号的情况下指令名称不存在
        QString s = "Wrong INput of the format of the command!";
        ui->textBrowser->append(s);
        End = true;
        return ;
    }
}

void MainWindow::PrintTheTree(Expression *root)//打印整棵树并显示在界面上
{
    CountLevelNum(root);        //先保存每一行的元素个数
    queue<Expression *> que;
    Expression *tmp;
    que.push(root);
    while(!que.empty()){
        tmp = que.front();
        que.pop();
        int type = tmp->GetType();
        if(type == 1){
            QString ss = QString::number(tmp->getConstantValue(),10);//常量直接将对应的数值放入数组
            TreeNode[k++] = ss;
        }
        if(type == 2){
            QString ss = QString::fromStdString(tmp->getIdentifierName());//变量直接将表达式名放入数组
            TreeNode[k++] = ss;
        }
        if(type == 3){
            QString ss = QString::fromStdString(tmp->getOperator());//组合式直接先将运算符放入数组
            TreeNode[k++] = ss;
            if(tmp->getLHS() != nullptr) que.push(tmp->getLHS());//入队左子树
            if(tmp->getRHS() != nullptr) que.push(tmp->getRHS());//入队右子树
        }
    }
    int i = 0;
    int j = 0;
    int m = 0;
    for(i = 0;i < p;++i){
        int num = LevelNum[i];
        QString space = "";
        for(int q = 0;q < time;++q) space += "    ";//生成阶梯形空格
        time++;
        for(m = j;m < j + num;++m){
            ui->treeDisplay->append(space + TreeNode[m]);//按照顺序和每行的元素数目进行输出
        }
        j += num;
    }
    p = 0;
    time = 1;
    k = 0;
    NumofLine = 0;                              //还原为初始化状态，以便下次使用
}

void MainWindow::CountLevelNum(Expression *root)//数每一行的元素个数
{
    queue<Expression *> que;
    Expression *last,*nlast;
    last = root;
    nlast = root;
    que.push(last);
    int num = 0;
    while(!que.empty()){
        Expression *tmp = que.front();
        que.pop();
        num++;
        int type = tmp->GetType();
        if(type == 3){      //只有是组合式的情况才考虑左右节点的问题
            tmp = (CompoundExp *)tmp;
            if (tmp->getLHS() != nullptr) {
                que.push(tmp->getLHS());
                nlast = tmp->getLHS();      //nlast位置始终保持不变并且始终指向最后
            }
            if (tmp->getRHS() != nullptr) {
                que.push(tmp->getRHS());
                nlast = tmp->getRHS();
            }
        }
        if(tmp == last){                //判断是否已经到某一行的最后
            LevelNum[p++] = num;
            num = 0;
            NumofLine++;
            last = nlast;
        }
    }
}

bool MainWindow::IsIfOperators(QString s)//判断是否是if中的运算符
{
    if(s == "=" || s == "<" || s == ">") return true;
    return false;
}

bool MainWindow::CheckIf(QList<QString> tokenslist)//判断if语句的正误
{
    int l = tokenslist.length();
    int i = 0;
    QString exp1 = "";                              //存第一个表达式
    QString exp2 = "";                              //存可能存在的第二个表达式
    QString ifop = "";                              //存可能存在的if判断式中的运算符
    int val1 = 0;                                   //存表达式1的数值
    int val2 = 0;                                   //存可能存在的表达式2的数值
    while(i < l && !IsIfOperators(tokenslist[i])){  //提取第一个表达式
        exp1 += tokenslist[i];
        i++;
    }
    if(i != l){
        ifop = tokenslist[i];
        if(parser->IsOperator(tokenslist[i + 1]) ||(ifop != ">" && ifop != "<" && ifop != "=")){
            string s = "Wrong format of the IF op!";
            throw(s);
        }                                           //符号输入错误
        i++;
    }
    while(i < l){                                   //提取第二个表达式
        exp2 += tokenslist[i];
        i++;
    }
    if(ifop != "" && (exp1 == "" || exp2 == "")){   //缺少一个运算式
        string error = "Lack of exp(s)!";
        throw(error);
    }
    Expression* Exp1 = nullptr;
    try {
        QList<QString> list1 = tokens->ConvertToTokens(exp1);
        Expression* p1 = parser->BuildExpTree(list1);
        Exp1 = p1;
        val1 = p1->eval(context);                       //解析左表达式
    } catch (string Error) {
        string s = Error;
        throw(s);
    }
    if(PrintIf) PrintTheTree(Exp1);
    if(ifop != "" && PrintIf) ui->treeDisplay->append("  " + ifop);
    Expression *Exp2 = nullptr;
    if(exp2 != ""){                                 //有表达式2时在操作
        try {
            QList<QString> list2 = tokens->ConvertToTokens(exp2);
            Expression* p2 = parser->BuildExpTree(list2);
            Exp2 = p2;
            if(PrintIf) PrintTheTree(Exp2);
            val2 = p2->eval(context);                   //解析右表达式
        } catch (string Error) {
            string s = Error;
            throw(s);
        }
    }
    if(ifop != ""){                                 //有运算符时根据运算符判断结果
        if(ifop == "="){
            if(val1 == val2) return true;
            else return false;
        }
        else{
            if(ifop == "<"){
                if(val1 < val2) return true;
                else return false;
            }
            else{
                if(ifop == ">"){
                    if(val1 > val2) return true;
                    else return false;
                }
            }
        }
    }
    return false;
}

void MainWindow::PrintAllTrees(Statement *curline)
{
    ui->textBrowser->clear();
    while(curline != nullptr){
        tokens = new Tokens();
        parser = new Parser();                  //此处要注意重新赋值，因为要清空上一条指令的遗留内容
        int linenum = curline->LineNum;
        if(linenum <= 0 || linenum >= 1000000){   //行号超标
            string error = "LineNum out of range!";
            QList<QString> list1 = curline->list;
            curline = curline->next;
            if(times[0] == 0){
                ui->textBrowser->append(list1[0] + " " + QString::fromStdString(error));
                ui->treeDisplay->append(list1[0] + " " + "Error");
            }
            ErrorFound = true;
            continue;
        }
        if(curline->type == 8){                 //标准命令输入格式不对
            QString error = "Wrong format of Input of the code line!";
            if(times[curline->type] == 0){
                ui->treeDisplay->append(curline->list[0] + " Error");
                ui->textBrowser->append(curline->list[0] + " " + error);
                ErrorFound = true;
            }
            curline = curline->next;
            continue;
        }
        if(curline->type == 1){ //REM
            QList<QString>list1 = curline->context.split(" ", QString::SkipEmptyParts);
            curline = curline->next;            //REM相当于注释，直接忽略
            ui->treeDisplay->append(list1[0] + " " + "REM");
            int l = list1.length();
            QString s1 = "";
            for(int i  =2;i < l;++i){
                s1 += list1[i];
                s1 += " ";
            }
            ui->treeDisplay->append(s1);
            continue;
        }
        if(curline->type == 2){ //LET
            int val = 0;
            Expression* exp;
            QList<QString> list1 = curline->context.split(" ", QString::SkipEmptyParts);
            int l  = list1.length();
            if(l <= 2){
                string s = "Lack of a Expression!";
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }                                           //缺少表达式部分
            QString s1 = "";
            for(int i = 2;i < l;++i){                   //从2开始是为了去除LET和行号以得到具体的表达式
                s1 += list1[i];
            }
            string ss = list1[2].toStdString();
            if((ss[0] >= '1' && ss[0] <= '9') || ss == "IF" || ss == "THEN" || ss == "WHILE" || ss == "RUN"
                    ||ss == "INPUT" || ss == "GOTO" || ss == "REM" || ss == "QUIT" || ss == "PRINT"){
                string s1 = "Wrong input of the name of the var!";
                if(times[curline->type] == 0){
                    ui->treeDisplay->append(list1[0] + " " + "Error");
                    ui->textBrowser->append(list1[0] + " " + QString::fromStdString(s1));
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }                                           //监测非法变量名
            try{
                QList<QString> tokenslist = tokens->ConvertToTokens(s1);
                exp = parser->BuildExpTree(tokenslist);//将提取出来的表达式转化为树
                int type = exp->GetType();
                if(type == 3){
                    val = exp->eval(context);           //计算转化出来的表达式的结果
                }
            }
            catch(string Error){                        //出现错误
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            if(times[curline->type] == 0){
                ui->treeDisplay->append(list1[0] + " " + "LET");//未出现错误则显示正确的语法树
                Expression *exp1 = exp;
                PrintTheTree(exp1);
            }
            curline = curline->next;
            continue;
        }
        if(curline->type == 3){ //PRINT
            int val = 0;
            Expression* exp;
            QList<QString> list1;
            list1 = curline->context.split(" ", QString::SkipEmptyParts);
            int l  = list1.length();
            if(l <= 2){
                string s = "Lack of a Expression!";
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }                                               //缺少表达式部分
            QString s1 = "";
            for(int i = 2;i < l;++i){                       //从2开始是为了去除PRINT和行号以得到具体的表达式
                s1 += list1[i];
            }
            try{
                QList<QString> tokenslist = tokens->ConvertToTokens(s1);
                exp = parser->BuildExpTree(tokenslist);
                parser->StackClear();
            }
            catch(string Error){                            //出现生成树时的错误
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list1[0] + " " + s1);
                    ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            try {                                           //出现计算值时的错误
                val = exp->eval(context);
            } catch (string Error) {
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(s1);
                    ui->treeDisplay->append(list1[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            if(times[curline->type] == 0){
                ui->treeDisplay->append(list1[0] + " " + "PRINT");//未出现错误则将正确表达式树显示出来
                Expression *exp1 = exp;
                PrintTheTree(exp1);
            }
            /*QString s = QString::number(val,10);
            ui->textBrowser->append(s); */                    //将PRINT运行后的结果打印在结果区
            curline = curline->next;
            continue;
        }
        if(curline->type == 4){ //INPUT
            QList<QString> list = curline->list;
            //Input = true;
            int l  = list.length();
            if(l <= 2){
                string s = "Lack of a Expression!";
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + s1);
                    ui->treeDisplay->append(list[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }                                               //缺少表达式部分
            QList<QString> ll = tokens->ConvertToTokens(list[2]);
            if(ll.length() > 1){                            //INPUT后输入的内容过长
                QString error = "Wrong input of the length of the var!";
                ui->textBrowser->append(list[0] + " " + error);
                ui->treeDisplay->append(list[0] + " " + "Error");
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            if(l > 3){
                QString error = "Wrong input of the length of the var!";
                ui->textBrowser->append(list[0] + " " + error);
                ui->treeDisplay->append(list[0] + " " + "Error");
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            string s = list[2].toStdString();
            if((s[0] >= '1' && s[0] <= '9') || s == "IF" || s == "THEN" || s == "WHILE" || s == "RUN"
                    ||s == "INPUT" || s == "GOTO" || s == "REM" || s == "QUIT" || s == "PRINT"){
                string s1 = "Wrong input of the name of the var!";
                if(times[curline->type] == 0){
                    ui->treeDisplay->append(list[0] + " " + "Error");
                    ui->textBrowser->append(list[0] + " " + QString::fromStdString(s1));
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }                                               //监测非法变量名
            InputName = list[2];
            InputPos = curline;
            if(times[curline->type] == 0){
                ui->treeDisplay->append(InputPos->list[0] + " " + "INPUT");
                ui->treeDisplay->append("   " + InputName);
            }
            curline = curline->next;
            if(!context.isDefined(InputName.toStdString())){
                context.PutValue(InputName.toStdString(),0);
            }
            else context.setValue(InputName.toStdString(),0);
            continue;
        }
        if(curline->type == 5){ //GOTO
            QList<QString> list = curline->list;
            bool ok;
            if(list.length() < 3){
                QString s = "Not Input A Line num!";         //未输入行号
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + s);
                    ui->treeDisplay->append(list[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            QList<QString> ll = tokens->ConvertToTokens(list[2]);//以下两种情况是GOTO后输入了内容但是过长
            if(ll.length() > 1){
                QString error = "Wrong Input of the length of GOTO dest!";
                ui->textBrowser->append(list[0] + " " + error);
                ui->treeDisplay->append(list[0] + " " + "Error");
                curline = curline->next;
                continue;
            }
            if(list.length() > 3){
                QString error = "Wrong Input of the length of GOTO dest!";
                ui->textBrowser->append(list[0] + " " + error);
                ui->treeDisplay->append(list[0] + " " + "Error");
                curline = curline->next;
                continue;
            }
            int dest = list[2].toInt(&ok);
            if(ok){
                if(dest < 0){                               //要跳到的行号<0
                    QString s1 = "Wrong LineNum!";
                    if(times[curline->type] == 0){
                        ui->textBrowser->append(list[0] + " " + s1);
                        ui->treeDisplay->append(list[0] + " " + "Error");
                    }
                    ErrorFound = true;
                    curline = curline->next;
                    continue;
                }
                Statement *p = pro->head;
                p = p -> next;
                while(p != nullptr){                        //尝试找到要跳转的目标行
                    QList<QString> list = p->list;
                    int n = list[0].toInt();
                    if(n == dest) break;
                    p = p->next;
                }
                if(p == nullptr){                           //没找到目标行
                    QString s1 = "Not find the targeted line!";
                    if(times[curline->type] == 0){
                        ui->textBrowser->append(list[0] + " " + s1);
                        ui->treeDisplay->append(list[0] + " " + "Error");
                    }
                    ErrorFound = true;
                    curline = curline->next;
                    continue;
                }
                if(times[curline->type] == 0){
                    ui->treeDisplay->append(curline->list[0] + " " + "GOTO");
                    ui->treeDisplay->append("  " + QString::number(dest,10));
                }
                curline = curline->next;
                continue;
            }
        }
        if(curline->type == 6){ //IF
            PrintIf = true;
            QList<QString> tokenslist;
            QString s = "";
            int val = 0;//存储then后面的数值
            QList<QString>list = curline->context.split(" ", QString::SkipEmptyParts);
            int i = 2;
            while(list[i] != "THEN"){
                s += list[i];
                i++;
            }                                               //此处是在读取if和then之间的判断式
            if(s == ""){                                    //if和then之间没有判断式
                QString error = "Lack of the expression!";
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + error);
                    ui->treeDisplay->append(list[0] + " Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            try {
                tokenslist = tokens->ConvertToTokens(s);
            } catch (string Error) {
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                ui->treeDisplay->append(list[0] + " " + "Error");
                ui->textBrowser->append(list[0] + " " + s1);
                curline = curline->next;
                ErrorFound = true;
                continue;
            }
            QList<QString> ll = tokenslist;
            bool f = false;
            i++;
            if(i == list.length()){                         //then后面没有输入dest行号
                QString error = "Lack of the dest num!";
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + error);
                    ui->treeDisplay->append(list[0] + " Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            if(!parser->IsConstant(list[i])){               //输入的dest部分形式不对
                string error = "Wrong Input of the THEN Statement!";
                if(times[curline->type] == 0){
                    ui->treeDisplay->append(list[0] + " " + "Error");
                    ui->textBrowser->append(list[0] + " " + QString::fromStdString(error));
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            val = list[i].toInt();
            ui->treeDisplay->append(list[0] + " " + "IF" + " " + "THEN");
            try {
                f = CheckIf(ll);//判断 判断式是否为真
                PrintIf = false;
            } catch (string Error) {
                string s = "";
                s += curline->LineNum;
                s += Error;
                QString s1 = QString::fromStdString(s);
                if(times[curline->type] == 0){
                    ui->textBrowser->append(list[0] + " " + s1);
                    ui->treeDisplay->append(list[0] + " " + "Error");
                }
                ErrorFound = true;
                curline = curline->next;
                continue;
            }
            if(f){
                Statement *p = pro->head;
                p = p -> next;
                while(p != nullptr){                        //尝试找到要跳转的目标行
                    QList<QString> list = p->list;
                    int n = list[0].toInt();
                    if(n == val) break;
                    p = p->next;
                }
                if(p == nullptr){                           //没找到目标行
                    QString s1 = "Not find the targeted line!";
                    if(times[curline->type] == 0){
                        ui->textBrowser->append(list[0] + " " + s1);
                        ui->treeDisplay->append(list[0] + " " + "Error");
                    }
                    ErrorFound = true;
                    curline = curline->next;
                    continue;
                }
                curline = curline->next;
                f = false;
            }
            else{                       //若不为真，则到if的下一行
                curline = curline->next;
            }

            if(times[curline->type] == 0){
                ui->treeDisplay->append("  " + QString::number(val,10));
            }
            continue;
        }
        if(curline->type == 7){ //END,程序终止
            ui->treeDisplay->append(curline->list[0] + " " + "END");
            curline = curline->next;
            continue;
        }
        curline = curline->next;
    }
}
