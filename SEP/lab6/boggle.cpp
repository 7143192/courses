#include<iostream>
#include<cstring>
#include<algorithm>
#include "lexicon.h"
using namespace std;

int k = 0;                                      //记录玩家已经保存的单词的个数

void FindWords(string s, char **board,int **&check,string *&words,Lexicon &lex,int x,int y,int N,int &l);

int ScoreCount(string &s);
int main()
{
    int N = 0;                                      //记录地图最大宽度
    cin >> N;
    char **Board = new char*[N];                    //起始地图
    string *FoundedWords = new string[127415];      //记录已经玩家已经找到的单词
    string *ComputerWords = new string[127415];     //用于记录电脑存储的所有单词
    int *CheckedTimes = new int[127415];            //用于记录每个电脑找到的单词被查找的次数
    int **CheckIsChosen = new int*[N];              //用于检测某位置是否被选中
    int Score = 0;                                  //记录玩家当前的分数
    int ComputerScore = 0;                          //用于记录电脑的分数
    char ch = 0;
    string ch1;
    string q;
    int l = 0;                                      //记录电脑存储的单词长度
    bool f1 = false;
    bool f2 = false;                                //用于判断玩家单词是否存在于磁盘中
    string Quest;                                   //记录玩家当前要查询的单词
    Lexicon lex("EnglishWords.txt");
    for(int i = 0;i < 127415;++i) CheckedTimes[i] = 0;
    for(int i = 0;i < N;++i){
        CheckIsChosen[i] = new int[N];
        for(int j = 0;j < N;++j) CheckIsChosen[i][j] = 0;
    }
    for(int i = 0;i < N;++i){
        Board[i] = new char[N];
        for(int j = 0;j < N;++j){
            cin >> ch;
            if(ch >= 'a' && ch <= 'z'){
                ch = ch - 'a' + 'A';
            }
            Board[i][j] = ch;
        }
    }                                               //输入初始地图，之后开始游戏。
    string s = "";
    for(int i = 0;i < N;++i){
        for(int j = 0;j < N;++j){
            string s = "";
            FindWords(s,Board,CheckIsChosen,ComputerWords,lex,i,j,N,l);
        }
    }                                              //递归查找所有合法的单词
    sort(ComputerWords,ComputerWords + l);
    while(true){
        for(int i = 0;i < N;++i){
            for(int j = 0;j < N;++j){
                cout << Board[i][j];
            }
            cout << endl;
        }
        cout << "Your Score: " << Score << endl;
        cout << "Your Words: ";
        if(k == 0) cout << endl;
        else{
            for(int i = 0;i < k;++i) cout << FoundedWords[i]<<" ";
            cout << endl;
        }                                           //输出当前状态
        cin >> ch1;
        Quest = ch1;
        if(ch1 == "???") break ;
        int l1 = Quest.length();
        for(int i = 0;i < l1;++i){
            if(Quest[i] >= 'A' && Quest[i] <= 'Z') Quest[i] = Quest[i] - 'A' + 'a';
        }
        if(Quest.length() < 4){
            cout << Quest << " is too short." << endl;
            continue;
        }                                           //长度小于4
        if(!lex.contains(Quest)){
            cout << Quest << " is not a word." << endl;
            continue;
        }                                           //检查是否存在于词表中
        q = Quest;
        int len = q.length();
        for(int i = 0;i < len;++i){
            if(q[i] >= 'a' && q[i] <= 'z') q[i] -= 32;
        }
        f2 = false;
        for(int i = 0;i < l;++i){
            if(ComputerWords[i] == q){
                CheckedTimes[i]++;
                f2 = true;
                break;
            }
        }
        if(!f2){
            cout << Quest << " is not on board." << endl;
            continue;
        }                                           //检查单词是否出现在棋盘上
        for(int i = 0;i < k;++i){
            if(FoundedWords[i] == Quest){
                cout << Quest << " is already found." << endl;
                f1 = true;
                break;
            }
        }
        if(f1){
            f1 = false;
            continue;
        }                                           //检查是否已经被找到过。
        FoundedWords[k++] = Quest;
        Score += ScoreCount(Quest);
    }

    for(int i = 0;i < l;++i){
        if(CheckedTimes[i] != 0) ComputerWords[i] = "";
    }
    for(int i = 0;i < l;++i){
        if(ComputerWords[i] != "") ComputerScore += ScoreCount(ComputerWords[i]);
    }
    cout << "Computer Score: " << ComputerScore << endl;
    cout << "Computer Words: " ;
    for(int i = 0;i < l;++i){
        if(ComputerWords[i] != "") cout << ComputerWords[i] <<" ";
    }
    return 0;
}

void FindWords(string s, char **board,int **&check,string *&words,Lexicon &lex,int x,int y,int N,int &l)
{
    string cur = s + string(1, board[x][y]);
    bool f = false;
    if(cur.length() >= 4 && lex.contains(cur)){
        for(int i = 0;i < l;++i){
            if(words[i] == cur) f = true;
        }
        if(!f) words[l++] = cur;
        bool f1 = false;
        for(int i = -1;i <= 1;++i){
            for(int j = -1;j <= 1;++j){
                if(x + i >= 0 && x + i < N && y + j >= 0 && y + j < N && !(i == 0 && j == 0)){
                        if(check[x + i][y + j] == 0){
                            check[x][y] = 1;
                            FindWords(cur,board,check,words,lex,x + i,y + j,N,l);
                            check[x][y] = 0;
                            f1 = true;
                        }
                }
            }
        }
        if(!f1) return ;
    }
    if(!lex.containsPrefix(s)) return ;
    for(int dx = -1;dx <= 1;++dx){
        for(int dy = -1;dy <= 1;++dy){
            if(x + dx >= 0 && x + dx < N && y + dy >= 0 && y + dy < N && check[x+dx][y+dy] != 1 && !(dx == 0 && dy == 0)){
                check[x][y] = 1;
                FindWords(cur,board,check,words,lex,x + dx,y + dy,N,l);
                check[x][y] = 0;
            }
        }
    }
}

int ScoreCount(string &s)                   //计算当前分数的函数
{
    int l = s.length();
    int res = l - 3;
    return res;
}
