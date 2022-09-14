# `react-native`注意事项

- 遇到想用的包但是不会用，多查一查`github`和`npmjs`官网!!!!
- 当遇到某个依赖包在configure时安装过慢，可以尝试取[`mavenRepository`官网](https://mvnrepository.com/)下载对应的包，并直接放在对应位置上来避免不必要的额外下载。

- 在给一些组件添加大小参数时，可以直接写数字，但是**不可以**添加`px`等单位，但是可以添加`%`，但是要注意添加了`%`的数值**必须**要使用`''`（引号）括起来。

- 再使用`flex`进行页面布局设置时，要把要进行布局的子组件用一个view封装起来。并且要保证每个子组件都是一个view或者是一个额外定义的类或函数组件。

- 在对某个组件添加style无效时，可以尝试将其放入一个`view`再试试。

- 一些组件：在底部栏那里进行页面的跳转使用`TabNavigatior`组件，实现局部垂直方向滚动使用`ScrollView`组件。

- 在使用`flex`参数来设置布局时，要注意一个`view`中的`flex`中的值是起到了分解整个`view`的作用，即将一个`view`中所有`flex`数值加起来得到一个总和`sum`,而某一个组件的`flex`数值占据`sum`的比例就是这个组件在这个`view`中占的空间。

- 因为开发的是手机端的`APP`，所以在设置组件大小以及边距时，最好使用的是相对距离，即%。

- 绘制一个可以滑动的周日历是有现成的组件的，详情见[周日历组件](https://github.com/BugiDev/react-native-calendar-strip)

- 通过`new date()`来获取当天日期.

- 与react一样，想在**子组件更新时，让父组件也更新**，那就要在**父组件定义对应的handle函数并以props的形式**传入子组件中去。

- `react-native`中一个已经封装好的`input`组件：[react-native-custom-input](https://blog.csdn.net/suwu150/article/details/80720842)。

- 遇到的`elements type error`一般是由于使用的组件传递到了错误的参数类型或者使用了该组件不存在的参数导致的。

- `react-native`中不存在复选框组件，需要额外安装。使用**`yarn add react-native-check-box`**指令进行安装。

- `tab-navigator`中的子页面要想跳转到`tab-navigator`之外的页面不能直接跳转，需要调用父组件（也就是进行`tab-navigation`的组件）中传递过来的进行跳转的函数，即通过tab组件进行与其他页面之间的跳转。

- 在有些情况下，在命令行里面操作优于直接在IDEA里面操作，使用yarn安装在一些情况下也要好于使用`npm`进行安装。

- 一个比较好看的`top-tab`组件：[react-native-tab-view](https://github.com/satya164/react-native-tab-view)。

- 一个在网上抄的下拉选择框组件：[`ModalDown`](https://zhuanlan.zhihu.com/p/492160048)。

- `react-native-tab-view`提供的顶部的导航栏与`react-navigation`类似，也不能直接通过点击等方式跳转到tab之外的页面上面去，也需要使用父组件（当然父组件也可能需要祖父组件传递进来的函数）进行跳转。

- 在`react-native`中，函数类组件在使用父组件传递进来的参数（函数）的方式为：

  >  对于函数的组件，父组件也可以把值当成属性传给子组件，子组件用在构造的时候传入props，从props取值。

​	[看此博客](https://blog.csdn.net/tangsaishi4302/article/details/107762228)。

- `react-native`中，由于模拟的是手机端，所以应该使用`onPress`而不是`onClick`，同时对于button，text等组件，可以直接使用`onPress`参数，而对于View组件，其要想处理`onPress`之类的点击事件，应该修改组件名称为`TouchableOpacity`。

- `react-native`绘制折线图暂时没有找到较好的组件，暂时使用的是[react-native-charts-wrapper](https://github.com/wuxudong/react-native-charts-wrapper)。

- `react-native`中在使用`ImageBackground`组件时，要是想修改背景图片的边角(`radius`)或者透明度(`opacity`)可以通过组件的`imagestyle`属性参数来设置。

- 一个不错的日期选择框组件：[`DateTimePicker`](https://github.com/react-native-datetimepicker/datetimepicker)。

- `react-native`进行页面跳转：(主要参考文档为[`react-navigation官网`](https://reactnavigation.org/docs))
  - 若不需要传递参数，对于已经位于`navigation`中的页面，可以直接使用`this.props.navigation.navigate/push('name')`(类组件)或者`navigation.navigate/push('name')`(函数组件，其中`navigation`以参数传入)进行页面跳转。
  - 若需要传递参数，对于那些可以通过navigation直接跳转的页面操作如下：
    - 发出参数的页面(以类组件为例)：`this.props.navigation.navigate('name', {key1: value1, ....})`方式发出参数(这个一般没啥问题)
    - 接收参数页面：(以类组件为例)用`this.props.route.params(.key1)`来获取参数。
    - **注意：不要使用`this.props.navigation.state.params.key1`接收参数，这样会报错，是不好使的。**
    - 也可以使用**`var items = this.props.route.params`**来封装，但是不能使用**`var {items} = this.props.route.params`**来封装。
  - 
  
- react(-native)设置参数缺省值的方式与C++等类似，即：`function foo(a = 0, b = 10){...}`的形式。

- `react-native`中要绘制进度条可以使用[**`react-native-svg`**](https://www.jianshu.com/p/dcae1b6c247f?utm_campaign=maleskine&ivk_sa=1024320u)组件。

- 一个获取时间各种格式(日期，星期等)比较好用的组件：[`moment`](https://momentjs.com/)。

- `plugin with id 'maven' not found`的解决：将`apply plugin: 'maven'`改为`apply plugin: 'maven-publish' `。

- 运行时遇到`Task :app:compileDebugJavaWithJavac FAILED`的错误，暂时来看出错原因是在android中的`src`中的`MainApplication`文件中**重复`import`了某个包**，全部删除(此包已经不存在时)或者只留一个(此包还要使用时)。

- 关于`react-native`中如何将结果表示为小数：可以使用`react(-native)`自带的**`toFixed(num)`**来表示小数，其中参数`num`就是你想要保存的小数的位数。

- 在`react(-native)`中进行页面跳转或者其他会导致页面析构的操作时，会出现`Warning: Can‘t perform a React state update on an unmounted component`。可能的原因是在进行析构时没有移除监听事件或者有`setState`或者同步函数正在运行却被打断。解决方式可以见[此博客](https://blog.csdn.net/lovezhuer1/article/details/112624977)。

- `react-native`也可以进行类似于`react`中的本地化存储，但是好像没有`localStorage`，考虑使用第三方组件[`react-native-storage`](https://github.com/sunnylqm/react-native-storage)。

- 在`react-native`中，我们有时候要获取`TextInput`中的输入内容，而在`react-native`中，可以直接通过参数`e`来获取输入内容，这与`react`中需要使用`e.target.value`来获取内容有所不同。

- `react-navigation`的一些常用方法：(当然查看[官网](https://reactnavigation.org/docs)也是很好的)https://www.cnblogs.com/nangezi/p/10701619.html。

- 关于在使用`react-navigation`时如何在进行页面跳转时使得目标页面重绘的问题：
  - 方式1：使用`react-native`中的`DeviceEventEmitter`,使用方式可以参考：https://bbs.huaweicloud.com/blogs/123771。
  - 方式2：使用`react-navigation`中提供的`reset`方法。
  
- 在大二小学期的项目中，用到了极光的信息推送功能，具体配置可以参见如下博客：https://www.cnblogs.com/wuvkcyan/p/10144836.html和https://www.jb51.net/article/121339.htm。

- 关于`react-native`中`ScrollView`组件的使用时设置初始位置的方式：(样例代码如下，主要是使用`onContentSizeChange`接口进行初始位置设置，而且此接口数值设置合理的话不会出现明显的跳动)

  ```js
  <ScrollView
      ref={scrollView => this.scrollView = scrollView}
      onContentSizeChange={() => {
          this._onContentSizeChange();
      }}
  ></ScrollView>
  
  _onContentSizeChange() {
      let initialYScroll = 200;
      this.scrollView.scrollTo({x: 0, y: 100, animated: false});
  };
  ```

- 
