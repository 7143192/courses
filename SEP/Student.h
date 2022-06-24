#ifndef STUDENT_H_
#define STUDENT_H_

#include <string>
#include <vector>

class Class;

enum Degree {
    undergraduate,
    graduate
};

class Student {
    // TODO: implement class Student.
private:
    std::string name;
    std::string year;

protected:
    Degree degree;
    std::vector<Class*> classes;
public:
    std::string id;
    std::string toString() const;
    void addclass(Class *c);
    virtual double getgrade()=0;
    std::string getname(){return name;}
    std::string getyear(){return year;}
    std::string getid(){return id;}
    Degree getdegree(){return degree;}
    Student(std::string &i,std::string &n,std::string &y){
        id=i;
        name=n;
        year=y;
    }
};

// TODO: implement class Graduate.
class Graduate:public Student
{ 
public:

    Graduate(std::string &i,std::string &n,std::string &y,Degree graduate):Student(i,n,y){degree=graduate;}
    double getgrade();
    Degree getdegree(){return graduate;}
};

// TODO: implement class Undergraduate.
class Undergraduate:public Student
{
public:

    Undergraduate(std::string &i,std::string &n,std::string &y,Degree undergraduate):Student(i,n,y){degree=undergraduate;}
    double getgrade();
    Degree getdegree(){return undergraduate;}
};
class StudentWrapper {
private:
    Student &student;
    double score = 0.0;
public:
    std::string id;
    // TODO: fix error
    StudentWrapper(const std::string &id, Student &student):student(student) {
        this->id = id;
        this->student = student;
    }

    void setScore(double score)
    {
        if (score < 0 || score > 100)
            throw "Invalid Score!";
        this->score = score;
    }

    double getScore()
    {
        return this->score;
    }

    std::string toString() const
    {
        return student.toString();
    }

    Degree getdegree(){
        return student.getdegree();
    }
};

#endif // STUDENT_H_
