#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>

#include "Container.h"
#include "HashTable.h"
#include "SkipList.h"

using namespace std;

#define RED         "\033[31m"
#define GREEN       "\033[32m"
#define WHITE       "\033[m"
#define TEMP_FILE   "temp"
#define TEST_NUM    4

string grade_inputs[TEST_NUM] = {
        "hashtable_input1",
        "hashtable_input2",
        "skiplist_input1",
        "skiplist_input2"
};
string grade_outputs[TEST_NUM] = {
        "hashtable_output1",
        "hashtable_output2",
        "skiplist_output1",
        "skiplist_output2"
};
string grade_tag[TEST_NUM] = {
        " Hash_1:  ",
        " Hash_2:  ",
        " Skip_1:  ",
        " Skip_2:  "
};

HashTable hashtable;
SkipList skiplist;
int grade;

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
        else if (op == "Delete")
        {
            int key = atoi(param.c_str());
            container->Delete(key);
        }
    }
    container->Display();
    inputData.close();
}

void grade_test(string input_file_path) 
{
    fstream input, output, temp;
    int num;

    string input_file = input_file_path;
    input_file = input_file.substr(input_file.find_last_of('/') + 1);
    for (num = 0; num < TEST_NUM; num++) {
        if (input_file == grade_inputs[num]) break;
        if (num == 3) {
            cout << "[error]: file " << input_file << " is not a grade input file." << endl;
            return;
        }
    }

    input.open(input_file_path, ios::in);
    if(!input) {
        cout << "[error]: file " << input_file_path << " not found." << endl;
        input.close();
        return;
    }
    input.close();
    output.open("./output/" + grade_outputs[num], ios::in);
    if(!output) {
        cout << "[error]: answer file " << grade_outputs[num] << " not found." << endl;
        output.close();
        return;
    }

    cout << grade_tag[num];
    temp.open(TEMP_FILE, ios::out);
    streambuf *backup = cout.rdbuf();
    cout.rdbuf(temp.rdbuf());

    if (num < TEST_NUM / 2) {
        HashTable hashtable_temp;
        build_container(&hashtable_temp, input_file_path);
    }
    else {
        SkipList skiplist_temp;
        build_container(&skiplist_temp, input_file_path);
    }
    temp.close();
    cout.rdbuf(backup);

    string line_stu,line_ans;
    int line_num = 1;
    bool pass = true;
    temp.open(TEMP_FILE, ios::in);
    while(!output.eof()) {
        getline(output, line_ans);
        getline(temp, line_stu);
        if (line_ans.length() == 0 || line_ans == line_stu) {line_num++; continue;}
        cout << RED << "FAIL" << WHITE << endl;
        cout << "   in line " << line_num << " of " << grade_outputs[num] << ":" << endl;
        cout << "   answer is \t : " << line_ans << endl;
        cout << "   your output is: " << line_stu << endl;
        pass = false;
        break;
    }

    if(pass) {
        cout << GREEN << "OK" << WHITE << endl;
        grade += 25;
    }
    temp.close();
    output.close();

    remove(TEMP_FILE);
}

int main(int argc, char *argv[]) {
    if (argc != 2 && argc != 3) {
        cout << "[usage]: ./main options [input_file_path]" << endl;
        return 0;
    }
    if ((*argv[1] == 'h' || *argv[1] == 's') && argc != 3) {
        cout << "[usage]: ./main h(or s) input_file_path" << endl;
        return 0;
    }    

    switch(*argv[1]) {
        case 'h':
            build_container(&hashtable, argv[2]);
            break;
        case 's':
            build_container(&skiplist, argv[2]);
            break;
        case 'g':
            grade = 0;
            cout << endl << "<<<<<<<< grade test >>>>>>>>" << endl;
            for (int i = 0; i < TEST_NUM; i++) {
                grade_test("./input/" + grade_inputs[i]);
            }
            cout << " grade: " << grade << "/100" << endl;
            cout << "<<<<<<<< grade test over >>>>>>>>" << endl;
            break;
        default:
            cout << "[error]: option not support, use h(hashtable), s(skiplist) or g(grade)." << endl;
    }

    return 0;
}