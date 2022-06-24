#include "statement.h"
#include "tokenizer.h"
#include "parser.h"
#include <iostream>
using namespace std;
Statement::Statement()
{
    next = nullptr;
}

Statement::Statement(QString state,Statement *n)
{
    context = state;
    next = n;
    list = context.split(" ", QString::SkipEmptyParts);//上网查的函数，可以直接跳过空格，并且以“ ”分开每个元素
    QString s = list[0];
    bool ok;
    list[0].toInt(&ok);                  //将行号放在第一个元素中，若无行号则无数字
    if(ok) LineNum = list[0].toInt();    //将行号对应的字符串变为整数从而使其可以被get函数调用
    else LineNum = 0;
    if(list[1] == "REM") type = 1;          //用于存储不同的标准statement
    if(list[1] == "LET") type = 2;
    if(list[1] == "PRINT") type = 3;
    if(list[1] == "INPUT") type = 4;
    if(list[1] == "GOTO") type = 5;
    if(list[1] == "IF") type = 6;
    if(list[1] == "END") type = 7;
    if(list[1] != "REM" && list[1] != "LET" && list[1] != "PRINT" && list[1] != "INPUT"
            && list[1] != "GOTO" && list[1] != "IF" && list[1] != "END") type = 8;//不符合标准命令
}

int Statement::GetLineNum()//返回某一行的行号
{
    return LineNum;
}

QString Statement::GetContext()//返回某一行的内容
{
    return context;
}

void Statement::Rewrite(QString retext)//重写某一行
{
    context = retext;
    list = context.split(" ", QString::SkipEmptyParts);
    LineNum = list[0].toInt();
}
