#ifndef EXP_H
#define EXP_H

# include <string>
# include <QString>
# include <QMap>
# include "tokenizer.h"
# include "evalstate.h"
using namespace std;
/* Forward reference */

class EvaluationContext;

/*
 * Type: ExpressionType
 * --------------------
 * This enumerated type is used to differentiate the three different
 * expression types: CONSTANT, IDENTIFIER, and COMPOUND.
 */

enum ExpressionType { CONSTANT, IDENTIFIER, COMPOUND };

/*
 * Class: Expression
 * -----------------
 * This class is used to represent a node in an expression tree.
 * Expression itself is an abstract class.  Every Expression object
 * is therefore created using one of the three concrete subclasses:
 * ConstantExp, IdentifierExp, or CompoundExp.
 */

class Expression {
public:
   Expression();
   virtual ~Expression();
   virtual int eval(EvaluationContext & context) = 0;
   virtual std::string toString() = 0;
   virtual ExpressionType type() = 0;
/* Getter methods for convenience */
   virtual int getConstantValue();
   virtual std::string getIdentifierName();
   virtual std::string getOperator();
   virtual Expression *getLHS();
   virtual Expression *getRHS();
   virtual int GetType();
   int Type = 0;
};

/*
 * Class: ConstantExp
 * ------------------
 * This subclass represents a constant integer expression.
 */

class ConstantExp: public Expression {//常量子类
public:
   ConstantExp(int val);
   virtual int eval(EvaluationContext & context);
   virtual std::string toString();
   virtual ExpressionType type();
   virtual int getConstantValue();
   virtual int GetType();
    int Type = 1;
private:
   int value;
};

/*
 * Class: IdentifierExp
 * --------------------
 * This subclass represents a expression corresponding to a variable.
 */

class IdentifierExp: public Expression {//符号子类(变量/运算符)
public:
   IdentifierExp(std::string name);
   virtual int eval(EvaluationContext & context);
   virtual std::string toString();
   virtual ExpressionType type();
   virtual string getIdentifierName();
   virtual int GetType();
    int Type = 2;
private:
   std::string name;
};

/*
 * Class: CompoundExp
 * ------------------
 * This subclass represents a compound expression.
 */

class CompoundExp: public Expression {//组合式子类
public:
   CompoundExp(string op, Expression *lhs, Expression *rhs);
   virtual ~CompoundExp();
   virtual int eval(EvaluationContext & context);
   virtual std::string toString();
   virtual ExpressionType type();
   virtual std::string getOperator();
   virtual Expression *getLHS();
   virtual Expression *getRHS();
   virtual int GetType();
   int Type = 3;
private:
   std::string op;
   Expression *lhs, *rhs;
};

/*
 * Class: EvaluationContext
 * ------------------------
 * This class encapsulates the information that the evaluator needs to
 * know in order to evaluate an expression.
 */

class EvaluationContext {
public:
    void setValue(std::string var, int value);
    int getValue(std::string var);
    bool isDefined(std::string var);
    void PutValue(string var,int val);
    void Clear();
private:
    map<std::string,int> symbolTable;
};
#endif // EXP_H
