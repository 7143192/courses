#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>

#include "Container.h"
#include "SkipList.h"

using namespace std;
SkipList skiplist;

string TestFiles[] = {
    "./HW2_input/skiplist_create_input10",
    "./HW2_input/skiplist_create_input50",
    "./HW2_input/skiplist_create_input100",
    "./HW2_input/skiplist_create_input200",
    "./HW2_input/skiplist_create_input500",
    "./HW2_input/skiplist_create_input1000"
};


int type = 1;//表示当前输入的文件的元素个数的类型

void build_container(Container *container, string input_file_path)
{
    ifstream inputData;
    inputData.open(input_file_path, ios::in);
    if(!inputData) {
        cout << "[error]: file " << input_file_path << " not found." << endl;
        inputData.close();
        return;
    }

    string line;
    while (inputData >> line)
    {
        int bracketPos = line.find('(');
        string op = line.substr(0, bracketPos);
        string param = line.substr(bracketPos + 1, line.size() - bracketPos - 2);
        if (op == "Insert")
        {
            int commaPos = param.find(',');
            int key = atoi(param.substr(0, commaPos).c_str());
            int val = atoi(param.substr(commaPos + 1).c_str());
            container->Insert(key, val);
        }
        else if (op == "Search")
        {
            int key = atoi(param.c_str());
            container->Search(key);
        }
    }
    inputData.close();
}

int main() {
    SkipList skiplist;
    build_container(&skiplist, TestFiles[type]);
    skiplist.SearchTimes();
    return 0;
}
