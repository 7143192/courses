#include "Student.h"
#include <string>
#include <sstream>
#include "Class.h"

std::string Student::toString() const
{
    // TODO: uncomment the following code after implementing class Student.

    std::ostringstream oss;
    oss << "Student Information:"
        << "\n\tid: " << id
        << "\n\tname: " << name
        << "\n\tenrollment year: " << year
        << "\n\tdegree: " << (degree == graduate ? "graduate" : "undergraduate")
        << std::endl;
    return oss.str();

    return "";
}

// TODO: implement functions which are declared in Student.h.
void Student::addclass(Class *c)
{
    try{c->getStudentWrapper(id);}
    catch(...){return ;}
    classes.push_back(c);
}

double Graduate::getgrade()
{
    Student *st;
    std::string n=getname();
    std::string y=getyear();
    st=new Graduate(id,n,y,graduate);
    StudentWrapper *sw=new StudentWrapper(id,*st);
    return sw->getScore();
}

double Undergraduate::getgrade()
{
    Student *st;
    std::string n=getname();
    std::string y=getyear();
    st=new Undergraduate(id,n,y,undergraduate);
    StudentWrapper *sw=new StudentWrapper(id,*st);
    return sw->getScore();
}
