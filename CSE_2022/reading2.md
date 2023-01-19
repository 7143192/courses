# `reading2-End-to-End`

- **`use my own word to describe the "end to end argument"`**.
  - 答：`end to end argument`说的是在系统较低层定义的一些重要功能对应的函数相对实现这些函数花费的时间精力而言，一般是多余的或者是低价值的。这些函数应该通过应用层来实现，但是可以在低层次提供一些函数来提升这些应用层面的重要函数的工作性能。
- **`Give at lease three cases that are suitable to use this principle`**.
  - 在通信系统中，使用`end to end argument`来保证消息一定会被目标应用接受并且目标应用会做相应的响应。
  - 在进行数据加密的过程中，使用`end to end argument`来进行应用层面的消息身份认证以及确保加密过程的安全性。
  - 在`two phase commit`中使用`end to end argument`.
- **`Give at lease three cases that are NOT suitable to use this principle`**.
  - `end to end argument`更加适用于`layer-structed`结构，但是不适用于具有其他层次结构的体系架构。
  - 不适用于可靠性极差的系统，如极易发生通讯中断的通信系统，因为这种系统如果在`application`层面做过多的特定操作的话，可能会发生很多的`retries`,并且可能也不会成功,所以会使得应用层的`performance`很差，所以不好使用`end to end argument`。
  - 不适用于对于应用性能要求很高的系统，比如一些分布式计算系统，因为根据`end to end argument`在应用层面引入一些额外的检查和特定实现之后，可能会使得应用层面的`overhead`的变大，可能导致总体的性能下降。
- **`[Discussion] Consider the design of the file system based on inode.  Which parts of the design do you think can be removed? In another word,  which parts are not flexible enough and should be implemented by the  user?`**
  - 答：`path layer`和`absolute path layer`。因为这两个`layer`最终实现的结果应该是与用户使用的文件系统的实际目录结构有关的，通过`end to end argument`的实现可能可以更方便的进行修改路径等操作。
- **`[Discussion] The same question as above, for the operating system.`**
  - 答：对于操作系统中写定的库函数中一部分是可以被舍弃的，应该由用户来实现一个基于应用的能够实现额外的特定功能的特定版本，但是这个特定版本的函数也是可以直接调用一些基本的原始库函数的。
