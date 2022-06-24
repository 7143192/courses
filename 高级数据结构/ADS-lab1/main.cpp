#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>
#include <signal.h>

#include "ScapegoatTree.h"

using namespace std;

#define RED "\033[31m"
#define GREEN "\033[32m"
#define WHITE "\033[m"
#define TEMP_FILE "temp"
#define TEST_NUM 4

string grade_inputs[TEST_NUM] = {
	"sgt_input1",
	"sgt_input2",
	"sgt_input3",
    "sgt_input4"
	};
string grade_outputs[TEST_NUM] = {
	"sgt_output1",
	"sgt_output2",
	"sgt_output3",
    "sgt_output4"
	};
string grade_tag[TEST_NUM] = {
	" TEST1:  ",
	" TEST2:  ",
	" TEST3:  ",
    " TEST4:  "
	};

int grade;
int test_number = 0;
streambuf *backup;
fstream temp;

void do_test(string input_file_path)
{
    ScapegoatTree sgt;
    ifstream inputData;
    inputData.open(input_file_path, ios::in);
    if (!inputData)
    {
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
        int key = atoi(param.c_str());
        if (op == "Insert")
            sgt.Insert(key);
        else if (op == "Search")
            sgt.Search(key);
        else if (op == "Delete")
            sgt.Delete(key);
    }
    
    cout << sgt.GetRebalanceTimes() << endl;
    inputData.close();
}

void grade_test(string input_file_path)
{
    fstream input, output;
    int num;

    string input_file = input_file_path;
    input_file = input_file.substr(input_file.find_last_of('/') + 1);
    for (num = 0; num < TEST_NUM; num++)
    {
        if (input_file == grade_inputs[num])
            break;
        if (num == TEST_NUM - 1)
        {
            cout << "[error]: file " << input_file << " is not a grade input file." << endl;
            return;
        }
    }

    input.open(input_file_path, ios::in);
    if (!input)
    {
        cout << "[error]: file " << input_file_path << " not found." << endl;
        input.close();
        return;
    }
    input.close();
    output.open("./output/" + grade_outputs[num], ios::in);
    if (!output)
    {
        cout << "[error]: answer file " << grade_outputs[num] << " not found." << endl;
        output.close();
        return;
    }

    cout << grade_tag[num];
    temp.open(TEMP_FILE, ios::out);
    backup = cout.rdbuf();
    cout.rdbuf(temp.rdbuf());

    do_test(input_file_path);
    temp.close();
    cout.rdbuf(backup);

    string line_stu, line_ans;
    int line_num = 1;
    bool pass = true;
    temp.open(TEMP_FILE, ios::in);
    while (!output.eof())
    {
        getline(output, line_ans);
        getline(temp, line_stu);
        if (line_ans.length() == 0 || line_ans == line_stu)
        {
            line_num++;
            continue;
        }
        cout << RED << "FAIL" << WHITE << endl;
        cout << "   in line " << line_num << " of " << grade_outputs[num] << ":" << endl;
        cout << "   answer is \t : " << line_ans << endl;
        cout << "   your output is: " << line_stu << endl;
        pass = false;
        break;
    }

    if (pass)
    {
        cout << GREEN << "OK" << WHITE << endl;
        grade += 25;
    }
    temp.close();
    output.close();

    remove(TEMP_FILE);
}

void sig_handle(int sig)
{
    temp.close();
    cout.rdbuf(backup);
    test_number++;
    for (; test_number < TEST_NUM; test_number++)
    {
        grade_test("./input/" + grade_inputs[test_number]);
    }
    cout << " grade: " << grade << "/100" << endl;
    cout << "<<<<<<<< grade test over >>>>>>>>" << endl;
    remove(TEMP_FILE);
    exit(0);
}

int main(int argc, char *argv[])
{
    signal(SIGSEGV, sig_handle);
    if (argc != 2 && argc != 3)
    {
        cout << "[usage]: ./main options [input_file_path]" << endl;
        return 0;
    }

    switch (*argv[1])
    {
    case 'd':
        do_test(argv[2]);
        break;
    case 'g':
        grade = 0;
        cout << endl
             << "<<<<<<<< grade test >>>>>>>>" << endl;
        for (; test_number < TEST_NUM; test_number++)
        {
            grade_test("./input/" + grade_inputs[test_number]);
        }
        cout << " grade: " << grade << "/100" << endl;
        cout << "<<<<<<<< grade test over >>>>>>>>" << endl;
        break;
    default:
        cout << "[error]: option not support, use d(debug), or g(grade)." << endl;
    }

    return 0;
}
