#ifndef PROGRAM_H
#define PROGRAM_H
#include "statement.h"
#include <string>
#include <QString>
#include <QList>
using namespace std;

class Program
{
public:
    Program();
    int GetLength();
    void ClearPro();//清空
    void DeleteLine(int linenum);//删除某一行（几行）
    void InsertLine(int linenum,QString intext);//插入，分两种，一种是在两个已有行之间插入，另一种是重写某一行(行数重复情况下)
    Statement* MoveToLine(int linenum);//移动到要找的行数
    Statement* SortLines(Statement *head);//排序程序中的每一行
    int Length = 0;
    Statement *head;
    int InsertType = 0;//若是插入就是0，若是重写覆盖就是1
};

#endif // PROGRAM_H
