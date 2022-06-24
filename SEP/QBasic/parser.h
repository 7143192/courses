#ifndef PARSER_H
#define PARSER_H
#include <QString>
#include <cstring>
#include <stack>
#include "exp.h"
using namespace std;
class Parser
{
public:
    stack<QString> Operators;   //操作符栈
    stack<Expression*> Operands;//运算数栈
    stack<QString> bracket;     //括号栈
    EvaluationContext context;
    Parser();
    int Priority(QString s); //获得运算符的优先级
    bool IsConstant(QString s); //判断是否是常量表达式
    int ConstantValue(QString s);//获得常数的值
    int IdentifierValue(QString s,EvaluationContext &eval);//获得符号(变量)对应的值
    bool IsIdentifier(QString s);//判断是否是变量名
    bool IsOperator(QString s);//判断某个字符（串）是否是运算符
    bool CheckBrackets(QList<QString> tokenslist);       //检测括号是否都配对
    Expression* BuildExpTree(QList<QString> tokenslist);//生成表达式树的函数(此文件的核心，也是整个pro的核心之一)
    void StackClear();//清空栈
    void PrintTree(Expression *root);//打印出整个表达式树
    int OperatorNum(QList<QString> tokenslist);//返回表达式中运算符的个数
};

#endif // PARSER_H
