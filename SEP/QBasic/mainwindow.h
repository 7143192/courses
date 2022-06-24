#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include "program.h"
#include "statement.h"
#include <QMainWindow>
#include <vector>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    void Run(Statement *curline);//运行程序的函数
    void OtherOptions(QString str);//其他一些可能的command
    void LOAD();//加载文件
    void PrintTheTree(Expression *root);//打印出整个表达式树
    void CountLevelNum(Expression *root);//数每行的元素个数
    bool CheckIf(QList<QString> tokenslist);
    bool IsIfOperators(QString s);//判断是否是if判断式中的运算符
    void PrintAllTrees(Statement *curline);//在正式运行前将所有语法树打印出来(包括出错的情况)
    bool CheckEnd(Statement* curline);      //检测程序是否有出口(END行)
    Program *pro;
    QString InputName;//记录输入进来的变量名
    Statement *InputPos;//记录输入的行数
    int InputVal = 0;//记录输入进来的数值
    Parser *parser;
    Tokens *tokens;
    EvaluationContext context;//以上三行是一些要用到的类的实例化对象
    QString* TreeNode;//存树的节点的数组
    QString RootNode;//存根节点的
    int *LevelNum;//存每层元素个数的数组
    int times[9];
    int k = 0;
    int p = 0;
    int time = 1;
    int NumofLine = 0;
    bool PrintIf = true;//用于判断是否要打印IF中的表达式
    bool ErrorFound = false;//用于判断是否找到了错误
    bool Running = false;//用于判断是否处于运行状态
    QList<QString> Token;

private slots:
    void on_cmdLineEdit_editingFinished();

    void on_btnLoadCode_clicked();

    void on_btnClearCode_clicked();

    void on_btnRunCode_clicked();

private:
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H
