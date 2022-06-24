#include "Test.h"
SimpleTest::SimpleTest()
{

}

void SimpleTest::TestCase1()//测试1：两个均为空
{
    Simple TestCase;
    QVERIFY(TestCase.Check(TestCase.box[0],TestCase.box[1]) == false);
}

void SimpleTest::TestCase2()//测试2：有一个为空
{
    Simple TestCase;
    QVERIFY(TestCase.Check(TestCase.box[2],TestCase.box[3]) == false);
}

void SimpleTest::TestCase3()//测试3：两个箱子均不为空，但是种类不同
{
    Simple TestCase;
    QVERIFY(TestCase.Check(TestCase.box[4],TestCase.box[5]) == false);
}

void SimpleTest::TestCase4()//测试4：两个箱子类型相同但是坐标重合
{
    Simple TestCase;
    QVERIFY(TestCase.Check(TestCase.box[6],TestCase.box[7]) == false);
}

void SimpleTest::TestCase5()//测试5：两个箱子之间的竖线,8,9能画出，10,11不能画出
{
    Simple TestCase;
    stack<Point> points;
    Point p1(125,125);
    Point p2(125,275);
    points.push(p1);
    points.push(p2);
    QVERIFY(TestCase.DirectLink(TestCase.box[8],TestCase.box[9]) == true
            &&TestCase.CheckIsEqual(TestCase.Points,points) == true
            &&TestCase.DirectLink(TestCase.box[10],TestCase.box[11]) == false);
}

void SimpleTest::TestCase6()//测试6：两个箱子之间的横直线，13,14能画出，15,16不能
{
    Simple TestCase;
    stack<Point> points;
    Point p1(325,75);
    Point p2(475,75);
    points.push(p1);
    points.push(p2);
    QVERIFY(TestCase.DirectLink(TestCase.box[13],TestCase.box[14]) == true
            &&TestCase.CheckIsEqual(TestCase.Points,points) == true
            &&TestCase.DirectLink(TestCase.box[15],TestCase.box[16]) == false);
}

void SimpleTest::TestCase7()//测试7：一个拐点的直线能成功连接的几种情况
{
    Simple TestCase;
    stack<Point> points1,points2,points3;
    Point p1(625,175),p2(625,75),p3(575,75);
    points1.push(p1);
    points1.push(p2);
    points1.push(p3);
    Point p4(675,175),p5(725,175),p6(725,75);
    points2.push(p4);
    points2.push(p5);
    points2.push(p6);
    Point p7(825,175),p8(775,175),p9(775,75);
    points3.push(p7);
    points3.push(p8);
    points3.push(p9);
    QVERIFY(TestCase.OneCornerLink(TestCase.box[18],TestCase.box[19]) == true
            &&TestCase.CheckIsEqual(TestCase.Points,points1) == true//情况一：18,19直接以第一种情况连接
            &&TestCase.OneCornerLink(TestCase.box[20],TestCase.box[21]) == true
            &&TestCase.CheckIsEqual(TestCase.Points,points2) == true//情况二：20,21以第二种情况连接
            &&TestCase.OneCornerLink(TestCase.box[23],TestCase.box[24]) == true
            &&TestCase.CheckIsEqual(TestCase.Points,points3) == true);//情况三：23,24满足第一种但无法直接连
}                                                                     //只能以第二种方式连接

void SimpleTest::TestCase8()//测试8：无法通过一个拐点的直线来连接的几种情况
{
    Simple TestCase;
    QVERIFY(TestCase.OneCornerLink(TestCase.box[26],TestCase.box[27]) == false//情况1:26,27连接时中间箱子位置均被占用
            &&TestCase.OneCornerLink(TestCase.box[30],TestCase.box[31]) == false//情况2:30,31连接时一个中间位置被占用，另一个未被占用但是无法directlink
            &&TestCase.OneCornerLink(TestCase.box[34],TestCase.box[35]) == false);//情况3:两个中间位置均为被占用，但是两条路径均不能directlink
}

void SimpleTest::TestCase9()//测试9：先画竖线再画横线再画竖线的两个拐点的连线可以被画出的情况
{
    Simple TestCase;
    stack<Point> points1,points2,points3,points4,points5;
    Point p1(875,25),p2(875,125),p3(975,125),p4(975,75);
    points1.push(p1);
    points1.push(p2);
    points1.push(p3);
    points1.push(p4);
    Point p5(875,975),p6(875,475),p7(975,475),p8(975,925);
    points2.push(p5);
    points2.push(p6);
    points2.push(p7);
    points2.push(p8);
    Point p9(875,225),p10(875,125),p11(975,125),p12(975,275);
    points3.push(p9);
    points3.push(p10);
    points3.push(p11);
    points3.push(p12);
    Point p13(875,275),p14(875,325),p15(975,325),p16(975,375);
    points4.push(p13);
    points4.push(p14);
    points4.push(p15);
    points4.push(p16);
    Point p17(875,375),p18(875,475),p19(975,475),p20(975,425);
    points5.push(p17);
    points5.push(p18);
    points5.push(p19);
    points5.push(p20);
    QVERIFY(TestCase.TwoCornerLink(TestCase.box[38],TestCase.box[39]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points1) == true//情况一：上边界情况，只能向下画
            &&TestCase.TwoCornerLink(TestCase.box[42],TestCase.box[43]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points3) == true//情况二：正常情况1，向上滑
            &&TestCase.TwoCornerLink(TestCase.box[44],TestCase.box[45]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points4) == true//情况三：正常情况2，在中间画
            &&TestCase.TwoCornerLink(TestCase.box[46],TestCase.box[47]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points5) == true);//情况四：正常情况3，向下画
}

void SimpleTest::TestCase10()//测试10：先画横线再画竖线再画横线的两个拐点的连线可以被画出来的情况
{
    Simple TestCase;
    stack<Point> points1,points2,points3,points4;
    Point p1(25,525),p2(125,525),p3(125,625),p4(75,625);
    points1.push(p1);
    points1.push(p2);
    points1.push(p3);
    points1.push(p4);
    Point p5(325,625),p6(125,625),p7(125,525),p8(375,525);
    points2.push(p5);
    points2.push(p6);
    points2.push(p7);
    points2.push(p8);
    Point p9(375,625),p10(425,625),p11(425,525),p12(475,525);
    points3.push(p9);
    points3.push(p10);
    points3.push(p11);
    points3.push(p12);
    Point p13(475,625),p14(575,625),p15(575,525),p16(525,525);
    points4.push(p13);
    points4.push(p14);
    points4.push(p15);
    points4.push(p16);
    QVERIFY(TestCase.TwoCornerLink(TestCase.box[48],TestCase.box[49]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points1) == true//情况一：左边界情况，只能向右画
            &&TestCase.TwoCornerLink(TestCase.box[50],TestCase.box[51]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points2) == true//情况二：正常情况1，向左画
            &&TestCase.TwoCornerLink(TestCase.box[52],TestCase.box[53]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points3) == true//情况三：正常情况2，在中间画
            &&TestCase.TwoCornerLink(TestCase.box[54],TestCase.box[55]) == true
            && TestCase.CheckIsEqual(TestCase.Points,points4) == true);//情况四：正常情况3，向右画
}

void SimpleTest::TestCase11()//测试11：二拐点连线失败的几种情况
{
    Simple TestCase;
    QVERIFY(TestCase.TwoCornerLink(TestCase.box[62],TestCase.box[63]) == false//情况1：先画输线的情况失败
            &&TestCase.TwoCornerLink(TestCase.box[68],TestCase.box[69]) == false//情况2：先画横线的情况失败
            );
}

QTEST_MAIN(SimpleTest)

