#include "simpletest.h"
#include "simple.h"
SimpleTest::SimpleTest()
{

}

void SimpleTest::case1_testcase(){
    Simple simple;
    QVERIFY(simple.add(1)==2);
}
void SimpleTest::case2_testcase(){
    Simple simple;
    QVERIFY(simple.addError(1)==2);
}

QTEST_MAIN(SimpleTest)
