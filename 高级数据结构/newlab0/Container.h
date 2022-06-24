#pragma once
class Container
{
public:
    Container() {}
    virtual void Insert(int key, int value) = 0;
    virtual void Search(int key) = 0;
    virtual void Delete(int key) = 0;
    virtual void Display() = 0;
};