#include <vector>
#include <iostream>
#include <fstream>
#include "Class.h"
#include "Student.h"
#include <iomanip>
#include<string>
#include <cstdlib>
using namespace std;
class A{};
class AppX {
private:
    vector<Student *> studentVec;
    vector<Class *> classVec;

    void loadFiles();
    void inputScore();
    void printAvgScore();
    void printGpa();

public:
    AppX();
    ~AppX();
    int run();
};

AppX::~AppX()
{
    // You can use the traditional loop, which is more clear.
    for (vector<Class *>::iterator it = classVec.begin();
         it != classVec.end();
         ++it) {
        if (*it) delete (*it);
    }
    // You can use modern and simpler loops only if you know what it is doing.
    for (const auto &s: studentVec) {
        if (s) delete (s);
    }
}

AppX::AppX()
{
    loadFiles();
}

void AppX::loadFiles()
{
    string line;
    size_t pos1, pos2;
    vector<string> bufv;
    Student *st = nullptr;
    string clsname;
    int point;
    Class *cl = nullptr;

    // Open a file as a input stream.
    ifstream stfile("./Students.txt");

    while (getline(stfile, line)) {
        if (line.empty()) // It's an empty line.
            continue;
        if (line[0] == '#') // It's a comment line.
            continue;

        // The bufv vector stores each columnes in the line.
        bufv.clear();
        // Split the line into columes.
        //   pos1: begining the the column.
        //   pos2: end of the column.
        pos1 = 0;
        while (true) {
            pos2 = line.find(';', pos1 + 1);
            if (pos2 == string::npos) { // No more columns.
                // Save the last column (pos1 ~ eol).
                bufv.push_back(line.substr(pos1, string::npos));
                break;
            } else {
                // Save the column (pos1 ~ pos2).
                bufv.push_back(line.substr(pos1, pos2 - pos1));
            }
            pos1 = pos2 + 1;
        }

        // TODO: uncomment next lines after implementing class Undergraduate
        // and Graduate.

        if (bufv[3] == "U")
            st = new Undergraduate(bufv[0], bufv[1], bufv[2],undergraduate);
        else
            st = new Graduate(bufv[0], bufv[1], bufv[2],graduate);


        studentVec.push_back(st);
    }
    stfile.close();

    // TODO: load data from ./Classes.txt and push objects to the vector.
    // Hint: how is student information read?
    ifstream clfile("./Classes.txt");
    while(getline(clfile,line)){
        if(line.empty()) continue;
        if(line[0]=='#') continue;
        if(line[0]=='C'){
            pos1=0;
            pos2=line.find(':',pos1+1);
            clsname=line.substr(pos2+1,string::npos);
        }
        if(line[0]=='P'){
            pos1=0;
            pos2=line.find(':',pos1+1);
            point=line[pos2+1]-'0';
            cl=new Class(clsname,point);
            classVec.push_back(cl);
        }
        if(line[0]=='F'||line[0]=='B'){
            pos1=0;
            std::string i=line.substr(pos1,string::npos);
            for(vector<Student *>::iterator it = studentVec.begin();
                it != studentVec.end();
                ++it){
                if((**it).id==i){
                    cl->addStudent(**it);
                    (**it).addclass(cl);
                }
            }
        }
    }
    clfile.close();
}

void AppX::inputScore()
{
    // TODO: implement inputScore.
    // Hint: Take a look at printAvgScore().
    string sbuf1,sbuf2;
    Class *cl;
    string s;
    while(true){
        cout << "Please input the class name (or input q to quit): ";
        cin >> sbuf1;
        if (sbuf1 == "q")
            break;
        cl=nullptr;
        for (vector<Class *>::iterator it = classVec.begin();
             it != classVec.end();
             ++it) {
            if ((*it)->name == sbuf1) {
                cl = *it;
                break;
            }
        }
        if (cl == nullptr) {
            cout << "No match class!\n" ;
            continue;
        }
        while(true){
            cout<<"Please input the id of the student(or input q to quit): ";
            cin>>sbuf2;
            if(sbuf2=="q") break;
            try{cl->getStudentWrapper(sbuf2);}
            catch(...){
                cout<<"No match student!\n";
                continue;
            }
            for(vector<StudentWrapper>::iterator it=cl->students.begin();it!=cl->students.end();++it){
                if((*it).id==sbuf2){
                    cout<<it->toString();
                    cout<<"input the score of the student: (or input q to quit)";
                    cin>>s;
                    if(s=="q") break;
                    try{
                        bool flag=true;
                        for(int i=0;s[i]!='\0';++i){
                            if((s[i]<='z'&&s[i]>='a')||(s[i]<='Z'&&s[i]>='A')){
                                flag=false;
                                break;
                            }
                        }
                        if(!flag) throw A();
                        double sc=0;
                        sc=atof(s.c_str());
                        (*it).setScore(sc);
                    }
                    catch(A){
                        cout<<"Wrong Score!\n";
                        continue;
                            }
                    catch(...){
                        cout<<"Wrong score!\n";
                        continue;
                    }
                }

            }


      }
    }
}

void AppX::printAvgScore()
{
    string sbuf;
    Class *cl;
    double avg;

    while (true) {
        cout << "Please input the class name (or input q to quit): ";
        cin >> sbuf;
        if (sbuf == "q")
            break;

        cl = nullptr;
        for (vector<Class *>::iterator it = classVec.begin();
             it != classVec.end();
             ++it) {
            if ((*it)->name == sbuf) {
                cl = *it;
                break;
            }
        }
        if (cl == nullptr) {
            cout << "No match class!\n";
            continue;
        }

        avg = cl->getAvgScore();
        cout << "The average score is: " <<fixed<< setprecision(2) << avg << endl;
    }
}

void AppX::printGpa()
{
    // TODO: implement printGpa.
    // Hint: Take a look at printAvgScore().
    string sbuf;
    double s=0;
    double p=0,p1=0;
    double sump=0,sums=0,sump1=0;
    double gpa=0;
    Student *st;
    while(true){
        cout<<"input the id of the student(or input q to quit):";
        cin>>sbuf;
        if(sbuf=="q") break;
        st=nullptr;
        for(vector<Student*>::iterator it=studentVec.begin();it!=studentVec.end();++it){
            if((*it)->id==sbuf){
                cout<<(*it)->toString();
                st=*it;
                break;
            }


        }
        if(st==nullptr){
            cout<<"No match student!\n";
            continue;
        }

        if(st->getdegree()==undergraduate){
            for(vector<Class*>::iterator it=classVec.begin();it!=classVec.end();++it){
                try{StudentWrapper sw=(*it)->getStudentWrapper(sbuf);}
                catch(...){continue;}
                StudentWrapper sw=(*it)->getStudentWrapper(sbuf);
                s=sw.getScore();
                p=(*it)->point;
                sump+=p;
                sums=sums+(s/20.0)*p;
            }
            gpa=sums/sump;
            sums=0;
            sump=0;
            cout << "GPA = " <<fixed<< setprecision(2) << gpa <<endl;
        }
        if(st->getdegree()==graduate){
            for(vector<Class*>::iterator it=classVec.begin();it!=classVec.end();++it){
                try{StudentWrapper sw=(*it)->getStudentWrapper(sbuf);}
                catch(...){continue;}
                StudentWrapper sw=(*it)->getStudentWrapper(sbuf);
                s=sw.getScore();
                p1=(*it)->point;
                sump1+=p1;
                switch(int(s)/10){
                case 10:p=4;break;
                case 9:p=4;break;
                case 8:p=3.5;break;
                case 7:p=3;break;
                case 6:p=2.5;break;
                default:p=2;
                }
                sump+=p*p1;
            }
            gpa=sump/sump1;
            sump=0;
            sump1=0;
            cout << "GPA = " <<fixed<< setprecision(2) << gpa <<endl;
        }
    }
}

int AppX::run()
{
    char cmd;
    while (true) {
        cout << "Command menu:\n"
            << "\ti: Input score\n"
            << "\ta: Compute average score of a class\n"
            << "\tg: Compute grade of a student\n"
            << "\tq: Quit\n"
            << "Please input the command: ";
        cin >> cmd;
        if (cmd == 'i') {
            inputScore();
        } else if (cmd == 'a') {
            printAvgScore();
        } else if (cmd == 'g') {
            printGpa();
        } else if (cmd == 'q') {
            break;
        } else {
            cout << "Invalid command!\n" << endl;
        }
    }
    return 0;
}

int main()
{
    AppX app;
    return app.run();
}
