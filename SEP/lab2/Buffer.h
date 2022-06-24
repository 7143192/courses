#pragma once

#include <string>

using std::string;

class List{
public:
    struct node{
        const string data;
        node *next;
        node(node *n=nullptr){next=n;}
        node(const string &d,node *ne=nullptr):data(d),next(ne){}
        ~node(){}
    };
    node *head;
    node *rear;
    int length;
    List(){
        head=rear=new node();
        length=0;
    }
    void setup(const string &d){
        node *p=new node(d);
        rear->next=p;
        rear=p;
        length++;
        rear->next=nullptr;
    }
    void clear(){
        node *p=head->next;
        node *q;
        head->next=nullptr;
        while(p!=nullptr){
            q=p->next;
            delete p;
            p=q;
        }
        length=0;
    }
    ~List(){clear();delete head;delete rear;}
    node* move(int i){
        node *p=head;
        while(i-->=0) p=p->next;
        return p;
    }
    string visit(int i){
        return (move(i)->data);
    }
    void remove(int i){
        if(i<length-1&&i>0){
            node *pos,*delp;
            pos=move(i-1);
            delp=pos->next;
            pos->next=delp->next;
            delete delp;
            length--;
        }
        else{
            if(i==length-1){
                node *pos,*delp;
                pos=move(i-1);
                delp=pos->next;
                pos->next=nullptr;
                delete delp;
                length--;
            }
            else{
                if(i==0){
                    node *p=head->next;
                    node *q=p->next;
                    head->next=q;
                    delete p;
                    length--;
                }
            }
        }
    }
    int search(const string &d){
        node *p=head->next;
        int i=0;
        while(p!=nullptr&&p->data!=d){
            p=p->next;
            ++i;
        }
        if(p==nullptr) return -1;
        else return i;
    }
    void insert(int i,const string &d){
        if(i>=1){
            node *pos;
            pos=move(i-1);
            node *q=pos->next;
            node *p=new node(d);
            pos->next=p;
            p->next=q;
            ++length;
        }
        else{
            if(i==-1||i==0){
                node *pos=head->next;
                node *p=new node(d);
                head->next=p;
                p->next=pos;
                ++length;
            }
        }

    }

};

class Buffer {
private:
    int currentLineNum;
    // TODO: add a List here for storing the input lines
    List *list=new List();

public:
    Buffer();
    ~Buffer();

    void writeToFile(const string &filename);

    const string &moveToLine(int idx);

    void showLines(int from, int to);

    void deleteLines(int from, int to);
    void insertLine(const string &text);
    void appendLine(const string &text);
    int getlength();
};
