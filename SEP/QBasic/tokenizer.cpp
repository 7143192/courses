#include "tokenizer.h"
#include <string>
using namespace std;
Tokens::Tokens()
{

}

QList<QString> Tokens::ConvertToTokens(QString s)//将一个从命令行中提取出来的字符串转化为一个元素为各个符号的链表
{
    TokensList.clear();
    int i = 0;
    int j = 0;
    int l = s.length();
    if(l == 0){
        QString error = "Lack of the Expression!";
        throw(error);
    }
    s = s.remove(QRegExp("\\s"));//删除空格
    QString exp = "";
    for(i = 0;i < l;++i){
        if(!IsAOperator(s[i])) continue;
        if((s[i] == "<" || s[i] == "=" || s[i] == ">") && IsAOperator(s[i + 1])
                && s[i + 1] != "-" && s[i + 1] != "("){
            string s = "Wrong input of the IF ops!";
            throw(s);
        }
        string expression = s.toStdString();
        string p = "";
        for(int k = j;k < i;++k){
            p += expression[k];
        }
        exp = QString::fromStdString(p);
        TokensList.append(exp);         //将两个符号之间的表达式放入链表
        if(s[i] == "*" && s[i + 1] == "*"){
            TokensList.append("**");
            j = i + 2;
            i++;
        }
        else{
            TokensList.append(QString(s[i]));//将连接的符号放入链表
            j = i + 1;
        }
        exp = "";
    }
    if(j == 0){//j仍然为0说明没有符号出现，故将整个表达式直接放进去
        TokensList.append(s);
    }
    else{       //j不为0，说明出现了至少一个运算符，此时不要忘记将最后一个运算符到末尾的部分放入链表
        QString p = "";
        for(int k = j;k < l;++k){
            p += s[k];
        }
        exp = p;
        TokensList.append(exp);
    }
    QList<QString> reslist = TokensList;
    return reslist;
}

bool Tokens::IsAOperator(QCharRef s)//判断某个子串是否是符号
{
    if(s == "(" || s == ")" || s == "+" || s == "-" || s == "*" || s == "/" || s == "**" || s == "="
            || s == "<" || s == ">")
        return true;
    return false;
}

bool Tokens::IsCompoundExp(QString s)//判断某个子串是否是连接式
{
    int l = s.length();
    for(int i = 0;i < l;++i){
        if(IsAOperator(s[i])) return true;
    }                                       //检测该子串中是否有运算符
    return false;
}

bool Tokens::IsConstantExp(QString s)//判断某个子串是否是常数
{
    string s1 = s.toStdString();
    int l = s1.length();
    for(int i = 0;i < l;++i){
        if(s1[i] < '0' || s[i] > '9') return false;//判断该子串的每一位是不是整数，若有不是的就不是constant
    }
    return true;
}
