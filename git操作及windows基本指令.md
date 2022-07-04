# 代码管理操作

**我们管理的文件包括src文件夹和package.json文件**

1. 初始化仓库

   在我们的项目文件夹下运行

   ```
   git init	//初始化仓库
   git remote add origin git@codehub.devcloud.cn-east-3.huaweicloud.com:ydjsAPP00001/frontend.git	//关联远端仓库
   ```

2. 运行`git pull origin dev`将远端仓库的内容拉下来（远端仓库有两个分支，master和dev，只能提交修改dev分支，master分支没有提交权限）

   如果出现冲突，看最后

3. 切换到dev分支下工作`git checkout dev`，工作完成后，提交代码到远端仓库。

   ```
   git status	//查看自己修改的文件是否全都是要提交的，如果有些配置文件，则把其名字加入.gitignore
   git add .
   git commit -m "blabla"
   git pull --rebase	//确定自己本地分支是基于最近版本修改的
   git push origin dev	//提交到远端的dev分支上，这里origin指的是远端，dev指远端的dev分支，
   ```

**.gitignore里面放的是项目不用更新的文件，比如android，ios等，如果在提交的时候通过`git status`查看到有除了这两个之外的文件，就加入.gitignore**

**注意事项**

- `git`中，在文件夹中的文件名为**蓝色**说明**修改过**，为**棕绿色**说明**位于`.gitignore`中**，为**红色**说明**没有添加到`git`中去**，**黄色**是说明**还没有add**。

- 一些windows命令行基本指令：
  * `dir`——打印目录下文件，对应于linux的`ls`
  * `cd`——和linux下的`cd`一致
  * `md`——对应linux的`mkdir`命令
  * `type`——对应cat，查看文件内容， `type nul> [文件名]`可以创建空文件
  * `copy con 【文件名】`——对应touch 但是后面紧跟着需要输入文件内容，ctrl+z结束
  * `del`——对应于rm，帮助文档为`del /？`，
  * `rmdir`——删除文件夹
  * `echo > [文件名]` ——往文件里面写内容
  * `cls`——清除屏幕，对应linux的`clear`


- git中的删除操作：

  删除文件/文件夹的操作如下：

  1. ```git pull origin master```
  2. ```git rm -r --cached [文件名]```
  3. `git commit -m "comment"`
  4. `git push -u origin master`

* **问题一：**本地文件和远端不一样，push时却显示`Everything up-to-date`

  `git push`的时候，会把对应的本地分支推送到对应的远端分支上，查看分支对应的命令为`git branch -vv`,把本地当前分支推送到远端指定分支的命令为`git push origin head:dev`（推送到dev分支）
  
* fatal: refusing to merge unrelated histories

  ```git merge master --allow-unrelated-histories```

* **冲突解决**

  冲突可能在pull、push、merge的时候出现

  ```
  CONFLICT（content）：Merge conflict in XXXX/
  
  AutoMatic merge failed；fix conflicts and then commit the result.
  ```

  本地文件和远程文件有冲突，解决方案有两种

  1. 抛弃本地文件，直接更新为远程分支

     ```
     git fetch --all
     git reset --hard origin/dev
     git pull origin dev
     ```

  2. 合并本地文件和远程分支冲突的文件（链接https://blog.csdn.net/qq_43411729/article/details/114701124）

     ```
     git fetch origin dev:tmp    \\首先将远程仓库的dev下载到本地的tmp分支上
     git diff tmp	\\查看tmp分支与本地有什么不同
     git merge tmp    \\将tmp分支与本地分支结合
     ```

     然后手动打开冲突的文件修改

     ```
     你会在文件中发现<<<<<<< HEAD ，=======  ，>>>>>>> ae9a0f6b7e42fda2ce9b14a21a7a03cfc5344d61
     
     这种标记，<<<<<<< HEAD和=======中间的是你自己的代码，  =======  和>>>>>>>中间的是其他人修改的代码
     
     自己确定保留那一部分代码，最后删除<<<<<<< HEAD ，=======  ，>>>>>>>这种标志
     
     git add 冲突文件
     
     git commit -m '冲突解决结束'
     
     再次将本地的文件提交
     
     git push
     
     将解决冲突后的文件推送到远程
     ```

     