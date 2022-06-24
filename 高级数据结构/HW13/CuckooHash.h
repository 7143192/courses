#ifndef CUCKOOHASH_H
#define CUCKOOHASH_H
class CuckooHash
{
private:
    int* HashTable;
    int max_len;//记录每一个hash表的最大容量
    int max_loop;
public:
    CuckooHash(int size);
    int Hash1(int key);
    int Hash2(int key);
    void Insert(int key);
    void Insert_Parallel(int key);
    bool Search(int key);
    void Clear();//清空hashtable
};

#endif // CUCKOOHASH_H
