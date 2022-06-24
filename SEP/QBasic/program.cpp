#include "program.h"
//本文件中的功能本质上就是链表的操作(提醒我该好好复习一下数据结构了)
Program::Program()
{
    Length = 0;
    head = new Statement();
    InsertType = 0;
}

int Program::GetLength()//返回函数总行数的函数
{
    return Length;
}

void Program::ClearPro()//清空整个程序
{
    Statement *p,*q;
    p = head->next;
    while(p != nullptr)
    {
        q = p->next;
        delete p;
        p=q;
    }
    head->next = nullptr;
    delete p;
    delete q;
    Length = 0;
}

Statement* Program::MoveToLine(int linenum)//移动到某一行，并且在这个过程中判断是应该插入还是重写覆盖
{
    Statement *p = head->next;
    Statement *q = head;
    if(p == nullptr){
        InsertType = 0;
        return head;
    }
    while((p->LineNum < linenum || linenum == 0) && (p->next != nullptr)){
        p = p->next;
        q = q->next;
    }
    if(p->LineNum == linenum){
        InsertType = 1;
        return p;
    }
    else{
        if(p->next != nullptr){
            InsertType = 0;
            return q;
        }
        else{
            InsertType = 0;
            return p;
        }
    }
    return nullptr;
}

void Program::DeleteLine(int linenum)//删除某一行
{
    Statement *p ,*q;
    p = head->next;
    q = head;
    while(p != nullptr){
        if(p->LineNum == linenum){
            q->next = p->next;
            delete p;
            Length--;
            return ;
        }
        p = p->next;
        q = q->next;
    }
    if(p == nullptr){
        string s = "can't find the targeted line!";
        throw(s);
    }
}

void Program::InsertLine(int linenum,QString intext)
{
    Statement *p = MoveToLine(linenum);
    Statement *q = p;
    if(InsertType == 1){//需要重写覆盖
        p->context = intext;
        QList<QString> list1 = intext.split(" ", QString::SkipEmptyParts);
        p->LineNum = p->list[0].toInt();
        p->list = list1;
        return ;
    }
    else{               //不用重写，直接插入
        if(p->next == nullptr){//已经到最后
            p->next = new Statement(intext,nullptr);
            Length++;
        }
        else{//未到最后一行
            p->next = new Statement(intext,q->next);
            Length++;
        }
    }
}

Statement* Program::SortLines(Statement *head)//对程序中的每一行按照行号来进行排序
{
    if(head == nullptr || head->next == nullptr) return head;
    Statement *p = head->next;
    Statement *end = head;
    Statement *start = new Statement();
    start->next = head;
    while(p != nullptr){
        Statement *tmp = start->next, *pre = start;
        while(tmp != p && p->LineNum >= tmp->LineNum) //找到插入位置
        {
            tmp = tmp->next;
            pre = pre->next;
        }
        if(tmp == p) end = p;
        else
        {
            end->next = p->next;
            p->next = tmp;
            pre->next = p;
        }
        p = end->next;
    }
    head = start->next;
    delete start;
    return head;
}
