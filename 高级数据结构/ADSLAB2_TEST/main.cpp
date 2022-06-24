#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <string.h>
#include <signal.h>

#include "FixedSP.h"

using namespace std;

#define RED "\033[31m"
#define GREEN "\033[32m"
#define WHITE "\033[m"
#define TEMP_FILE "temp"
#define TEST_NUM 4

string grade_inputs[TEST_NUM] = {
    "fsp_input1",
    "fsp_input2",
    "fsp_input3",
    "fsp_input4"};
string grade_outputs[TEST_NUM] = {
    "fsp_output1",
    "fsp_output2",
    "fsp_output3",
    "fsp_output4"};
int grade_scores[TEST_NUM] = {
    25,
    25,
    25,
    25
};
string grade_tag[TEST_NUM] = {
    " TEST1:  ",
    " TEST2:  ",
    " TEST3:  ",
    " TEST4:  "};

int grade;
int test_number = 0;
streambuf *backup;
fstream temp;

void do_test(string input_file_path)
{
    ifstream inputData;

    inputData.open(input_file_path, ios::in);
    if (!inputData)
    {
        cout << "[error]: file " << input_file_path << " not found." << endl;
        inputData.close();
        return;
    }

    string str;
    inputData >> str;
    int node_num = atoi(str.c_str());

    vector<vector<int>> matrix(node_num, vector<int>(node_num));

    for(int i = 0; i < node_num; ++i){
        for(int j = 0; j < node_num; ++j){
            inputData >> str;
            matrix[i][j] = str == "@" ? INF : atoi(str.c_str());
        }
    }

    FixedSP fsp(matrix);//初始化邻接矩阵

    while (inputData >> str)
    {
        int source = atoi(str.c_str());//获取起点(终点)
        vector<int> intermediates;
        while(true){
            inputData >> str;
            if(str == "$"){
                break;
            }
            intermediates.emplace_back(atoi(str.c_str()));//获取必经中间节点集合
        }
        vector<int> path = fsp.getFixedPointShortestPath(source, intermediates);
        int dis = 0;
        for(int i = 0; i < path.size(); ++i){
            dis += matrix[path[i]][path[(i + 1) % path.size()]];
        }
        if(dis == 0){
            dis = INF;
        }
        cout << dis << endl;
        //cout<<"1"<<endl;
    }
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
        #ifdef __linux__
            cout << RED << "FAIL" << WHITE << endl;
        #else
            cout << "FAIL" << endl;
        #endif
        cout << "   in line " << line_num << " of " << grade_outputs[num] << ":" << endl;
        cout << "   answer is \t : " << line_ans << endl;
        cout << "   your answer is: " << line_stu << endl;
        pass = false;
        break;
    }

    if (pass)
    {
        #ifdef __linux__
            cout << GREEN << "OK" << WHITE << endl;
        #else
            cout << "OK" << endl;
        #endif
        grade += grade_scores[num];
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
    /*if (argc != 2 && argc != 3)
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

        //grade_test("./input/" + grade_inputs[3]);

        cout << " grade: " << grade << "/100" << endl;
        cout << "<<<<<<<< grade test over >>>>>>>>" << endl;
        break;
    default:
        cout << "[error]: option not support, use d(debug), or g(grade)." << endl;
    }*/
    do_test("./input/1.txt");
    return 0;

}
