#include "Class.h"
#include <string>
#include<iostream>
#include "Student.h"
using namespace std;
void Class::addStudent(Student &st)
{
    StudentWrapper sw(st.id, st);
    students.push_back(sw);
}

StudentWrapper &Class::getStudentWrapper(const std::string &studentId)
{
    for (std::vector<StudentWrapper>::iterator it = students.begin();
         it != students.end();
         ++it) {
        if (it->id == studentId)
            return *it;
    }
    throw "No match student!";
}

double Class::getAvgScore()
{
    // TODO: implement getAvgScore.
    int num=0;
    double sum=0.0;
    for (std::vector<StudentWrapper>::iterator it = students.begin();
         it != students.end();
         ++it){
        sum+=(it->getScore());
        num++;
    }
    return sum/num;
}
