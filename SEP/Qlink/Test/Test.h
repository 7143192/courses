#ifndef TEST_H
#define TEST_H
#include <QtTest>
#include "simple.h"
class SimpleTest:public QObject
{
    Q_OBJECT
private:
private slots:
    void TestCase1();
    void TestCase2();
    void TestCase3();
    void TestCase4();
    void TestCase5();
    void TestCase6();
    void TestCase7();
    void TestCase8();
    void TestCase9();
    void TestCase10();
    void TestCase11();
public:
    SimpleTest();
};
#endif // TEST_H
