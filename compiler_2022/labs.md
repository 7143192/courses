# `Compiler-Lab`总结

## 目录(项目路径：[`compiler_2022_yhan`](https://ipads.se.sjtu.edu.cn:2020/520021910279/compiler-2022))

- [`Lab1-StraightLine`](#lab1)
- [`Lab2-Lex`](#lex)
- 

## <a id="lab1">`Lab1-StraightLine`</a>

- `Lab1`主要是实现一个简单的**语法解析器**--`StraightLine`.同时。通过这个lab来起到熟悉C语言代码编写的作用。
- 本lab主要通过实现不同类型的语句的`maxargs()`和`Interp(Table* t)`函数来实现一些基本的解析操作。
- 本lab主要代码位于`src/straightline/slp.cc(.h)`中。
- 本lab逻辑比较简单，但是也要注意一些小问题。比如，`ExpList`只会出现在`print`语句中，所以可以考虑在`ExpList`解析过程中输出相应的内容；要注意一些可能修改变量值的语句咋解析之后会修改`Table`的结果和值，要注意更新；**`MaxArgs()`函数只是对于`print`语句而言的**，所以那些不会出现`print`的表达式的`MaxArgs`函数应该返回0。并且此时的`MaxArgs`应该取这个`print`语句的中的表达式个数与`MaxArgs()`函数返回结果中的**较大值**。`e.g.print((print(1, 2, 3), 3), 4)`的`MaxArgs()`应该返回3而不是2。

## <a id="lex">`Lab2-Lex`</a>

- `Lab2`主要是完成了一个`tiger`编译器的**词法解析器**。通过这个`Lab`,主要是要掌握`LEX`语言的一些基本的用法，同时通过这次`Lab`我深入理解了正则表达式以及转义序列在计算机中表示以及解析的过程。

- 本次`Lab`的个人认为的难点如下：

  - 如何正确的显示**转义序列**

  - `e.g.`

  - ```c++
    ...
    \\[ \t\n]+\\ {
    			adjustStr();
    			//string_buf_ += matched();
    			//errormsg_->Newline();
    			/*when detect the "f___f" string, ignore it directly(programming facing to the result... )*/
    			string_buf_ += "";	
    }
    "\\\\"	{
    		adjustStr();
    		string_buf_ += matched().substr(1);
    }
    ..
    ```

  - 如何处理**嵌套的**注释信息。具体处理逻辑见下文。

  - ```cpp
    
    。。。<COMMENT>{
    		"*/" {
    			adjustStr();
    			//comment_level_--;//detect the end of a level of the (nested) comment
    			if(comment_level_ == 1) begin(StartCondition__::INITIAL);
    			else comment_level_--;
    		}
    		.    {//any input except the new line.
    			adjustStr();
    		}
    		\n  {//newline of the comment
    			adjustStr();
    		}
    		"/*" {
    			adjustStr();
    			comment_level_++;
    			begin(StartCondition__::COMMENT);
    		}
    		<<EOF>>	{
    			return 0;
    		}
    	}
    。。。
    ```

  - 如何用正则表达式处理不确定序列(即除了标点，符号，保留字之外的那些需要正则表达式的`tokens`)

- 一些主要的难点的处理思路：

- 关于`String`的处理：

  - 首先处理读取到的第一个双引号/“/*”符号，若为双引号，则跳转到<STR>部分；反之则跳转到<COMMENT>部分。
  - 之后在<STR>部分中，首先处理遇到了真正的字符串结束时的右半部分的双引号，此时使用`setMatch()`进行获取的字符串的类型匹配，并返回`STRING`类型。
  - 之后处理一些使用反斜杠进行转移的序列，包括`\"(嵌套的引号),\n,\t,\^c,\\,\f___f\,\bbb`几种。
  - 最后，除去上述情况外，我处理了最后一种可能正确的字符串情况，即任意输入`.`（不包括换行符）。

- 关于`Comments`的处理：
  - 由于`Comment`存在嵌套`Comment`的情况，所以使用框架已经提供的`comment_level_`变量来存储`comment`已经嵌套的层数。在我的实现中，最外层的`comment_level_`记录为1.
  - 在识别`String`时遇到"/*"时，进入<COMMENT>部分进行`Comment`的处理。
  - 在读取到`*/`时，先判断当前的`comment_level_`是否为1，若不为1，直接减去1，即表示内部的一层嵌套评论已经被处理，若已经为1，说明这已经是最外层的结尾，所以使用`begin()`函数直接跳转到`INITIAL`部分继续处理余下的输出。
  - 之后处理了一些其余输入内容，如`\n,.`等。
  - 若又遇到了`/*`，则将`comment_level_`直接加1。

- 关于`error`的处理：
  - 原有的初始代码框架已经提供了异常处理逻辑，所以我的处理`error`的逻辑是直接将所有可能的正确情况全部添加在已经提供的异常处理的**前面**，从而如果一个`token`无法被正确情况识别就会最终进入异常处理中并报错。

- 关于`EOF`的处理：
  - 根据[`FlexC++ Mutual`](https://fbb-git.github.io/flexcpp/manual/flexc++03.html#l22),可以得知`EOF`的检测字符串为`<<EOF>>`,另外，通过阅读`parserbase.h`，得知`Parser`中的`Token_`是从257开始遍历的，所以要选择一个小于257的数字作为`EOF`的编号。但是我最开始选择的是1，不知道为啥跑的时候会死循环。。。之后选择了0。

- 本`Lab`需要注意的问题：
  - 要想明白，反斜杠字符是要显示在输入中，还是作为转义字符出现且单独无意义。
  - 注意在`STRING`和`COMMENT`内部，要使用`adjustStr()`而不是`adjust()`,因为一个字符串和一个注释应该作为一个整体，其报错应该是对整个串的报错，而不是某一个位置的报错。另外，从理论角度理解，这个`adjust()`函数实际上就是在调整**当前正在识别的`token`的起始位置**，所以一个`string`和`comment`应该各自算作一整个`token`，所以也不要拆开。