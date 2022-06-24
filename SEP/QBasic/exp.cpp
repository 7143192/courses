#include "exp.h"
#include <cmath>
#include <iostream>
#include <climits>
using namespace std;
Expression::Expression()
{

}

Expression::~Expression()
{

}

int Expression::getConstantValue()
{
    return 0;
}

std::string Expression::getIdentifierName()
{
    string s = "";
    return s;
}

std::string Expression::getOperator()
{
    string s = "";
    return s;
}

Expression* Expression::getLHS()
{
    Expression* lhs = nullptr;
    return lhs;
}

Expression* Expression::getRHS()
{
    Expression *rhs = nullptr;
    return rhs;
}

int Expression::GetType()
{
    return Type;
}

//以下是constant类型相关函数的实现
ConstantExp::ConstantExp(int val)//常量类构造函数
{
    this->value = val;
}

int ConstantExp::eval(EvaluationContext & context)
{
    context.isDefined("a");
    return value;
}

int ConstantExp::getConstantValue()//返回常量对应的值
{
    return value;
}

ExpressionType ConstantExp::type()
{
    return CONSTANT;
}

std::string ConstantExp::toString()//将value变为字符串后返回
{
    string s = to_string(value);
    return s;
}

int ConstantExp::GetType()
{
    return Type;
}

//以下是符号类型相关的实现

IdentifierExp::IdentifierExp(string n)//构造函数
{
    this->name = n;
}

std::string IdentifierExp::toString()//本来就是字符串。。。
{
    return name;
}

string IdentifierExp::getIdentifierName()//返回符号的名称
{
    return this->name;
}

ExpressionType IdentifierExp::type()//返回符号对应的类型
{
    return IDENTIFIER;
}

int IdentifierExp::eval(EvaluationContext & context) {//返回符号对应的数值
   if (!context.isDefined(this->name)){
       string error = "";
       error += (this->name);
       error += " is undefined";
       throw(error);
   }
   cout<<this->name<<endl;
   return context.getValue(this->name);
}

int IdentifierExp::GetType()
{
    return Type;
}

//以下是组合式类型的相关函数实现

CompoundExp::CompoundExp(string op1, Expression *lhs1, Expression *rhs1)
{
    this->op = op1;
    this->lhs = lhs1;
    this->rhs = rhs1;
}

CompoundExp::~CompoundExp()
{

}

std::string CompoundExp::toString()
{
    return this->op;
}

ExpressionType CompoundExp::type()
{
    return COMPOUND;
}

std::string CompoundExp::getOperator()//返回组合式的连接运算符
{
    return this->op;
}

Expression* CompoundExp::getLHS()//返回左子节点
{
    return this->lhs;
}

Expression* CompoundExp::getRHS()//返回右子节点
{
    return this->rhs;
}

int CompoundExp::eval(EvaluationContext & context) {//计算组合式的值
    if(rhs == nullptr){
        string error = "Illegal operator in expression,an operator must have right value!";
        throw error;
        return 0;
    }
    int right = 0;
    try {
        right = rhs->eval(context);
    } catch (string Error) {
        string s = Error;
        throw(s);
        return 0;
    }
   if (op == "=") {
      context.setValue(lhs->getIdentifierName(), right);
      return right;
   }
   if(lhs == nullptr){
       string error = "Illegal operator in expression,an operator must have left value!";
       throw error;
       return 0;
   }
   int left = 0;
   try {
       left = lhs->eval(context);
   } catch (string Error) {
       string s = Error;
       throw(s);
   }
   if (op == "+"){
       int ans = left + right;
       if((left > 0 && right > 0 && ans < 0) || (left < 0 && right < 0 && ans > 0)){
           string error = "The answer out of the int range!";
           throw(error);
       }
       return left + right;
   }
   if (op == "-") {
       int ans = left - right;
       if((left >=0 && right < 0 && ans <= 0) || (left < 0 && right >= 0 && ans >= 0)){
           string s = "The answer out of the int range!";
           throw(s);
       }
       return left - right;
    }
   if (op == "*"){
    int ans = left * right;
    if((left > 0 && right > 0 && ans < 0 ) || (left < 0 && right < 0 && ans < 0)
            || (left > 0 && right < 0 && ans > 0) || (left < 0 && right > 0 && ans > 0)){
        string error = "The answer out of the int range!";
        throw(error);
    }
        return left * right;
   }
   if(op == "**"){
    int ans = pow(left,right);
    if(left > 0 && ans < 0){
        string error = "The answer out of the int range!";
        throw(error);
    }
    return pow(left,right);
   }
   if (op == "/") {
      if (right == 0){
          string error = "Division by 0";
          throw(error);
      }
      return left / right;
   }                                                //考虑运算结果并考虑可能出现的结果越界的情况
   string error = "Illegal operator in expression";
   throw(error);
   return 0;
}

int CompoundExp::GetType()
{
    return Type;
}

//以下是context类的相关函数实现
void EvaluationContext::setValue(std::string var, int value)
{
    symbolTable[var] = value;
}

int EvaluationContext::getValue(std::string var)
{
    return symbolTable[var];
}

bool EvaluationContext::isDefined(std::string var)
{                                               //上网查了map的用法....
    return symbolTable.count(var);
}

void EvaluationContext::PutValue(string name,int val)
{
    symbolTable.insert(pair<string,int>(name, val));
}

void EvaluationContext::Clear()                 //每次执行完程序之后清空存储的变量及对应的数值
{
    symbolTable.clear();
}
