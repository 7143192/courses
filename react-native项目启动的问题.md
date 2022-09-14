# `react-native`项目启动时遇到的问题

- 遇到`evaluating error`的错误，个人遇到的此类型错误的具体报错为：`setting.gradle file does not exist.`。暂时的解决方式为：删除`node_modules`依赖包，并重新安装

  > 在IDEA中可以通过`package.json`来重新安装

- 遇到在安装某些新使用的包之后程序无法成功启动的情况时，可以通过`npm uninstall xxx`与`npm install xxx`来解决

- 启动之后在进入某些页面时候出现`tried not to assign two same ViewPager`之类的错误，这个一般是由于两个不同的组件中引用的相同依赖版本不一致导致的（如果就是上面的错误，就说明是`@react-native-community/viewpager`的版本问题），暂时的解决方式为在`package.json`文件中添加`resolutions`一项，并在里面添加`@react-native-community/viewpager xxx`,其中`xxx`为当前项目的`@react-native-community/viewpager`的版本号。

- 安装完成之后，出现`invalid hook call`之类的错误，对于这类错误，可能有如下原因：

  - 首先是可能错误使用了hook，对于hook，要注意只可以在函数式组件中使用，而不能在类组件中使用。
  - 若已经符合上一条，则可能是hook的使用出现问题，正确使用可以[看如下博客](http://events.jianshu.io/p/b7c9a3761efa).
  - 若没有使用hook也报了这个错误，（或者使用了hook但是确认使用正确），则可以在project的根目录下运行`npm ls react`来检查是否有某个报的依赖不对，即可能有的包虽然成功安装了，但是版本不对或者与其他现有包的版本不匹配。