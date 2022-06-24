#include <vector>
#include <thread>
using namespace std;
template<class Iterator, class Function>
Function for_each(Iterator first, Iterator last, Function fn) {
 while (first!=last) {
 fn (*first);
 ++first;
 }
 return move(fn);
}//串行版本

template<class Iterator, class Function, typename T>
Function parallel_for_each(Iterator first, Iterator last, Function fn,
                           T N)
{
    //std::vector<std::thread> threads(N);//创建线程池
    long len = std::distance(first, last);
    unsigned long piece_size = len / (N - 1);//计算每一部分要计算的大小
    for(long i = 0;i < (N - 1);++i){//只是计数到N-1是因为要考虑到最后一部分可能不会被均分的情况(即不够一个block_size)
        Iterator piece_end = first;
        piece_end += piece_size;//计算每一部分结束的容器位置
        //threads[i] = std::thread(for_each(first, piece_end, fn));
        std::thread t(for_each, first, last, fn);
        t.detach();
        //给每个线程分配自己那一部分的任务
        first = piece_end;
    }
    for_each(first, last, fn);//处理余下的部分
}
