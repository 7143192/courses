#ifndef CLASS_H_
#define CLASS_H_

#include "Student.h"

#include <string>
#include <vector>
class Class {
public:
    std::vector<StudentWrapper> students;
    const std::string name;
    const int point;
    Class(const std::string &name, const int point)
        : name(name), point(point) { }

    void addStudent(Student &st);
    StudentWrapper &getStudentWrapper(const std::string &studentId);
    double getAvgScore();
};

#endif // CLASS_H_
