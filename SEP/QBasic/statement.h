#ifndef STATEMENT_H
#define STATEMENT_H
#include "tokenizer.h"
#include "parser.h"
#include <string>
#include <QString>
#include <QList>
using namespace std;
class Statement
{
public:
    Statement();
    Statement(QString state,Statement *n = nullptr);
    int GetLineNum();
    QString GetContext();
    void Rewrite(QString retext);//在一行代码被重写时调用
    int type = 0;       //用于存储该种statement的类型
    int LineNum = 0;//存对应代码行号
    QString context;//存statement对应行的具体代码内容
    Statement *next;//指向下一行的指针
    QList<QString> list;//用于顺序存储每行代码中除了空格之外的每个具体元素
};

#endif // STATEMENT_H
