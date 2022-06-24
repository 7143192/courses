#include <fstream>
#include <iostream>
#include "Buffer.h"
using namespace std;
//TODO: your code here
//implement the functions in ListBuffer

string s;

Buffer::Buffer() {
    currentLineNum=0;
}

Buffer::~Buffer() {delete list;currentLineNum=0;}

void Buffer::writeToFile(const string &filename){
    if(filename.empty()) throw("Filename not specified");
    int size=0,n=0;
    ofstream file(filename);
    for(int i=1;i<=list->length;++i){
        file<<moveToLine(i);
        n++;
    }
    file.close();
    ifstream file1(filename);
    file1.seekg(0,ios::end);
    size=file1.tellg();
    file1.seekg(0,ios::beg);
    file1.close();
    size+=n;
    cout<<size<<" byte(s) written"<<endl;
}

void Buffer::showLines(int from, int to){
    if(from>to) throw range_error("Number range error");
    if(to>list->length||from<0||from>list->length) throw out_of_range("Line number out of range");
    if(from==to){
        cout<<from<<'\t'<<moveToLine(from)<<endl;
        currentLineNum=from;
    }
    else{
        for(int i=from;i<=to;++i){
            cout<<i<<'\t'<<moveToLine(i)<<endl;
            currentLineNum=i;
        }
    }
}

void Buffer::deleteLines(int from, int to){
    if(from>to) throw range_error("Delete range error");
    if(to>list->length||from<0||from>list->length) throw out_of_range("Line number out of range");
    if((from==to)&&(from!=list->length)){
        list->remove(from-1);
        currentLineNum=from;
    }
    else{
        if((from==to)&&(from==list->length)){
            list->remove(from-1);
            currentLineNum=list->length;
        }
        else{
            if((from==1)&&(to==list->length)){
                list->clear();
                currentLineNum=0;
            }
            else{
                if(from==1&&to!=list->length){
                    for(int i=0;i<to;++i){
                        list->remove(0);
                    }
                }
                else{
                    if((from<to)&&(to!=list->length)){
                        int l=to-from+1;
                        for(int i=0;i<l;++i){
                            list->remove(from-1);
                        }
                        currentLineNum=from;
                    }
                    else{
                        if((from<to)&&(to==list->length)){
                            int l=to-from+1;
                            for(int i=0;i<l;++i){
                                list->remove(from-1);
                            }
                            currentLineNum=list->length;
                        }
                    }
                }
            }
        }
    }
}

void Buffer::insertLine(const string &text){
    if(currentLineNum!=list->length){
        int x=currentLineNum-1;
        list->insert(x,text);
        currentLineNum=x+1;
    }
    else{
        if(currentLineNum==0){
            list->setup(text);
            currentLineNum=list->length;
        }
        else{
            if(currentLineNum==list->length&&currentLineNum!=0){
                int x=list->length-1;
                list->insert(x,text);
                currentLineNum=x+1;
            }
        }
    }
}

void Buffer::appendLine(const string &text){
    if(currentLineNum!=list->length){
        int x=currentLineNum;
        list->insert(x,text);
        currentLineNum=x+1;
    }
    else{
        if(currentLineNum==list->length){
            list->setup(text);
            currentLineNum=list->length;
        }
    }
}

const string &Buffer::moveToLine(int idx){
    if(idx>list->length||idx==0) throw out_of_range("Line number out of range");
    currentLineNum=idx;
    s=list->visit(idx-1);
    return s;
}

int Buffer::getlength()
{
    return list->length;
}
