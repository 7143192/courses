#include "parser.h"
# include <stdlib.h>
#include <iostream>
using namespace std;
Parser::Parser()
{

}

int Parser::Priority(QString s)//获得优先级
{
    if(s == "**") return 4;
    if(s == "*" || s == "/") return 3;
    if(s == "+" || s == "-") return 2;
    if(s == "=") return 1;
    return 0;
}

bool Parser::IsConstant(QString s)//判断一个字符串是否是常量
{
    bool ok;
    s.toInt(&ok,10);
    return ok;
}

int Parser::ConstantValue(QString s)//获得常量的值
{
    if(IsConstant(s)){
        int res = s.toInt();
        return res;
    }
    return -1;
}

bool Parser::IsIdentifier(QString s)//判断是否是变量
{
    if((s[0] >= 'A' && s[0] <= 'Z') || (s[0] >= 'a' && s[0] <= 'z')) return true;
    return false;
}

int Parser::IdentifierValue(QString s,EvaluationContext &eval)//取得符号变量对应的数值
{
    int res = 0;
    string s1 = s.toStdString();
    if(!eval.isDefined(s1)){
        string error = "";
        error += s1;
        error += " is undefined!";
        throw(error);
    }
    res = eval.getValue(s1);
    return res;
}

bool Parser::IsOperator(QString s)//判断某个串是否是运算符
{
    if(s == "(" || s == ")" || s == "+" || s == "-" || s == "*" || s == "/" || s == "**" || s == "=")
        return true;
    return false;
}

bool Parser::CheckBrackets(QList<QString> tokenslist)//检查括号是否配对
{
    int l = tokenslist.length();
    for(int i = 0;i < l;++i){
        QString cur  = tokenslist[i];
        if(cur == "(") bracket.push(cur);
        if(cur == ")"){
            if(bracket.empty()) return false;
            bracket.pop();
        }
    }
    return true;
}

Expression* Parser::BuildExpTree(QList<QString> tokenslist)
{
    if(tokenslist.length() == 0){
        string error = "Lack of a Expression!";
        throw(error);
        return nullptr;
    }                                       //表达式为空
    for(int i = 0;i<tokenslist.length();++i)//删除生成的表达式中的可能的空格
    {
        if(tokenslist[i] == "")
        {
            tokenslist.removeAt(i);//去除空格
        }
    }
    if(tokenslist[0] == "-") tokenslist.insert(0,"0");//考虑开头的负数
    for(int i = 0;i < tokenslist.length() - 1;++i){
        if(tokenslist[i] == "(" && tokenslist[i + 1] == "-") tokenslist.insert(i + 1,"0");
        if(tokenslist[i] == "=" && tokenslist[i + 1] == "-") tokenslist.insert(i + 1,"0");
    }
    //以上部分是使得表达式中的每个带括号的"-"都有两个运算数
    QString op = "";
    for(int i = 0;i < tokenslist.length();++i){
        if(IsOperator(tokenslist[i]) && tokenslist[i] != "(" && tokenslist[i] != ")") op += "@";
        else op += tokenslist[i];
    }
    if(op.contains("@@")){//不能出现连续的运算数
        string error = "can't have a sequence of operators!";
        throw(error);
    }
    if((IsOperator(tokenslist[tokenslist.length() - 1])
        && tokenslist[tokenslist.length() - 1] != "(" && tokenslist[tokenslist.length() - 1] != ")")
            || (IsOperator(tokenslist[0]) && tokenslist[0] != "(" && tokenslist[0] != ")")){
        string s = "Lack of the operands!";
        throw(s);
    }
    QList<QString> list1 = tokenslist;
    if(!CheckBrackets(list1)){//检查括号是否配对
        string s = "lack of bracket(s)!";
        throw(s);
    }
    Expression* root = nullptr;  //将要返回的表达式树的根节点
    bool IsExp = false;
    for(int i = 0;i < tokenslist.length();++i){
        QString cur = tokenslist[i];
        if(IsConstant(cur)){//是常量
            ConstantExp *constant = new ConstantExp(cur.toInt());
            Operands.push(constant);
            continue;
        }
        if(IsIdentifier(cur)){//是变量
            IdentifierExp *identifier = new IdentifierExp(cur.toStdString());
            Operands.push(identifier);
            continue;
        }
        if(IsOperator(cur)){//是运算符
            if(cur == "("){//左括号应该直接进栈
                Operators.push(cur);
                continue;
            }
            if(cur == ")"){//是右括号，准备开始出栈
                while(Operators.top() != "("){
                    Expression* left;
                    Expression* right;
                    CompoundExp* compound;
                    QString op = Operators.top();
                    string op1 = op.toStdString();//读取当前栈顶符号
                    Operators.pop();
                    if(!Operands.empty()){
                        right = Operands.top();
                        Operands.pop();
                    }
                    else right = nullptr;
                    if(!Operands.empty()){
                        left = Operands.top();
                        Operands.pop();
                    }
                    else left = nullptr;    //构建当前组合式的左右节点(注意栈为空的情况)
                    compound = new CompoundExp(op1,left,right);//将新生成的组合式入栈
                    Operands.push(compound);
                }
                Operators.pop();//找到左括号之后，将左括号pop出符号栈
            }
            else{           //不是括号
                if(Operators.empty()){ //栈为空直接进栈
                    Operators.push(cur);
                    continue;
                }
                else{                   //栈不为空，比较优先级
                    int p1 = Priority(cur);
                    int p2 = Priority(Operators.top());
                    if(p1 > p2){        //优先级递增，直接入栈
                        Operators.push(cur);
                        continue;
                    }
                    if(p1 <= p2){       //优先级出现相等或小于的情况，开始出栈直到满足递增
                        while((!Operators.empty()) && (Priority(Operators.top()) >= p1)){
                            QString op = Operators.top();
                            /*string p = op.toStdString();
                            cout<<p<<endl;*/
                            Expression* left;
                            Expression* right;
                            Operators.pop();            //取当前栈顶符号并pop
                            string op1 = op.toStdString();

                            if(!Operands.empty()){
                                right = Operands.top();
                                Operands.pop();
                            }
                            else right = nullptr;
                            if(!Operands.empty()){
                                left = Operands.top();
                                Operands.pop();
                            }
                            else left = nullptr;
                            CompoundExp *compound = new CompoundExp(op1,left,right);
                            Operands.push(compound);//构造新的组合式并入栈
                            if(cur == "**"){
                                Expression *top = Operands.top();
                                if(top->getOperator() == "**"){
                                    Operands.pop();
                                    Operands.push(top->getLHS());
                                    Operands.push(top->getRHS());
                                    IsExp = true;
                                    Operators.push("**");
                                    break;
                                }
                            }
                        }
                        Operators.push(cur);        //将cur符号入栈,因为cur符号最高应与top符号一起计算
                    }
                }
            }
        }
    }
    while(!Operators.empty()){//若在所有符号都入栈之后符号栈仍不为空，则继续出栈并构造组合式入操作数栈
        QString s = Operators.top();
        string s1 = s.toStdString();
        Operators.pop();
        Expression* left;
        Expression* right;
        if(!Operands.empty()){
            right = Operands.top();
            Operands.pop();
        }
        else right = nullptr;
        if(!Operands.empty()){
            left = Operands.top();
            Operands.pop();
        }
        else left = nullptr;
        CompoundExp* compound = new CompoundExp(s1,left,right);
        Operands.push(compound);
    }
    //此时只有Operands栈中有元素，且栈顶元素应该就是表达式树对应的expression类指针
    root = Operands.top();
    return root;
}

int Parser::OperatorNum(QList<QString> tokenslist)//返回表达式中运算符的个数
{
    int num = 0;
    int l = tokenslist.length();
    for(int i = 0;i < l;++i){
        if(IsOperator(tokenslist[i])) num++;
    }
    return num;
}

void Parser::StackClear()//清空两个栈
{
    while(!Operands.empty()) Operands.pop();
    while(!Operators.empty()) Operators.pop();
}
