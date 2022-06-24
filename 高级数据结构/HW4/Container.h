#pragma once
class Container
{
public:
    Container() {}
    virtual void Insert(int key, int value) = 0;
    virtual int Search(int key) = 0;
};
