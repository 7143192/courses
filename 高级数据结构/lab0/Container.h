#pragma once
#include <ctime> //用于测试
class Container
{
public:
    //以下几个clock_t变量是用于测试的
    /*clock_t InsertTimes = 0;
    clock_t SearchTimes = 0;
    clock_t DeleteTimes = 0;
    clock_t ScopeTimes = 0;*/
    Container() {}
    virtual void Insert(int key, int value) = 0;
    virtual void Search(int key) = 0;
    virtual void Delete(int key) = 0;
    virtual void Display() = 0;
    virtual void SearchScope(int low, int high) = 0;
};
