#ifndef CUCKOOHASH_H
#define CUCKOOHASH_H

struct set
{
    int key;
    int value;
};

class cuckoohash
{
private:
    int size;
public:
    set *h0;
    set *h1;
    cuckoohash();
    ~cuckoohash();
    int H0(int key);
    int H1(int key);
    void Insert(int key,int value);
    void Kick1(int key,int value);
    void Kick2(int key,int value);
    void Delete(int key);
    void Lookup(int key);
    void resize();
    void rehash(int key,int value);
};

#endif // CUCKOOHASH_H
