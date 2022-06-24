#include <iostream>
#include <vector>
#include <thread>
#include <fstream>
#include <mutex>
#include <windows.h>
using namespace std;
//串行版本
mutex mtx;
void MergeArr(int* a, int begin1, int end1, int begin2, int end2, int* tmp)
{
    int left = begin1, right = end2;
    int index = begin1;
    while (begin1 <= end1 && begin2 <= end2){
        if (a[begin1] < a[begin2]) tmp[index++] = a[begin1++];
        else tmp[index++] = a[begin2++];
    }
    while (begin1 <= end1) tmp[index++] = a[begin1++];
    while (begin2 <= end2) tmp[index++] = a[begin2++];
    for (int i = left; i <= right; ++i)
        a[i] = tmp[i];
}

void MergeSort(int*& a, int start, int end)
{
    double total1 = 0;
    LARGE_INTEGER t1,t2,tc;
    QueryPerformanceFrequency(&tc);
    QueryPerformanceCounter(&t1);
    int n = (end - start + 1);
    int* tmp = new int[n];
    int gap = 1; //每组元素个数
    while (gap < n){
        for (int i = 0; i < n; i += 2 * gap){
            int begin1 = i, end1 = i + gap - 1;
            int begin2 = i + gap, end2 = i + 2 * gap - 1;
            if (begin2 >= n) break;
            if (end2 >= n) end2 = n - 1;
            MergeArr(a, begin1, end1, begin2, end2, tmp);
        }
        gap *= 2;
    }
    delete []tmp;
    QueryPerformanceCounter(&t2);
    total1 += (double)(t2.QuadPart-t1.QuadPart);
    cout<<"sort time:"<<total1<<endl;
}

/*void mergearray(int a[], int first, int mid, int last)
{
    int *temp = new int[last - first + 1];
    int i = first, j = mid + 1,k =0;
    while(i <= mid && j <= last)  {
        if(a[i] <= a[j]) temp[k++] = a[i++];
        else temp[k++] = a[j++];
    }
    while(i<= mid) temp[k++] = a[i++];

    while(j <= last) temp[k++] = a[j++];
    for(i=0; i < k; i++) a[first+i] = temp[i];
    delete []temp;
}

void mergesort(int a[], int first, int last)
{
    if (first < last){
        int mid = (first + last) / 2;
        mergesort(a, first, mid);    //左边有序
        mergesort(a, mid + 1, last); //右边有序
        mergearray(a, first, mid, last); //再将二个有序数列合并
    }
}*/

void parallel_mergearray(int a[], int left, int right, int threadNum)//这还是串行的多路merge版本
{
    double total1 = 0;
    LARGE_INTEGER t11,t22,tc;
    QueryPerformanceFrequency(&tc);
    QueryPerformanceCounter(&t11);
    int size = right - left + 1;
    int block_size = size / threadNum;
    vector<int*> blocks;
    vector<int> pos;
    vector<int> min_pos;
    for(int i = 0;i < threadNum;++i){
        int* block = new int[block_size];
        int start = left + i * block_size;
        for(int j = 0;j < block_size;++j){
            block[j] = a[start + j];
        }
        blocks.push_back(block);//记录每一个block的数组对应的指针
        pos.push_back(0);//每一个block指针的初始位置记录为0
    }
    int min = INT_MAX;
    int *temp = new int[size];
    int k = 0;
    while(true){
        bool updated = false;
        for(int i = 0;i < threadNum;++i){
            if(pos[i] == block_size) continue;
            updated = true;
            if(blocks[i][pos[i]] == min){
                min_pos.push_back(i);
            }
            if(blocks[i][pos[i]] < min){
                min = blocks[i][pos[i]];
                min_pos.clear();
                min_pos.push_back(i);
            }
        }
        //cout<<min<<endl;
        if(!updated) break;//没有新的更新，说明，全部block都merge完成
        for(uint32_t i = 0;i < min_pos.size();++i){
            pos[min_pos[i]]++;//更新被选中的含有最小值的block指针的位置
            temp[k++] = min;//记录当前选择出来的最小值(注意可能出现有相同最小值的情况)
        }
        min = INT_MAX;
    }
    for(int i = 0;i < size;++i) a[i] = temp[i];//更新原来的数组
    delete []temp;//清空临时数组
    QueryPerformanceCounter(&t22);
    total1 += (double)(t22.QuadPart-t11.QuadPart);
    cout<<"merge time:"<<total1<<endl;
    return ;
}

void parallel_mergesort(int a[], int left, int right, int threadNum)
{
    int size = right - left + 1;
    int block_size = size / threadNum;
    std::vector<std::thread> threads;
    int block_start = left;
    for(int i = 0;i < threadNum;++i){
        //mtx.lock();
        int block_end = block_start + block_size - 1;
        threads.emplace_back(MergeSort, ref(a), block_start, block_end);
        block_start = block_end + 1;
        //mtx.unlock();
    }
    for(size_t i = 0;i < threads.size();++i) threads[i].join();
}

int main()
{
    /*int a[8] = {3, 7, 1, 4, 5, 2, 8, 6};
    parallel_mergesort(a, 0, 7, 4);//这里为了方便，采用线程数和元素个数均为偶数的格式
    //for(int i = 0;i < 8;++i) cout<<a[i]<<" ";
    cout<<endl;
    parallel_mergearray(a, 0, 7, 4);//进行不同block的合并操作
    for(int i = 0;i < 8;++i) cout<<a[i]<<" ";*/
    int a[100];
    int b[500];
    int c[1000];//定义三个随机数数组
    int k = 0, m = 0, n = 0;
    ifstream file("./100.txt");
    string line = "";
    while(getline(file, line)){
        int val = atoi(line.c_str());
        a[k++] = val;
        line = "";
    }
    file.close();
    //parallel_mergesort(a, 0, 99, 16);
    //parallel_mergearray(a, 0, 99, 16);//进行不同block的合并操作
    ifstream file1("./500.txt");
    string line1 = "";
    while(getline(file1, line1)){
        int val = atoi(line1.c_str());
        b[m++] = val;
        line1 = "";
    }
    file1.close();
    //parallel_mergesort(b, 0, 499, 16);
    //parallel_mergearray(b, 0, 499, 16);//进行不同block的合并操作
    ifstream file2("./1000.txt");
    string line2 = "";
    while(getline(file2, line2)){
        int val = atoi(line2.c_str());
        c[n++] = val;
        line2 = "";
    }
    file2.close();
    parallel_mergesort(c, 0, 999, 16);
    parallel_mergearray(c, 0, 999, 16);//进行不同block的合并操作
    return 0;
}
