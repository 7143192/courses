#include<iostream>
using namespace std;

class node
{
public:
    int data;
    node *next;
public:
    node(int d,node *n=NULL){data=d;next=n;}
    node(node *next=NULL){}
    void erase(int x,int y);
};
void node::erase(int x,int y)
{
    node *p=this;
    node *q;
    while(p!=NULL){
        if(p->data>=x&&p->data<=y){
            q=p->next;
            delete p;
            p=q;
        }
        else p=p->next;
    }
}
int main()
{
    node *p,*head,*rear;
    head=rear=new node();
    int s;
    int x,y;
    cin>>x>>y;
    while(cin>>s){
        p=new node(s);
        rear->next=p;
        rear=p;
    }
    p=head->next;
    p->erase(x,y);
    p=head->next;
    while(p!=NULL){
        cout<<p->next<<" ";
        p=p->next;
    }

    return 0;
}
