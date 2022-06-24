#ifndef SIMPLETEST_H
#define SIMPLETEST_H
#include <QtTest/QtTest>

class SimpleTest : public QObject
{
    Q_OBJECT
private slots:
    void case1_testcase();
    void case2_testcase();
public:
    SimpleTest();
};

#endif // SIMPLETEST_H
