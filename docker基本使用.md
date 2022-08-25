# `docker`基本使用

- 要是想编译运行一个`docker`,首先要做的就是要编写对应的**`Dockerfile`**文件。（要注意文件名称的大小写）`Dockerfile`内部的每一条指令内容都是声明了`docker`在`build/run`对应的容器时要做的操作的具体内容。关于此文件的编写可以看如下博客：https://blog.csdn.net/weixin_44806981/article/details/108702545。几条基本指令使用如下：

  - **`FROM`**:这个指令主要是声明要创建的`docker`的母体，即要`build`的容器是基于那一个已经存在的容器进行修改/添加/删除内容的。

  - **`ADD`**:向`docker`的运行环境中添加**文件/目录**。并且会自动解压压缩包/自动下载`URL`等。指令格式为`ADD <SRC>...<DST>`,这里要注意的是，在进行`ADD`时原来在`docker`中不存在的目录会自动创建对应目录，还有就是要注意`src与dst`的具体地址格式。比如**对于目录的复制，**`ADD ./checkpoint /home/yhan/`是将`checkpoint`文件夹中的**内容**全部放入`/home/yhan`目录下，**而不会创建一个叫做`checkpiint`的目录**，所以如果搞错了路径在之后的`CMD`指令运行中可能就会出现找不到对应路径的问题。所以如果是想使用`ADD`完成上述操作并也放在`checkpoint`文件夹中，应该改为：`ADD ./checkpoint /home/yhan/checkpoint(自动创建checkpoint目录)`。而对于文件的复制则相对简单，只需要放入对应目录下面就行了。

  - **`COPY`**:这一个指令与上面一个类似，只是**只能做文件和文件夹的复制，不会自动下载/解压**。

  - **`RUN`**:这个指令主要是声明在`Dockerfile`在执行到这一步时要执行的**`shell`指令**。有两种处理方式，一种是**直接将完整的命令行写入`Dockerfile`,即和在`linux shell`中格式一样**，另外一种是**使用[]和''将每一个参数分隔开，类似于参数传递。**示例如下：

    > RUN ["yum", "install", "`httpd`"]
    > RUN yum install `httpd`

  - **`CMD`**:这个指令**不是在`build`过程中使用的，而是在`run`过程中使用的**，一般放在最后，并且要注意`Dockerfile`里面一般只能有**一个**`CMD`命令行。所以如果需要在一个`image`里面运行多个`run-time`指令，可以把这些指令写入一个`shell/py`脚本中再去运行。(当然脚本文件也是要`COPY`到`docker`中去的)格式与上面的`RUN`是类似的。

- `Docker`的编译命令：`docker build . -t IMAGE-NAME`。要注意有时候你要`copy`的文件需要`sudo`权限，所以需要改为`sudo ..(后面一样)`。
- `Docker`的运行指令：一般情况下为`docker run -it IMAGE-NAME`。若想改为后台运行，将`-it`变为`-itd`,若想添加`super`权限，需要改为`docker run -it --privileged=true IMAGE-NAME`。在一些情况下，我们可能想通过端口检测的方式来观测`docker`中的容器运行情况以及可能进行部分的测试，这时候一种处理方式是直接获取`docker`的`port`，通过指令`docker inspect IMAGE-NAME`来获取，但是这种方式由于每次重新`build`之后`port`会改变所以可以考虑直接将`docker`端口映射到本地的某个端口，这个端口映射可以通过`-p`来完成。例如：`docker run -it --privileged=true -p8080:8080 IMAGE-NAME`等。
- 一些其他指令：通过`docker ps -a`查看所有**容器**，通过显示的`container-id`可以进行`container`的销毁和内部查看。可以通过`docker rm -f(强制销毁) id`来销毁一个`container`。通过`docker images`来查看所有的**镜像信息**。可以通过`docker rmi -f img-id`来强制销毁。可以通过`docker logs image-id`查看一个运行中镜像的日志信息。