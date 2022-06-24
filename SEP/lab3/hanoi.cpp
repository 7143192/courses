#include "termio.h"
#include<iostream>
#include<string>
#include<cstring>
using namespace std;
class stack
{
private:
    int top_p;
    int maxsize;
    int *elem;
public:
    stack(int n){
        top_p=-1;
        elem=new int[n];
        maxsize=n;
    }
    ~stack(){delete []elem;}
    void push(int &x){
        elem[++top_p]=x;
    }
    int pop(){
        return elem[top_p--];
    }
    int top(){
        return elem[top_p];
    }
    bool isempty(){
        return top_p==-1;
    }
    int getlength(){
        return (top_p+1);
    }
    void clear(){
        while(!isempty()){
            pop();
        }
    }
};
void write(stack *s1,stack *s2,stack *s3);
int initialphase();
void setup(stack *s,int &n);
bool move(stack *s1,stack *s2);
bool match(int from,int to,stack *s1,stack *s2,stack *s3);
void hanoi(int n,int from,int to,int tmp,stack *s1,stack *s2,stack *s3);
void ehanoi(int &a,int &b,int &c,int A,int B,int C,stack *s1,stack *s2,stack *s3);
// Do not delete the following line
char Termio::buffer[Termio::CANVAS_HEIGHT][Termio::CANVAS_WIDTH + 1];

void write(stack *s1,stack *s2,stack *s3)
{
    for(int i=0;i<10;++i){
        Termio::buffer[i][5]='|';
        Termio::buffer[i][20]='|';
        Termio::buffer[i][35]='|';
    }
    for(int i=0;i<Termio::CANVAS_WIDTH+1;++i){
        Termio::buffer[10][i]='-';
    }
    Termio::buffer[10][5]='|';
    Termio::buffer[10][20]='|';
    Termio::buffer[10][35]='|';
    int l=0,k=0;
    int *a1=new int[5];
    int *a2=new int[5];
    int *a3=new int[5];
    if(!s1->isempty()){
        int l1=s1->getlength();
        for(int i=l1-1;i>=0;--i){
            Termio::buffer[9-2*i][5]='*';
            l=s1->pop();
            a1[k++]=l;
            for(int j=1;j<=l;++j){
                Termio::buffer[9-2*i][5-j]='*';
                Termio::buffer[9-2*i][5+j]='*';
            }
        }
        for(int i=k-1;i>=0;--i) s1->push(a1[i]);
        k=0;
    }
    if(!s2->isempty()){
        int l2=s2->getlength();
        for(int i=l2-1;i>=0;--i){
            Termio::buffer[9-2*i][20]='*';
            l=s2->pop();
            a2[k++]=l;
            for(int j=1;j<=l;++j){
                Termio::buffer[9-2*i][20-j]='*';
                Termio::buffer[9-2*i][20+j]='*';
            }
        }
        for(int i=k-1;i>=0;--i) s2->push(a2[i]);
        k=0;
    }
    if(!s3->isempty()){
        int l3=s3->getlength();
        for(int i=l3-1;i>=0;--i){
            Termio::buffer[9-2*i][35]='*';
            l=s3->pop();
            a3[k++]=l;
            for(int j=1;j<=l;++j){
                Termio::buffer[9-2*i][35-j]='*';
                Termio::buffer[9-2*i][35+j]='*';
            }
        }
        for(int i=k-1;i>=0;--i) s3->push(a3[i]);
        k=0;
    }
    delete []a1;
    delete []a2;
    delete []a3;
}

int initialphase()
{
    char c[10]={0};
    cin.getline(c,10);
    if(strlen(c)>1){
        return -1;
    }
    if(strlen(c)==1){
        if(c[0]=='Q') return 0;
        else{
            if(c[0]>='1'&&c[0]<='5') return (c[0]-'0');
            else return -1;
        }
    }
}

void setup(stack *s,int &n)
{
    for(int i=n;i>=1;--i){
        s->push(i);
    }
}

bool move(stack *s1,stack *s2)
{
    if(s1->isempty()) return false;
    int x1=s1->top();
    if(s2->isempty()){
        s2->push(x1);
        s1->pop();
        return true;
    }
    else{
        int x2=s2->top();
        if(x1<x2){
            s2->push(x1);
            s1->pop();
            return true;
        }
        else return false;
    }
}

bool match(int from,int to,stack *s1,stack *s2,stack *s3)
{
    bool f;
    if(from==1&&to==2){f=move(s1,s2);return f;}
    if(from==1&&to==3){f=move(s1,s3);return f;}
    if(from==2&&to==3){f=move(s2,s3);return f;}
    if(from==2&&to==1){f=move(s2,s1);return f;}
    if(from==3&&to==1){f=move(s3,s1);return f;}
    if(from==3&&to==2){f=move(s3,s2);return f;}
}

void hanoi(int n,int from,int to,int tmp,stack *s1,stack *s2,stack *s3)
{
    if(n==1){
        std::cout << "Auto moving:" <<from<<"->"<<to<< std::endl;
        match(from,to,s1,s2,s3);
        Termio::Clear();
        Termio::ResetBuffer();
        write(s1,s2,s3);
        Termio::Draw();
    }
    else{
        hanoi(n-1,from,tmp,to,s1,s2,s3);
        std::cout << "Auto moving:" <<from<<"->"<<to<< std::endl;
        match(from,to,s1,s2,s3);
        Termio::Clear();
        Termio::ResetBuffer();
        write(s1,s2,s3);
        Termio::Draw();
        hanoi(n-1,tmp,to,from,s1,s2,s3);
    }
}

void ehanoi(int &a,int &b,int &c,int A,int B,int C,stack *s1,stack *s2,stack *s3)
{
    hanoi(b+c,A,B,C,s1,s2,s3);
    hanoi(c,B,C,A,s1,s2,s3);
}

int main(){
    // Your code here
    // some output hints that you should use.
    stack *s1=new stack(5);
    stack *s2=new stack(5);
    stack *s3=new stack(5);
    stack *fs=new stack(100);
    stack *ts=new stack(100);
    string s;
    char s0[10]={0};
    char c1=' ';
    int temp;
    bool f=true;
    int t=0,a=0,b=0,c=0,from=0,to=0;
    while(s1->isempty()){
        std::cout << "How many disks do you want? (1 ~ 5)" << std::endl;
        t=initialphase();
        if(t!=-1){
            if(t==0) return 0;
            setup(s1,t);
            Termio::Clear();
            Termio::ResetBuffer();
            write(s1,s2,s3);
            Termio::Draw();
        }
        if(t==-1){
            continue;
        }

        while(!s1->isempty()||!s3->isempty()){
            std::cout << "Move a disk. Format: x y" << std::endl;
            cin.getline(s0,10);
            if(strlen(s0)<3){
                Termio::Clear();
                Termio::ResetBuffer();
                write(s1,s2,s3);
                Termio::Draw();
                continue;
            }
            if(strlen(s0)==3){
                from=s0[0]-'0';
                to=s0[2]-'0';
                if(from==to&&to==0){
                    temp=1;
                    break;
                }
                if(from!=to){
                    temp=0;
                    if(from<1||to<1||from>3||to>3){
                        Termio::Clear();
                        Termio::ResetBuffer();
                        write(s1,s2,s3);
                        Termio::Draw();
                        continue;
                    }
                    f=match(from,to,s1,s2,s3);
                    if(!f){
                        Termio::Clear();
                        Termio::ResetBuffer();
                        write(s1,s2,s3);
                        Termio::Draw();
                        continue;
                    }
                    else{
                        fs->push(from);
                        ts->push(to);
                        Termio::Clear();
                        Termio::ResetBuffer();
                        write(s1,s2,s3);
                        Termio::Draw();
                        if(!s2->isempty()&&s1->isempty()&&s3->isempty()){
                            Termio::Clear();
                            std::cout << "Congratulations! You win!" << std::endl;

                            s2->clear();
                            break;
                        }
                    }
                }
            }
            if(strlen(s0)==8){
                a=s0[1]-'0';
                b=s0[4]-'0';
                c=s0[7]-'0';
                temp=2;
                break;
            }
        }

        if(temp==1){
            if(!s2->isempty()||!s3->isempty()){
                while(!fs->isempty()){
                    std::cout << "Auto moving:" <<ts->top()<<"->"<<fs->top()<< std::endl;
                    match(ts->pop(),fs->pop(),s1,s2,s3);
                    Termio::Clear();
                    Termio::ResetBuffer();
                    write(s1,s2,s3);
                    Termio::Draw();
                }
            }
            hanoi(t,1,2,3,s1,s2,s3);
            Termio::Clear();
            std::cout << "Congratulations! You win!" << std::endl;

            s2->clear();
        }
        if(temp==2){
            if(!fs->isempty()){
                while(!fs->isempty()){
                    std::cout << "Auto moving:" <<ts->top()<<"->"<<fs->top()<< std::endl;
                    match(ts->pop(),fs->pop(),s1,s2,s3);
                    Termio::Clear();
                    Termio::ResetBuffer();
                    write(s1,s2,s3);
                    Termio::Draw();
                }
            }
            ehanoi(a,b,c,1,2,3,s1,s2,s3);
            Termio::Clear();
            std::cout << "Congratulations! You win!" << std::endl;

            s1->clear();
            s2->clear();
            s3->clear();
        }
    }

    return 0;
}
