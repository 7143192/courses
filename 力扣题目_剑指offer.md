# 力扣刷题

- [《剑指offer》03](https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)：方法1：使用vector计数，方法2：使用**`unorder_map<int, bool>`**来统计是否重复出现.
- [《剑指offer》04](https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)：利用二维数组的有序递增性质，将整个数组看做**从右上角元素为根的二叉搜索树**，之后操作就类似二叉树的搜索了。
- [《剑指offer》05](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/submissions/)：方法1：用额外一个字符串来记录，源字符串不为空格就直接添加，为空格就加上`'%20'`。方法2：
- [《剑指offer》06](https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)：逆序输出嘛，直接用一个**stack**就行了。
- [《剑指offer》07](https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/)：(此题缴枪)解法参考https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/solution/mian-shi-ti-07-zhong-jian-er-cha-shu-di-gui-fa-qin/。这个答案的关键点就是把前中序遍历的根节点对应起来，并利用**根节点来划分前序遍历对应的左右子树节点**，之后利用**递归**来处理问题。还有一个点，这个答案使用了**map**来记录每一个遍历的点在中序遍历中的下标位置！
- [《剑指offer》09](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)：方法1：暴力法，设两个栈为A，B，入队列就是对A进行入栈，出队列，就是将B中所有元素放入B，并返回top值并pop。方法2：对上述方法进行优化，即不必每次都将A中所有元素放入B，而只在**B为空且A不为空时**进行上述操作。
- [《剑指offer》10-I](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/)：方法1：直接递归，超时了 方法2：采用迭代法：

```cpp
class Solution {
public:
    int fib(int n) {
        if(n == 0) return 0;
        if(n == 1) return 1;
        int i = 2;
        int a = 1;
        int b = 0;
        int ans = 0;
        while(i <= n){
            ans = a + b;
            ans %= tmp;
            i++;
            b = a;
            a = ans;
        }
        return ans;
    }
private:
    int tmp = 1e9 + 7;
};
```

- [《剑指offer》10-II](https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)：`NumofWays(n) <==> fib(n + 1)`

- [《剑指offer》11](https://leetcode.cn/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)：比较容易

- [《剑指offer》12](https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/)：与`SEP-LAB6`类似，`DFS+剪枝`。要注意对每个点进行`DFS`搜索时都是相对独立的，不应该影响其他点的搜索，所以在一个点进行`DFS`之后，**要将标记为已经访问过的点全部变为未访问**。

- [《剑指offer》13](https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)：思路应该是与上一题类似的。但是直接使用上题方法超时了。。。再一次缴枪。。。。看的题解是：https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/solution/mian-shi-ti-13-ji-qi-ren-de-yun-dong-fan-wei-dfs-b/。更正：自己最开始的方法思路是对的，就是在每次遍历四个方向的路径之后，**不能**将标记为已经访问过的点全部变为未访问。

- [《剑指offer》14-I](https://leetcode.cn/problems/jian-sheng-zi-lcof/)：利用**均值不等式**的知识可以知道，**每段长度理论上相等**时才会有最大乘积，同时通过求导可以知道，每一段长度为[e]时最优，因而选取每段长度为**3**。同时要考虑到可能不能整除3，要考虑余数为1或者2的情况。

- [《剑指offer》14-II](https://leetcode.cn/problems/jian-sheng-zi-ii-lcof/)：逻辑与上一题完全一样，就要额外处理一下大结果额越界问题。有一个题解给出了两种方式，分别为[**循环求余数**与**快速幂求余**](https://leetcode.cn/problems/jian-sheng-zi-ii-lcof/solution/mian-shi-ti-14-ii-jian-sheng-zi-iitan-xin-er-fen-f/)。另外还有一题解给出了**递归解法**如下：

  ```c++
  class Solution {
      public int cuttingRope(int n) {
          return n <= 3 ? n-1 : (int)process(n);
      }
      public long process(long n){
              return n > 4 ? (process(n-3)*3)%1000000007 : n;//保证了每次-3之后如果不能再继续递归一定是1或者2或者0
      }
  }
  ```

- [《剑指offer》15](https://leetcode.cn/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)：`ICS`题目。

- [《剑指offer》16](https://leetcode.cn/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/comments/)：缴枪了。参考的题解为(**快速幂算法,本质为分治算法**):https://leetcode.cn/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/solution/shu-zhi-de-zheng-shu-ci-fang-by-leetcode-yoqr/。

- [《剑指offer》17](https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)：本题的关键点是要想到**大数越界**问题。而对于类似的**数字排列**的越界问题，解决方式是使用**字符串**。(当然我还是没想到。。。又缴枪了)参考题解(的评论)：https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/solution/mian-shi-ti-17-da-yin-cong-1-dao-zui-da-de-n-wei-2/。具体代码如下：

  ```cpp
  class Solution {
      vector<string> res;
      string cur;
      char NUM[10] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
      
      // 生成长度为 len 的数字，正在确定第x位（从左往右）
      void dfs(int x, int len) {
          if(x == len) {
              res.push_back(cur);
              return;
          }
          int start = x==0? 1 : 0; // X=0表示左边第一位数字，不能为0
          for(int i=start; i<10; i++) {
              cur.push_back(NUM[i]); // 确定本位数字
              dfs(x+1, len); // 确定下一位数字
              cur.pop_back(); // 删除本位数字
          }
      }
  public:
      vector<string> printNumbers(int n) {
          for(int i=1; i<=n; i++) // 数字长度：1~n
              dfs(0, i);
          return res;
      }
  };
  ```

- [《剑指offer》18](https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/)：比较简单

- [《剑指offer》19](https://leetcode.cn/problems/zheng-ze-biao-da-shi-pi-pei-lcof/)：又缴枪了，太难了`QAQ`。参考的题解为：https://leetcode.cn/problems/zheng-ze-biao-da-shi-pi-pei-lcof/solution/zhu-xing-xiang-xi-jiang-jie-you-qian-ru-shen-by-je/。

- [《剑指offer》20](https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/submissions/)：我使用了**直接暴力遍历并检查每一位以及之前位置是否满足条件(通过一些`bool`值)**的方法来解决，答案中的题解使用了**[决定自动机解法](https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/solution/biao-shi-shu-zhi-de-zi-fu-chuan-by-leetcode-soluti/)**。另外对于此题，还需要知道**[C++中的`string`类型如何去除(所有/首尾)空格的的方式](https://blog.csdn.net/Wall_e_47/article/details/121347427)**。

- [《剑指offer》21](https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/submissions/)：这道题目个人认为实际上就是一个**快速排序算法**的变种。只不过在使用快速排序的时候，判断`left`,`right`指针能否移动不再是看是否满足大小关系，而是看是否是奇数/偶数。

- [《剑指offer》22](https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)：比较简单

- [《剑指offer》24](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/)：比较简单，但是这个题目需要掌握使用双指针在原地进行链表反转的做法：

  ```java
  class Solution {
      public ListNode reverseList(ListNode head) {
          ListNode pre = null, cur = head, next = null;
          while(cur != null) {
              next = cur.next;
              cur.next = pre;
              pre = cur;
              cur = next;
          }
          return pre;
      }
  }
  ```

  

- [《剑指offer》25](https://leetcode.cn/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)：简单的双指针合并两个递增链表。

- [《剑指offer》26](https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/)：典型的递归类的树的题目，具体代码为：

  ```CPP
  public boolean isSubStructure(TreeNode A, TreeNode B) {
          if(A == null || B == null) return false;
          return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
      }
      public boolean dfs(TreeNode A, TreeNode B){
          if(B == null) return true;
          if(A == null) return false;
          return A.val == B.val && dfs(A.left, B.left) && dfs(A.right, B.right);
      }
  ```

- [《剑指offer》27](https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/)：此题目比较简单，个人的做法为直接层次遍历(借助**栈**)，并在每一层的对应的左右节点进行一次交换就行了，但是要注意是直接交换指针，而不能单纯交换指针指向的内容。

- [《剑指offer》28](https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/)：此题缴枪了。。。参考的题解为：

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null)
            return true;
        return helper(root.left, root.right);
    }

    public boolean helper(TreeNode root1, TreeNode root2) {
        if (root1 == null && root2 == null)
            return true;
        if (root1 == null || root2 == null)
            return false;
        return root1.val == root2.val && helper(root1.left, root2.right) &&
            helper(root1.right, root2.left);
    }
}
```

- [《剑指offer》29](https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)：此题思路比较简单，但是自己的做法性能比较差：

  ```cpp
  vector<int> spiralOrder(vector<vector<int>>& matrix) {
          vector<int> ans;
          int m = matrix.size();
          if(m == 0) return ans;
          int n = matrix[0].size();
          if(n == 0) return ans;
          int num = 0;
          int total = m * n;
          int* direct = new int[4];
          for(int i = 0; i < 4; ++i) direct[i] = 0;//右，下，左，上
          vector<vector<int>> check; //0表示没有经过，1表示已经经过了这个点
          for(int i = 0; i < m; ++i) {
              vector<int> line;
              for(int j = 0; j < n; ++j) {
                  line.push_back(0);
              }
              check.push_back(line);
          }
          direct[0] = 1;
          int x = 0;
          int y = 0;
          while(num != total) {
              if(direct[0] == 1 && (y == n - 1 || check[x][y + 1] == 1)) {
                  direct[0] = 0;
                  direct[1] = 1;
              }
              else {
                  if(direct[1] == 1 && (x == m - 1 || check[x + 1][y] == 1)) {
                      direct[1] = 0;
                      direct[2] = 1;
                  }
                  else {
                      if(direct[2] == 1 && (y == 0 || check[x][y - 1] == 1)) {
                          direct[2] = 0;
                          direct[3] = 1;
                      }
                      else {
                          if(direct[3] == 1 && (x == 0 || check[x - 1][y] == 1)) {
                              direct[3] = 0;
                              direct[0] = 1;
                          }
                      }
                  }
              }
              ans.push_back(matrix[x][y]);
              check[x][y] = 1;
              num++;
              if(direct[0] == 1 && y != n - 1 && check[x][y + 1] != 1) {
                  y++;
              }
              if(direct[1] == 1 && x != m - 1 && check[x + 1][y] != 1) {
                  x++;
              }
              if(direct[2] == 1 && y != 0 && check[x][y - 1] != 1) {
                  y--;
              }
              if(direct[3] == 1 && x != 0 && check[x - 1][y] != 1) {
                  x--;
              }
          }
          return ans;
      }
  ```

参考答案的解法：https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/solution/shun-shi-zhen-da-yin-ju-zhen-by-leetcode-solution/。

- [《剑指offer》30](https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/)：要求自己实现一个`stack`的话，个人感觉思路应该是：实现一个每次向头部插入节点的单链表就好了。

- [《剑指offer》31](https://leetcode.cn/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)：思路是依次将入栈序列中的每个元素入栈，入栈之后使用**`while`**检查当前栈顶元素是否等于当前`popped`对应位置的元素，若相等则`pop`并继续重复上述流程，直至栈为空。若此时出栈序列已经到达结尾位置，则返回`true`,否则返回`false`。

- [《剑指offer》32](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)：层序遍历。。。

- [《剑指offer》32-II](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)：这个题目本质上也是层序遍历，难点是如何判断**当前正在遍历的层已经遍历结束**，这里我采用的方法为：通过每次循环的**队列元素个数**来判断，即利用了层序遍历时**每遍历完一行队列里面只剩下下一行元素**的特点进行判断是否该行已经结束。

  ```cpp
  vector<vector<int>> levelOrder(TreeNode* root) {
          vector<vector<int>> ans;
          if(root == nullptr) return ans;
          queue<TreeNode*> q;
          q.push(root);
          while(!q.empty()) {
              vector<int> row;
              int size = q.size();
              for(int i = 0; i < size; ++i) { //这里的size是关键，而且不能写成q.size(),因为实												//在动态变化的!
                  TreeNode* top = q.front();
                  q.pop();
                  row.push_back(top->val);
                  if(top->left != nullptr) q.push(top->left);
                  if(top->right != nullptr) q.push(top->right);
              }
              ans.push_back(row);
          }
          return ans;
      }
  ```

- [《剑指offer》32-III](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)：自己的方法就是在上一题的基础上面添加一个行数的判断。另外一种方法为使用**双端队列**。具体见如下[题解](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/solution/mian-shi-ti-32-iii-cong-shang-dao-xia-da-yin-er--3/)。

- [《剑指offer》33](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)：个人思路：因为是后序遍历，所以序列数组的最后一个节点是当前的根节点，根据根节点的数值去找前面第一个**大于**此值的节点作为**可能的**右子树的根节点，之后检测可能的根节点左面是否都小于根节点，右面是否都大于根节点，若满足，则递归地检查左右子树，若不满足，直接返回`false`。

  ```cpp
  private:
      bool check(vector<int>& post, int l, int r) {
          if(l >= r) return true;
          int pos = r;
          for(int i = l; i <= r; ++i) {
              if(post[i] > post[r]) {
                  pos = i;
                  break;
              }
          }
          for(int i = l; i < pos; ++i) {
              if(post[i] > post[r]) return false;
          }
          for(int i = pos; i < r; ++i) {
              if(post[i] < post[r]) return false;
          }
          return check(post, l, pos - 1) && check(post, pos, r - 1);
      }
  public:
      bool verifyPostorder(vector<int>& postorder) {
          if(postorder.size() == 0) return true;
          if(postorder.size() == 1) return true;
          return check(postorder, 0, postorder.size() - 1);
      }
  ```

此题的另外一种解法是使用**单调栈**。

```java
class Solution {
    public boolean verifyPostorder(int[] postorder) {
        // 单调栈使用，单调递增的单调栈
        Deque<Integer> stack = new LinkedList<>();
        int pervElem = Integer.MAX_VALUE;
        // 逆向遍历，就是翻转的先序遍历
        for (int i = postorder.length - 1;i>=0;i--){
            // 左子树元素必须要小于递增栈被peek访问的元素，否则就不是二叉搜索树
            if (postorder[i] > pervElem){
                return false;
            }
            while (!stack.isEmpty() && postorder[i] < stack.peek()){
                // 数组元素小于单调栈的元素了，表示往左子树走了，记录下上个根节点
                // 找到这个左子树对应的根节点，之前右子树全部弹出，不再记录，因为不可能在往根节点的右子树走了
                pervElem = stack.pop();
            }
            // 这个新元素入栈
            stack.push(postorder[i]);
        }
        return true;
    }
}
```

- [《剑指offer》34](https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/solution/mian-shi-ti-34-er-cha-shu-zhong-he-wei-mou-yi-zh-5/)：此题缴枪了。。。。参考题解为：https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/solution/mian-shi-ti-34-er-cha-shu-zhong-he-wei-mou-yi-zh-5/。采用的是前序遍历+回溯，最后一步要记得`path.pop()`,就是类似于之前的找矩阵路径题目，把当前处理的点变回初始状态，因为可能在这个点有多个方向。(左/右)

- [《剑指offer》35](https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/)：本题我使用的是**原地复制**的算法。

  ```cpp
  class Solution {
  public:
      Node* copyRandomList(Node* head) {
          //本地复制解法
          if(head == nullptr) return nullptr;
          Node* p = head;
          while(p != nullptr) {//首先将复制出来的节点放在原始节点的后一个节点的位置上
              Node* tmp = new Node(p->val);
              tmp->next = p->next;
              p->next = tmp;
              p = p->next;
              p = p->next;
          }
          Node* q = head;
          while(q != nullptr) {//填充新生成节点的random，注意不能直接使用原来的random，二十random->next!
              q->next->random = (q->random == nullptr) ? nullptr : (q->random->next);
              q = q->next;
              q = q->next;
          }
          Node* ans = head->next;
          Node* t = head;
          while(t != nullptr && t->next != nullptr) {//将原始链表昱新复制出来的链表分离！
              Node* t1 = t->next;
              t->next = t1->next;
              t = t1;//这里很关键！不能写成t=t->next!因为写成这样舍弃了新添加的clone节点!
          }
          return ans;
  
      }
  };
  ```

- [《剑指offer》36](https://leetcode.cn/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)：缴枪了。。。参考题解为：https://leetcode.cn/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/solution/mian-shi-ti-36-er-cha-sou-suo-shu-yu-shuang-xian-5/。具体代码为：

  ```cpp
  class Solution {
      Node head, pre;
      public Node treeToDoublyList(Node root) {
          if(root==null) return null;
          dfs(root);
          pre.right = head;
          head.left =pre;//进行头节点和尾节点的相互指向，这两句的顺序也是可以颠倒的
          return head;
      }
      public void dfs(Node cur){
          if(cur==null) return;
          dfs(cur.left);
          //pre用于记录双向链表中位于cur左侧的节点，即上一次迭代中的cur,当pre==null时，cur左侧没有节点,即此时cur为双向链表中的头节点
          if(pre==null) head = cur;
          //反之，pre!=null时，cur左侧存在节点pre，需要进行pre.right=cur的操作。
          else pre.right = cur;   
          cur.left = pre;//pre是否为null对这句没有影响,且这句放在上面两句if else之前也是可以的。
          pre = cur;//pre指向当前的cur
          dfs(cur.right);//全部迭代完成后，pre指向双向链表中的尾节点
      }
  }
  ```

- [《剑指offer》37](https://leetcode.cn/problems/xu-lie-hua-er-cha-shu-lcof/)：

  ```cpp
  class Codec {
  public:
      string ans;
      vector<string>nums;//关键，处理-1，255等这样的非单个数字。
      void dfs1(TreeNode*root){
          if(root==NULL){
              ans+='#';
              nums.emplace_back("#");
              return ;
          }
          ans+=to_string(root->val);
          nums.emplace_back(to_string(root->val));
          dfs1(root->left);
          dfs1(root->right);
      }
      string serialize(TreeNode* root) {
          if(root==NULL)return "";
          dfs1(root);
          return ans;
      }
      int idx=0;
     TreeNode* dfs2(TreeNode*root){
         if(nums[idx]=="#"){
             idx++;//这点也很关键，因为只要if语句执行不管该字符串是什么idx就会++。
             return NULL;
         }
         root=new TreeNode(stoi(nums[idx++]));
         root->left=dfs2(root->left);
         root->right=dfs2(root->right);
         return root;
     }
      TreeNode* deserialize(string data) {
          if(data=="")return NULL;
          return dfs2(new TreeNode());
      }
  };
  ```

- [《剑指offer》38](https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/)：方式1：不剪枝，在递归结束之后认为的删除重复元素（自己写的版本）

  ```cpp
  class Solution {
  private:
      int len;
      void Recur(string cur, string s, vector<bool> &checked, vector<string> &ans) {
          if(cur.size() == len) { //已经得到了目标长度的字符串，则遍历结束
              ans.push_back(cur);
              return ;
          }
          for(int i = 0; i < len; ++i) {
              if(checked[i] == true) continue;
              //if(s[i] == s[pos]) continue;
              checked[i] = true;//相当于固定一个位置
              Recur(cur + s[i], s, checked, ans);//遍历固定位置之后的字符的组合
              checked[i] = false;//记得复原!如abc和acb的c
          }
      }
  public:
      vector<string> permutation(string s) {
          this->len = s.size();
          vector<string> ans;
          vector<bool> checked;
          for(int i = 0; i < len; ++i) {
              checked.push_back(false);
          }
          Recur("", s, checked, ans);
          sort(ans.begin(), ans.end());
          vector<string>::iterator it = unique(ans.begin(), ans.end());
          ans.erase(it, ans.end());
          return ans;
      }
  };
  ```

- 38题方式2：在递归过程中剪枝，结果就是最终结果(感觉这样更好，但是自己没想出来咋弄)：

  ```cpp
  class Solution {
  public:
      vector<string> permutation(string s) {
          vector<string> res;
          dfs(res,s,0);
          return res;
      }
      void  dfs(vector<string> &res,string &s,int pos){
          if(pos == s.size())
              res.push_back(s);
          for(int i=pos;i<s.size();i++){
              bool flag = true;
              for(int j = pos;j<i;j++)//字母相同时，等效，剪枝
                  if(s[j] == s[i])
                      flag = false;
              if(flag){
                  swap(s[pos],s[i]);
                  dfs(res,s,pos+1);
                  swap(s[pos],s[i]);
              }
          }
      }
  };
  ```

- [《剑指offer》39](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)：思路1：直接排序，结果一定是中位数：

  ```cpp
  class Solution {
  public:
      int majorityElement(vector<int>& nums) {
          if(nums.size() == 1) return nums[0];
          sort(nums.begin(), nums.end());
          return nums[nums.size() / 2];
      }
  };
  ```

  思路2：(别名：缴枪)[摩尔投票法](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/solution/mian-shi-ti-39-shu-zu-zhong-chu-xian-ci-shu-chao-3/)：

  ```cpp
  class Solution {
  public:
      int majorityElement(vector<int>& nums) {
          int x = 0;
          int votes = 0;
          for(int i = 0; i < nums.size(); ++i) {
              if(votes == 0) x = nums[i];
              if(nums[i] == x) votes++;
              else votes--;
          }
          return x;
      }
  };
  ```

- [《剑指offer》40](https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/)：方法1：通过**快排**的思想，在进行划分时**不需要进行彻底的排序，只需要保证前k个一定小于后面的其余元素**就可以了。下面是参考评论自己写的版本：

  ```cpp
  class Solution {
  private:
      vector<int> quickSort(vector<int> &arr, int k, int low, int high) {
          int i = low;
          int j = high;
          while(i < j) {
              while(i < j && arr[j] >= arr[low]) j--;
              while(i < j && arr[i] <= arr[low]) i++;//这两行与正常的快排不同，只需要关注前半段是不是小于后半段就行了，而不是对每一半都再次进行彻底的排序
              int tmp = arr[i];
              arr[i] = arr[j];
              arr[j] = tmp;
          }
          int tmp = arr[i];
          arr[i] = arr[low];
          arr[low] = tmp;
          if(i > k) quickSort(arr, k, low, i - 1);
          if(i < k) quickSort(arr, k, i + 1, high);//这两行是在找前k个，这个算法是基于左侧的(low)的部分排序，所以是k和i进行比较
          vector<int> ans;
          for(int i = 0; i < k; ++i) {
              ans.push_back(arr[i]);
          }
          return ans;//若正好有k个，则直接返回前面k个
      }
  public:
      vector<int> getLeastNumbers(vector<int>& arr, int k) {
          if(k >= arr.size()) return arr;
          vector<int> ans = quickSort(arr, k, 0, arr.size() - 1);
          return ans;
      }
  };
  ```

- 40题常规快速排序思路：(以左边边界数作为基准)

  ```cpp
  	void quickSort1(vector<int> &arr, int low, int high) {
          if(low >= high) return ;
          int i = low;
          int j = high;
          while(i < j) {
              while(i < j && arr[j] >= arr[low]) j--;
              while(i < j && arr[i] <= arr[low]) i++;
              //这上面两行的顺序不可以变，因为这个算法是以最左边的值为基准值的，(即最终的最小值)，所以每次都要保证while结束的时候arr[i]和arr[j]都指向的是同一个小于arr[low]的元素，若颠倒的话则都指向了一个大于arr[low]的元素，之后在做交换的话就不能保证左面都小于右面的了
              int tmp = arr[i];
              arr[i] = arr[j];
              arr[j] = tmp;
          }
          int tmp = arr[i];
          arr[i] = arr[low];
          arr[low] = tmp;
          quickSort1(arr, low, i - 1);
          quickSort1(arr, i + 1, high);
      }
  ```

- [《剑指offer》41](https://leetcode.cn/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)：解法：

  用大顶堆+小顶堆方法，可以看作大顶堆是普通班，小顶堆是实验班。数量上**时刻保持  小顶-大顶<=1（两堆相等或者小顶比大顶多一个）**。

  新学生先入普通班（大顶堆），此时可能会失去平衡了，于是取大顶堆的第一个（班里最好的学生）加入实验班（小顶堆），判断若数量过多（不是等于或多一个），取第一个（实验班里最差的学生）到普通班（大顶堆）里。 取中位数的时候，若两堆数量相等，则各取堆顶取平均，若小顶比大顶多一，则多的那一个就是中位数。

  ```cpp
  class MedianFinder {
  private:
      priority_queue<int> big;
      priority_queue<int, vector<int>, greater<int>> small;
  public:
      /** initialize your data structure here. */
      MedianFinder() {
      
      }
      
      void addNum(int num) {
          big.push(num);
          small.push(big.top());
          big.pop();
          if(big.size() < small.size() - 1) {
              big.push(small.top());
              small.pop();
          }             
      }
      
      double findMedian() {
          if(big.size() < small.size()) return small.top();
          return (double)(big.top() + small.top()) / 2.0; 
      }
  };
  ```

- 补充一下**`C++ STL`的优先级序列**的使用：https://blog.csdn.net/qq_38210354/article/details/107506784。

- [《剑指offer》42](https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)：缴枪了，使用的是**动态规划**。关于动态规划的讲解，参看如下文章：https://zhuanlan.zhihu.com/p/91582909。

  ```cpp
  class Solution {
  public:
      int maxSubArray(vector<int>& nums) {
          vector<int> ans;
          for(int i = 0; i < nums.size(); ++i) {
              ans.push_back(INT_MIN);
          }
          ans[0] = nums[0];
          int max = nums[0];
          for(int i = 0; i < nums.size(); ++i) {
              if(i == 0) continue;
              ans[i] = (ans[i - 1] + nums[i]) >= nums[i] ? (ans[i - 1] + nums[i]) : nums[i];
              max = max >= ans[i] ? max : ans[i];
          }     
          return max;   
      }
  };
  ```

- [《剑指offer》43](https://leetcode.cn/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)：跳过。

- [《剑指offer》45](https://leetcode.cn/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)：本题实际上与40题类似。主要思路就是对整数数组对应的字符串数组进行**排序**。采用了快速排序。一个关键点是如何进行**对应的字符串拼接之后的大小比较**。考虑到字符串的比较方式为**逐位比较**，故直接使用**字符串拼接**的方式进行大小比较。自己的具体代码如下：(这个代码是在之前40题缴枪的代码基础上进行的修改，所以也算缴枪了吧。。。。)

  ```cpp
  class Solution {
  private:
      void quickSort(vector<string>& str, int low, int high) {
          if(low >= high) return ;
          int i = low;
          int j = high;
          while(i < j) {
              while(i < j && ((str[j] + str[low]) >= (str[low] + str[j]))) j--;
              while(i < j && ((str[i] + str[low]) <= (str[low] + str[i]))) i++;
              swap(str[i], str[j]);
          }
          swap(str[low], str[i]);
          quickSort(str, low, i - 1);
          quickSort(str, i + 1, high);
      }
  public:
      string minNumber(vector<int>& nums) {
          vector<string> ans;
          for(int i = 0; i < nums.size(); ++i) {
              string s = to_string(nums[i]);
              ans.push_back(s);
          }
          quickSort(ans, 0, ans.size() - 1);
          string res = "";
          for(int i = 0; i < ans.size(); ++i) {
              res += ans[i];
          }
          return res;
      }
  };
  ```

- [《剑指offer》46](https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)：典型的**动态规划**。规划的`dp`数组第`i`位含义为**前面`i`位的翻译方法个数**。转移方程是看前面两位如果在10-25之间，则为`dp[i] = dp[i - 1] + dp[i - 2]`；否则为`dp[i] = dp[i - 1]`,一个坑是`dp[0] = 1`。代码如下：

  ```cpp
  class Solution {
  public:
      int translateNum(int num) {
          if(num >= 0 && num <= 9) return 1; //个位数只有一种翻译方式
          if(num >= 10 && num <= 25) return 2; //小于25的两位数有两种翻译方式
          if(num >= 26 && num <= 99) return 1;
          string s = to_string(num);
          vector<int> dp;
          for(int i = 0; i <= s.size(); ++i) {
              dp.push_back(0);
          }
          dp[0] = 1;//dp第i位的含义为前面i位的翻译方法数量
          dp[1] = 1;
          //dp[2] = 2;
          for(int i = 2; i <= s.size(); ++i) {
              if(s.substr(i-2, 2) >= "10" && s.substr(i-2, 2) <= "25") 
               dp[i] = dp[i - 1] + dp[i - 2];
               else dp[i] = dp[i - 1];
          }
          return dp[s.size()];
      }
  };
  ```

- [《剑指offer》47](https://leetcode.cn/problems/li-wu-de-zui-da-jie-zhi-lcof/)：动态规划。自己的代码：(使用二维`dp`数组):

  ```cpp
  class Solution {
  public:
      int maxValue(vector<vector<int>>& grid) {
          int m = grid.size();
          int n = grid[0].size();
          if(m == 1 && n == 1) return grid[0][0];
          vector<vector<int>> dp;
          for(int i = 0; i <= grid.size(); ++i) {
              vector<int> line;
              for(int j = 0; j <= grid[0].size(); ++j) {
                  line.push_back(0);
              }
              dp.push_back(line);
          }
          dp[0][0] = grid[0][0];//初始条件1：左上角元素值相同且为dp的初始数值
          for(int i = 1; i <= grid.size(); ++i) {
              for(int j = 1; j <= grid[0].size(); ++j) {
                  if(dp[i - 1][j] >= dp[i][j - 1]) dp[i][j] = dp[i - 1][j] + grid[i - 1][j - 1];
                  else dp[i][j] = dp[i][j - 1] + grid[i - 1][j - 1];
              }
          }
          return dp[grid.size()][grid[0].size()];
      }
  };
  ```

本题目也可以使用**回滚数组**进行空间性能优化。代码如下(缴枪了)。这里的一维转移方程中右边的`dp[j]`指的是当前位置上一行同一列的内容，`dp[j - 1]`是上一列同一行的内容。左面的`dp[j]`是当前的位置，及二维数组中的`dp[i][j]`。具体的分析可以参考本文章：https://juejin.cn/post/6854573217185529864。

```java
class Solution {
    public int maxValue(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                dp[j] = Math.max(dp[j], dp[j - 1]) + grid[i - 1][j - 1];
            } 
        }

        return dp[n];
    }
}
```

- [《剑指offer》48](https://leetcode.cn/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)：使用**双端队列**以及**哈希表**。哈希表主要作用是**记录某个字符是否出现过**，双端队列作用是记录当前没有重复的子串。注意最终结果是不重复子串的**最长长度**,而不是最终长度。代码：

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        deque<char> ans;
        int* tmp = new int[128];
        for(int i = 0; i < 128; ++i) tmp[i] = 0;
        int max = 0;
        for(int i = 0;i < s.size(); ++i) {
            int pos = s[i] - 32;
            if(tmp[pos] == 0) {
                ans.push_back(s[i]);
                tmp[pos]++;
                if(ans.size() >= max) max = ans.size();
            }
            else {
                while(!ans.empty()) {
                    char c = ans[0];
                    int p = c - 32;
                    ans.pop_front();
                    tmp[p]--;
                    if(c == s[i]) break;
                }
                ans.push_back(s[i]);
                tmp[pos]++;
                if(ans.size() >= max) max = ans.size();
            }
        }
        return max;
    }
};
```

另外记录一下关于`STL`双端队列的使用：https://www.jianshu.com/p/51570127ea0d/。

- [《剑指offer》49](https://leetcode.cn/problems/chou-shu-lcof/)：缴枪了。。。。解法为使用**动态规划**。初值条件为`dp[0] = 1`，需要三个指针`a, b, c`,分别指向**2， 3， 5**三个倍数。则在处理转移方程是需要先判断`dp[i]`与`dp[a]*2, dp[b]*3, dp[c]*5`中的一个或几个是否相等。若相等，则将**对应**索引加1，若都不相等，则有：`dp[i]=min(dp[a]*2, dp[b]*3, dp[c]*5)`。(这样处理保证了既不会重复也不会漏掉一些结果)代码如下：

  ```cpp
  class Solution {
  public:
      int nthUglyNumber(int n) {
          int a = 0, b = 0, c = 0;
          int dp[n];
          dp[0] = 1;
          for(int i = 1; i < n; i++) {
              int n2 = dp[a] * 2, n3 = dp[b] * 3, n5 = dp[c] * 5;
              dp[i] = min(min(n2, n3), n5);
              if(dp[i] == n2) a++;
              if(dp[i] == n3) b++;
              if(dp[i] == n5) c++;
          }
          return dp[n - 1];
      }
  };
  ```

- [《剑指offer》50](https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)：此题容易，直接使用**哈希表**就行了。

- [《剑指offer》51](https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)：此题目核心思路为使用**归并排序**进行解决。关键点是在进行归并排序的**合并**操作时，若出现**左半数组对应位置元素大于右半数组对应位置元素**的情况，则说明形成了**逆序对**，因为归并排序的结果是要求单调递增的。(以递增为例)这里还要注意，**归并排序是要能够自己写出来的**。

  自己写法：

  ```cpp
  class Solution {
  private:
      int ans;
      void merge(vector<int>& nums, int l,int mid,int r) {
          int *tmp = new int[r + 1];
          int i = l; 
          int j = mid + 1;
          int k = l;
          while(i <= mid && j <= r) {
              if(nums[i] <= nums[j]) tmp[k++] = nums[i++];
              else {
                  ans += (mid - i + 1);
                  tmp[k++] = nums[j++];
              }
          }
          while(i <= mid) {
              tmp[k++] = nums[i++];
          }
          while(j <= r) {
              tmp[k++] = nums[j++];
          }
          for(int s = l; s <= r; ++s) {
              nums[s] = tmp[s];
          }
      }
      void mergeSort(vector<int> &nums, int l, int r) {
          if(l >= r) return ;
          int mid = (l + r) / 2;
          mergeSort(nums, l, mid);
          mergeSort(nums, mid + 1, r);
          merge(nums, l, mid, r);
      }
  public:
      int reversePairs(vector<int>& nums) {
          ans = 0;
          mergeSort(nums, 0, nums.size() - 1);
          return ans;
      }
  };
  ```

  但是这种写法会超时。。。之后就看了力扣的题解，做出优化，即不在关注最终的排序结果，只需要关注排序过程中的记录的逆序对的数量就好了。参考题解：https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/jian-zhi-offer-51-shu-zu-zhong-de-ni-xu-pvn2h/。代码如下：

  ```cpp
  class Solution {
  public:
      int reversePairs(vector<int>& nums) {
          vector<int> tmp(nums.size());
          return mergeSort(0, nums.size() - 1, nums, tmp);
      }
  private:
      int mergeSort(int l, int r, vector<int>& nums, vector<int>& tmp) {
          // 终止条件
          if (l >= r) return 0;
          // 递归划分
          int m = (l + r) / 2;
          int res = mergeSort(l, m, nums, tmp) + mergeSort(m + 1, r, nums, tmp);
          // 合并阶段
          int i = l, j = m + 1;
          for (int k = l; k <= r; k++)
              tmp[k] = nums[k];
          for (int k = l; k <= r; k++) {
              if (i == m + 1)
                  nums[k] = tmp[j++];
              else if (j == r + 1 || tmp[i] <= tmp[j])
                  nums[k] = tmp[i++];
              else {
                  nums[k] = tmp[j++];
                  res += m - i + 1; // 统计逆序对
              }
          }
          return res;
      }
  };
  ```

- [《剑指offer》52](https://leetcode.cn/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)：本题容易，关键是要想到1.**无论是否有公共节点，最终两个节点都会相等，因为最终两个节点都会指向公共节点/`nullptr`(即无公共节点)**。2.从`A`头节点出发到`B`的公共节点的距离以及从`B`头结点出发到`A`的公共节点的距离**相等**。

  ```cpp
  class Solution {
  public:
      ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
          if(headA == nullptr || headB == nullptr) return nullptr;
          ListNode* p1 = headA;
          ListNode* p2 = headB;
          while(p1 != p2) {
              if(p1 == nullptr) p1 = headB;
              else p1 = p1->next;
              if(p2 == nullptr) p2 = headA;
              else p2 = p2->next;
          }
          return p1;
      }
  };
  ```

- [《剑指offer》53-I](https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)：排序数组的查找，想的是**二分查找**。思路简单，代码略。

- [《剑指offer》53-II](https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/)：也是排序好的数组的查找，使用**二分查找**。关键点是要发现**缺失的数字(若不是最后一个数字)对应索引位置应该满足`nums[index]!=index`**,因为如果不缺失，则根据题目中的条件可以知道，每一位一定有`nums[index]==index`。但是如果是最后一个数字的话就应该直接返回**`nums.size()`**。代码如下：

  ```cpp
  class Solution {
  public:
      int missingNumber(vector<int>& nums) {
          int l = 0;
          int r = nums.size() - 1;
          while(l < r) {
              int mid = (l + r) / 2;
              if(nums[mid] == mid) l = mid + 1;
              else r = mid;
          }        
          if(l == nums.size() - 1 && nums[l] == l) return nums.size();
          return l;
      }
  };
  ```

- [《剑指offer》54](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)：中序遍历，比较容易。

- [《剑指offer》55-I](https://leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/)：简单，就是正常的计算树的深度。

  ```cpp
  class Solution {
  private:
      int max(int x, int y) {
          if(x >= y) return x;
          return y;
      }
  public:
      int maxDepth(TreeNode* root) {
          if(root == nullptr) return 0;
          return max(maxDepth(root->left), maxDepth(root->right)) + 1;
      }
  };
  ```

- [《剑指offer》55-II](https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/)：比较容易。但是自己的算法可以优化。自己代码如下：

  ```cpp
  class Solution {
  private:
      int max(int a, int b) {
          if(a >= b) return a;
          return b;
      }
      int height(TreeNode* root) {
          if(root == nullptr) return 0;
          return max(height(root->left), height(root->right)) + 1;
      }
  public:
      bool isBalanced(TreeNode* root) {
          if(root == nullptr) return true;
          if(height(root->left) - height(root->right) > 1 || height(root->right) - height(root->left) > 1) return false;//检查当前层是否符合条件
          return isBalanced(root->left) && isBalanced(root->right);//递归检查下面的层是否符合条件
      }
  };
  ```

  优化之后的代码如下。参考文章为：https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/solution/mian-shi-ti-55-ii-ping-heng-er-cha-shu-cong-di-zhi/。

  ```cpp
  class Solution {
  private:
      int max(int a, int b) {
          if(a >= b) return a;
          return b;
      }
      int height(TreeNode* root) {
          if(root == nullptr) return 0;
          return max(height(root->left), height(root->right)) + 1;
      }
      int recur(TreeNode* root) {
          if(root == nullptr) return 0;
          int left = recur(root->left);
          if(left == -1) return -1;
          int right = recur(root->right);
          if(right == -1) return -1;
          return (left - right <= 1 && left - right >= -1) ? (max(left, right) + 1) : -1;
      }
  public:
      bool isBalanced(TreeNode* root) {
          return recur(root) != -1;
      }
  };
  ```

- [《剑指offer》56-I](https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)：缴枪了。这个题目如果是只有一个数字出现一次的话，我知道应该**将所有数字进行异或操作的结果就是最终的结果**。但是两个就不会做了。。。。最终缴枪的思路为：通过所有数据取异或，实际上就是**两个只出现了一次的数据进行的异或**。这时通过异或结果中**从右向左数第一个不为0的位**为依据对所有数据进行**分组**。并且如此处理一定能保证相同数字在同一组里面，并且两个值出现一次的数据一定**出现在两个不同的组中，因为异或只有对应位不同才为1**。代码如下：

  ```cpp
  class Solution {
  public:
      vector<int> singleNumbers(vector<int>& nums) {
          int tmp = 0;
          for(int i = 0; i < nums.size(); ++i) {
              tmp ^= nums[i];
          }        
          int pos = 0;
          while((tmp & 0x1) != 1) {
              pos++;
              tmp >>= 1;
          }
          int res1 = 0;
          int res2 = 0;
          for(int i = 0; i < nums.size(); ++i) {
              if((nums[i] >> pos) & 1 == 1) res1 ^= nums[i];
              else res2 ^= nums[i];
          }
          vector<int> ans;
          ans.push_back(res1);
          ans.push_back(res2);
          return ans;
      }
  };
  ```

- [《剑指offer》56-II](https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)：也是一个位运算的题目。主要思路是统计二进制每一位的和，若不能被三整除说明单独的那一个数字(结果)对应的二进制在这1位上面为1。代码如下：

  ```cpp
  class Solution {
  public:
      int singleNumber(vector<int>& nums) {
          int* times = new int[32];
          for(int i = 0; i < 32; ++i) times[i] = 0;
          for(int i = 0; i < nums.size(); ++i) {
              int pos = 0;
              int num = nums[i];
              while(num != 0) {
                  if(num & 1 == 1) times[pos]++;
                  num >>= 1;
                  pos++;
              }
          }
          int ans = 0;
          for(int i = 0; i < 32; ++i) {
              if(times[i] % 3 == 1) {
                  ans += (1 << i);
              }
          }
          return ans;
      }
  };
  ```

- [《剑指offer》57-I](https://leetcode.cn/problems/he-wei-sde-liang-ge-shu-zi-lcof/)：此题思路比较简单，即**使用类似于二分查找的方式，利用逼近的方式进行查找**。代码如下：

  ```cpp
  class Solution {
  public:
      vector<int> twoSum(vector<int>& nums, int target) {
          int l = 0;
          int r = nums.size() - 1;
          vector<int> ans;
          while(l < r) {
              if(nums[l] + nums[r] == target) {
                  ans.push_back(nums[l]);
                  ans.push_back(nums[r]);
                  return ans;
              }
              if(nums[l] + nums[r] < target) l++;
              else r--;
          }
          return ans;
      }
  };
  ```

- [《剑指offer》57-II](https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)：缴枪了。参考答案中提到的**滑动窗口**这个方法感觉可以掌握一下。参考题解如下：https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/solution/shi-yao-shi-hua-dong-chuang-kou-yi-ji-ru-he-yong-h/。代码如下：

  ```cpp
  class Solution {
  public:
      vector<vector<int>> findContinuousSequence(int target) {
      int i = 1; // 滑动窗口的左边界
      int j = 1; // 滑动窗口的右边界
      int sum = 0; // 滑动窗口中数字的和
      vector<vector<int>> res;
  
      while (i <= target / 2) {//因为要求至少要有2个数字，所以最大边界只考虑到target/2
          if (sum < target) {//以下两个if的逻辑类似于上一题中的二分查找求和
              // 右边界向右移动
              sum += j;//右边界向右移动之后，多了一个数字，要加到结果里面去
              j++;
          } else if (sum > target) {
              // 左边界向右移动
              sum -= i;//左边向右移动之后，少了一个最左面的数字，要从结果里面减去
              i++;
          } else {
              // 记录结果
              vector<int> arr;
              for (int k = i; k < j; k++) {
                  arr.push_back(k);
              }
              res.push_back(arr);
              // 左边界向右移动
              sum -= i;
              i++;
          }
      }
  
      return res;
  }
  };
  ```

- [《剑指offer》58](https://leetcode.cn/problems/fan-zhuan-dan-ci-shun-xu-lcof/)：此题比较简单。但是最开始题目看错了。要注意**可能有多个空格**。自己的做法如下。主要思路就是直接按照空格划分。

  ```cpp
  class Solution {
  public:
      string reverseWords(string s) {
          if(s == "") return "";
          //if(s == " ") return "";
          vector<string> tmp;
          int i = 0;
          int j = 0;
          int pos1 = 0;
          while(s[pos1] == ' ') pos1++;
          if(pos1 == s.size()) return "";
          s = s.substr(pos1);
          int pos2 = s.size() - 1;//去除头部多余空格
          while(s[pos2] == ' ') pos2--;
          int len = s.size();
          s = s.substr(0, pos2 + 1);//去除尾部多余空格
          s += " ";//在尾部添加一个空格，方便归一化处理
          while(j != s.size()) {
              if(s[j] != ' ') j++;
              else {
                  string t = s.substr(i, j - i);
                  tmp.push_back(t);
                  j++;
                  i = j;
              }
          }
          string ans = "";
          for(int k = tmp.size() - 1; k > 0; --k) {
              if(tmp[k] != "") {
                  ans += tmp[k];
                  ans += " ";
              }
          }
          ans += tmp[0];
          return ans;
      }
  };
  ```

- [《剑指offer》58-II](https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)：本题可能直接想到的是直接使用`substr`进行字符串的拼接，但是那样太**`LOW`**。最好使用原地翻转(即不使用额外空间)解决。代码如下：

  ```cpp
  class Solution {
  private:
      string reverse_local(string &s, int l, int r) {
          int i = l;
          int j = r;
          while(i < j) {//用双指针夹逼法进行原地字符串反转
              char c = s[i];
              s[i] = s[j];
              s[j] = c;
              i++;
              j--;
          }
          return s;
      }
  public:
      string reverseLeftWords(string s, int n) {
          //O(1)空间复杂度
          //ab cdefg-->ba cdefg-->ba gfedc--> cdefg ab
          reverse_local(s, 0, n - 1);//先反转要被放在尾部的部分
          reverse_local(s, n, s.size() - 1);//再反转不被反转的部分
          reverse_local(s, 0, s.size() - 1);//最后将整个字符串反转
          return s;
      }
  };
  ```

- [《剑指offer》59-I](https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)：这个题目自己写的暴力法超时了。看了题解里面使用的**双端队列**。参考题解为：https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/solution/mian-shi-ti-59-i-hua-dong-chuang-kou-de-zui-da-1-6/。代码如下：

  ```cpp
  class Solution {
  public:
      vector<int> maxSlidingWindow(vector<int>& nums, int k) {
          if(nums.size() == 0) {
              vector<int> ans;
              return ans;
          }
          vector<int> ans;
          deque<int> d;
          for(int i = 0; i < k; ++i) {
              //未形成窗口时
              while(!d.empty() && d[d.size() - 1] < nums[i]) d.pop_back();//每次保证双端队列的单调性
              d.push_back(nums[i]);
          }
          ans.push_back(d[0]);
          for(int i = k; i < nums.size(); ++i) {
              //已经形成了窗口
              if(d[0] == nums[i - k]) d.pop_front();
              while(!d.empty() && d[d.size() - 1] < nums[i]) d.pop_back();
              d.push_back(nums[i]);
              ans.push_back(d[0]);
          }
          return ans;
      }
  };
  ```

- [《剑指offer》59-II](https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/)：思路与上一题类似。

  ```cpp
  class MaxQueue {
  private:
      deque<int> d;
      queue<int> que;
  public:
      MaxQueue() {
  
      }
      
      int max_value() {
          if(que.empty()) return -1;
          return d[0];
      }
      
      void push_back(int value) {
          que.push(value);
          if(d.empty()) d.push_back(value);
          else {
              if(d[0] < value) {
                  d.clear();
                  d.push_back(value);
              }
              else {
                  while(d.back() < value) d.pop_back();
                  d.push_back(value);
              }
          }
      }
      
      int pop_front() {
          if(que.empty()) return -1;
          int top = que.front();
          que.pop();
          if(top == d[0]) d.pop_front();
          return top;
      }
  };
  ```

- [《剑指offer》60](https://leetcode.cn/problems/nge-tou-zi-de-dian-shu-lcof/)：本题采用了**动态规划**。`dp`数组的中`dp[i][j]`表示再有`i`个骰子情况下朝上的面数字之和为`j`的**总数**。(因为总数量可以通过`pow(6, n)`轻松求得，所以没必要在计数同时计算概率。)转移方程为`dp[i][j] = dp[i - 1][s - 1] + dp[i - 1][s - 2] + dp[i - 1][s - 3] + dp[i - 1][s - 4] + dp[i - 1][s - 5] + dp[i - 1][s - 6]`。代码如下：

  ```cpp
  class Solution {
  public:
      vector<double> dicesProbability(int n) {
          vector<double> ans;
          int allNum = pow(6, n);
          vector<vector<int>> dp;
          for(int i = 0; i <= n; ++i) {
              vector<int> line;
              for(int j = 0; j <= 6 * n; ++j) {
                  line.push_back(0);
              }
              dp.push_back(line);
          }
          //dp[0][0] = 1;
          for(int i = 1; i <= 6; ++i) dp[1][i] = 1;
          for(int i = 1; i <= n; ++i) {
              for(int j = i; j <= 6 * n; ++j) {
                  for(int s = 1; s <= 6; ++s) {
                      if(j < s) continue;
                      else dp[i][j] += dp[i - 1][j - s];
                  }
              }
          }
          for(int i = n; i <= 6 * n; ++i) {
              double tmp = (double)(dp[n][i]) / allNum;
              ans.push_back(tmp);
          }
          return ans;
      }
  };
  ```

- [《剑指offer》61](https://leetcode.cn/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)：此题比较简单。需要注意的是**0可以作为任意数字，并且可以填充在任意位置。**代码如下：

  ```cpp
  class Solution {
  public:
      bool isStraight(vector<int>& nums) {
          int min = 14;
          int max = -1;
          int time = 0;
          int* times = new int[14];
          for(int i = 0; i < 14; ++i) times[i] = 0;
          for(int i = 0; i < 5; ++i) {
              if(nums[i] == 0) continue;
              time++;
              times[nums[i]]++;
              if(times[nums[i]] > 1) return false; //有重复的
              if(nums[i] < min) min = nums[i];
              if(nums[i] > max) max = nums[i];
          }
          int left = 5 - time;
          for(int i = min; i <= max; ++i) {
              if(times[i] == 0) left--;
          }
          if(left >= 0) return true;
          return false;
      }
  };
  ```

- [《剑指offer》62](https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)：看到圆圈，还涉及到循环删除，就知道这是一个**约瑟夫环**，而且看到圆圈还容易想到**取模**。此题目个人做法的关键是：由于每次删除之后从下一个数字重新计数，**所以下一个数字的索引是等于当前要被删除数字的索引的(注意取模)**。循环删除直到只有一个数字就行了。代码：

  ```java
  class Solution {
      public int lastRemaining(int n, int m) {
          ArrayList<Integer> list = new ArrayList<>(n);
          for (int i = 0; i < n; i++) {
              list.add(i);
          }
          int idx = 0;
          while (n > 1) {
              idx = (idx + m - 1) % n;
              list.remove(idx);
              n--;
          }
          return list.get(0);
      }
  }
  ```

- [《剑指offer》63](https://leetcode.cn/problems/gu-piao-de-zui-da-li-run-lcof/)：本题比较简单。但是最好不要使用双重`for`循环。自己的代码如下：

  ```cpp
  class Solution {
  public:
      int maxProfit(vector<int>& prices) {
          int ans = 0;
          if(prices.size() == 0) return 0;
          int min = prices[0];
          for(int i = 1; i < prices.size(); ++i) {
              if(prices[i] - min > ans) ans = (prices[i] - min);
              min = (prices[i] > min) ? min : prices[i];
          }
          return ans;
      }
  };
  ```

- [《剑指offer》64](https://leetcode.cn/problems/qiu-12n-lcof/)：额。。。

  ```cpp
  class Solution {
  public:
      int sumNums(int n) {
          int tmp = pow(n, 2);
          return (tmp + n) >> 1;
      }
  };
  ```

- [《剑指offer》65](https://leetcode.cn/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)：经典的位运算题目，`ICS`讲过的。但是要注意一点，**`C++`中对于负数直接左移位会报错，要强制转化为`unsigned int`才行！**代码：

  ```cpp
  class Solution {
  public:
      int add(int a, int b) {
          while(b != 0) {
              int c = (unsigned int)(a & b) << 1;
              a = a ^ b;
              b = c;
          }         
          return a;              
      }
  };
  ```

- [《剑指offer》66](https://leetcode.cn/problems/gou-jian-cheng-ji-shu-zu-lcof/)：本题**直接使用双重循环会超时**。采用的具体算法如下代码所示。即通过两次单独的单次循环(**顺序不一样**)完成结果运算。整体思路，结果集中任何一个元素 = 其左边所有元素的乘积 * 其右边所有元素的乘积。一轮循环构建左边的乘积并保存在结果集中，二轮循环 构建右边乘积的过程，乘以左边的乘积，并将最终结果保存

  ```cpp
  class Solution {
  public:
      vector<int> constructArr(vector<int>& a) {
          vector<int> ans;
          if(a.size() == 0) return ans;
          //不使用双循环
          for(int i = 0; i < a.size(); ++i) ans.push_back(0);
          ans[0] = 1;
          int tmp = 1;
          for(int i = 0; i < a.size(); ++i) {
              ans[i] = tmp;
              tmp *= a[i];
          }   
          int tmp1 = 1;
          for(int i = a.size() - 1; i >= 0; --i) {
              ans[i] *= tmp1;
              tmp1 *= a[i];
          }
          return ans;
      }
  };
  ```

- [《剑指offer》67](https://leetcode.cn/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/)：此题目比较简单。

  ```cpp
  class Solution {
  public:
      int strToInt(string str) {
          long ans = 0; //因为需要判断是否越界了INT，所以采用了LONG
          int sign = 1; //正数为1，无符号为0，负数为-1
          int pos = 0;
          while(str[pos] == ' ') {
              pos++;
              if(pos == str.size()) return 0;
          }
          if(!(str[pos] >= '0' && str[pos] <= '9') && str[pos] != '+' && str[pos] != '-') {
              return 0; //非法字符开头，直接不转换
          }
          if(str[pos] == '+') {
              sign = 1;
              pos++;
          }
          else {
              if(str[pos] == '-') {
                  sign = -1;
                  pos++;
              }
          }
          while(str[pos] >= '0' && str[pos] <= '9') {
              int tmp = str[pos] - '0';
              ans = ans * 10 + tmp;
              if(sign ==1 && ans > INT_MAX) return INT_MAX;
              else {
                  if(sign == -1 && (-ans) < INT_MIN) return INT_MIN;
              }
              pos++;
          }
          if(sign == -1) return -ans;
          return ans;
      }
  };
  ```

- [《剑指offer》68-I](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/)：经典的**最近公共祖先(`LSA`)**题目。我使用了**递归**。

  ```cpp
  class Solution {
  public:
      TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
          if(root == nullptr) return nullptr;
          if(root->val < p->val && root->val < q->val) {
              //都在左子树
              return lowestCommonAncestor(root->right, p, q);
          }        
          if(root->val > p->val && root->val > q->val) {
              //都在右子树
              return lowestCommonAncestor(root->left, p, q);
          }  
          //p,q分别在两边，则直接返回当前遍历到的"根"节点
          return root;
      }
  };
  ```

- [《剑指offer》68-II](https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)：

  ```cpp
  class Solution {
  public:
      TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
          if(root == nullptr) return nullptr;
          if(root == p || root == q) return root;
          TreeNode* left = lowestCommonAncestor(root->left, p, q);
          TreeNode* right = lowestCommonAncestor(root->right, p, q);
          if(left == nullptr && right != nullptr) return right;
          if(left != nullptr && right == nullptr) return left;
          if(left == nullptr && right == nullptr) return nullptr;
          return root;        
      }
  };
  ```

———————————————————————`END`————————————————————————