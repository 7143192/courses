#ifndef TOKENIZER_H
#define TOKENIZER_H
#include <QString>
#include <QList>
#include <cstring>
using namespace std;
class Tokens
{
private:
    QList<QString> TokensList;   //用于存储转化后的符号链表
public:
    Tokens();
    bool IsAOperator(QCharRef s);//判断某个子串是否是符号
    bool IsCompoundExp(QString s);//判断某个子串是否是连接式
    bool IsConstantExp(QString s);//判断某个子串是否是常数
    QList<QString> ConvertToTokens(QString s);//将一个从命令行中提取出来的字符串转化为一个元素为各个符号的链表
};

#endif // TOKENIZER_H
