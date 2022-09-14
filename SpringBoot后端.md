# `SpringBoot`后端注意事项

- 在创建新的Spring项目时，在加载新的`start.spring.io`时会总是遇到`connect time out`等问题，解决方式为将`start.spring.io`改为**`start.springboot.io`**即可。

- (一个前后端连接问题)在RN前端使用`fetch`时会出现`TypeError: NetWork Request Failed`之类的错误，这个错误是由于**手机端无法访问电脑端对应的后端端口**导致的，得到的解决办法为：首先通过`USB`连接手机，在`adb devices`能够检测到端口后，命令行运行`adb reverse tcp:8080 tcp:8080`来将手机上的8080端口**映射**为PC端的8080端口，从而使得在连接条件下可以在前端通过访问`localhost`来访问后端。

- 若不使用上述方式进行映射，则在前端进行`fetch`操作时，必须要保证请求端口不是`localhost`而是本机的`IP`地址。（`IP`地址可以在命令行中运行`ipconfig`来获取。）

- 在使用`HTTP`发送`url`时，要注意`+`等特殊字符不能直接发送，需要在前端进行解析之后在发送，可以使用**`encodeURIComponent`**进行解析。

- 关于如何使用`postman`来测试参数为`object`的后端接口：需要在写请求时，在**`body`**栏将数据以`json`的格式写入作为参数传递就可以了。

- 关于`Spring Boot`后端接口参数的`annotation`的使用问题：

  - 尽量不要使用`@Param`，因为这可能导致错误:`Optional int parameter 'XX（参数名）' is present but cannot be translated into a null value`。
  - 使用`annotation @RequestParam`时，前端向后端应该发送类似于`http://localhost:8080/XXXXX(路径名)?XX(参数名)=mmm&.....`之类的请求。
  - 当后端的接口的要求的参数为一个`Object`时，需要在这个参数上面使用`annotation @RequestBody`来接收参数，并且前端需要以`JSON(.stringify)`的格式传递参数。

- 在运行`Spring Boot`后端时，出现`XXXXX(包名) java.lang.NoSuchFieldError:YYYYY(方法名)`之类的报错，一般的出错原因是`pom.xml`中出现了包依赖之间的冲突。相似的解决方式可以参考[此博客](https://blog.csdn.net/weixin_48437239/article/details/125396131)。

- 在`entity`中实现了`OneToMany`关系(或者其他那些)时，有两种`fetch`的方式，一种为**`lazy`**,一种为**`eager`**,这部分内容要注意一个细节，就是想要使用`LAZY-Fetch`时，(即**不在**获取这个实例的时候就拉取关联数据)`entity`中不能使用`@Data`的`annotation`,使用了这个关键字即使声明了`LAZY`也没有用。

- 后端实现**基于用户的智能推荐**算法：参考文章：https://blog.csdn.net/m0_67393827/article/details/125399025。主要思路是通过计算**皮尔逊距离((线性)相关系数)**来判断变量之间的相关性。基于用户的协同过滤则主要是通过计算当前登录用户相关信息(如课程点赞信息，个人信息等)与其他用户的对应信息的相关系数来找到**最近邻(与当前用户相关性最大的用户)**,并通过最近邻的相关数据为当前用户做出推荐。以下为实现的基于课程点赞数量的智能推荐过程：

  ```java
  public double pearson_dis(List<Course> rating1, List<Course> rating2)
  {
      int n = rating1.size();
      if(n == 0) return 0.0;
      int n1 = rating2.size();
      if(n1 == 0) return 0.0;
      List<Integer> rating1ScoreCollect = new ArrayList<>();
      List<Integer> rating2ScoreCollect = new ArrayList<>();
      for(Course c1 : rating1) {
          List<Target_like> likes1 = likeRepositoery.getLikeNumByTypeId(1, c1.getCourse_id());
          rating1ScoreCollect.add(likes1.size() + 2);
      } //以每个课程被点赞的数量作为评分依据
      for(Course c2 : rating2) {
          List<Target_like> likes2 = likeRepositoery.getLikeNumByTypeId(1, c2.getCourse_id());
          rating2ScoreCollect.add(likes2.size() + 2);
      }
      //采用上面的参考文章中的 公式三 进行计算,因为用于计算的两个用户点赞信息数量可能不同，所以最好不用公式四。
      double Ex= rating1ScoreCollect.stream().mapToDouble(x->x).sum() / n;//计算X的平均值(X_)
      double Ey= rating2ScoreCollect.stream().mapToDouble(y->y).sum() / n1;//计算Y的平均值(Y_)
      double sum1 = 0.0;
      for (Integer value : rating1ScoreCollect) {
          for (Integer integer : rating2ScoreCollect) {
              sum1 += ((value - Ex) * (integer - Ey));
          }
      }//计算(X-X_)*(Y-Y_)的和
      double sum2 = 0.0;
      for (Integer value : rating1ScoreCollect) {
          sum2 += Math.pow((value - Ex), 2);
      }//计算(X-X_)^2的和
      double sum3 = 0.0;
      for (Integer value : rating2ScoreCollect) {
          sum3 += Math.pow((value - Ey), 2);
      }//计算(Y-Y_)^2的和
      double res1 = Math.sqrt(sum2 * sum3);//做开根号处理
      return sum1 / res1;//计算 线性 相关系数
  ```

- ```java
  public Map<Double, Integer> computeNearestNeighbor(int userId, List<User> users)//计算最近邻
  {
      Map<Double, Integer> distances = new TreeMap<>();//采用TreeMap数据结构进行存储，自动进行排序
      User u1 = userRepository.getUserById(userId);
      List<User> randomUsers = getRandomPartUser(userId, users);//为提高随机程度，在每次重新判断当前用户的最近邻时，都随机生成一个新的用户判断的用户集合。
      for (User u2 : randomUsers) {
          if (u2.getUser_id() != u1.getUser_id()) {
              List<Course> list1 = getUserCoursesByLikes(u2.getUser_id());
              List<Course> list2 = getUserCoursesByLikes(u1.getUser_id());
              double distance = pearson_dis(list1, list2);
              distances.put(distance, u2.getUser_id());
          }
      }
      System.out.println("该用户与其他用户的皮尔森相关系数 -> " + distances);
      return distances;
  }
  ```

- ```java
  public List<Course> recommend(int userId, List<User> users)//生成推荐数据
  {
      //找到最近邻
      Map<Double, Integer> distances = computeNearestNeighbor(userId, users);
      Integer nearest = distances.values().iterator().next();
      System.out.println("最近邻 -> " + nearest);
      //找到最近邻like过但是当前用户没有like过的课程信息
      User neighborRatings = new User();
      for (User user:users) {
          if (nearest == user.getUser_id()) {
              neighborRatings = user;
          }
      }
      User userRatings = new User();
      for (User user:users) {
          if (userId == user.getUser_id()) {
              userRatings = user;
          }
      }
      //根据判断出来的最近邻用户信息来生成推荐数据
      List<Course> recommended = new ArrayList<Course>();
      for (Course course : getUserCoursesByLikes(neighborRatings.getUser_id())) {
          if (!checkInTheCourseList(userRatings.getUser_id(), course.getCourse_id())) {
              recommended.add(course);
          }
      }
      if(recommended.size() > 5) {
          List<Course> res = new ArrayList<>();
          for(int i = 0; i < 5; ++i) res.add(recommended.get(i));
          return res;
      }
      if(recommended.size() == 5) return recommended;
      List<Course> all = courseRepository.findAll();
      for(int j = recommended.size(); j < 5; ++j) {
          int pos = (int)(Math.random() * (all.size() - 1));
          System.out.println("j=" + j + "时对应的随机出来的pos=" + pos);
          Course c = all.get(pos);
          if(!recommended.contains(c)) recommended.add(c);
      } //若不足5个，进行随机数模拟进行抽取
      if(recommended.size() < 5) {//考虑到随机数可能存在随机到相同结果的情况，若获取的数据仍然少于5个，则直接添加至5个
          int pos = recommended.size();
          for(int i = 0; i < 5; ++i) {
              if(pos == 5) break;
              Course c = all.get(i);
              if(!recommended.contains(c)) {
                  recommended.add(c);
                  pos++;
              }
          }
      }
      return recommended;
  }
  ```

- `MYSQL`数据库可能的优化：可以参看以下文章：https://blog.csdn.net/wuxianbing2012/article/details/122960591。对于索引操作，注意**主键不是一种索引**，并且最好不要在`update/insert/delete`操作较多的列上面做`Index`。`SpringBoot`项目后端添加`Index`的格式可以参考如下文章：https://blog.csdn.net/weixin_42176087/article/details/119248077。

- `SpringBoot`后端项目在使用`mvn package`进行编译时，有时会出现`Failed to execute goal io.spring.javaformat:spring-javaformat-maven-plugin:0.0.31:validate (default) on project 项目名: Execution default of goal io.spring.javaformat:spring-javaformat-maven-plugin:0.0.31:validate failed`之类的错误，解决方式：1.修改使用的`JDK`版本为11,(要修改环境变量)2.**在`pom.xml`文件中删除`spring-javaformat-maven`对应的`plugin`项即可**。

- 记录一个对于`MYSQL`数据库优化讲解比较详细的博客：https://blog.csdn.net/wuxianbing2012/article/details/122960591。

- `MYSQL`中`SELECT`语句具体的执行顺序：首先是`SELECT`,之后**不会**先执行要查找的具体内容，而是先执行`FROM`等条件判断语句。条件判断的执行顺序为:`FROM > WHERE > GROUP BY > HAVING > ORDER BY > OFFSET FETCH`。同时，`SELECT`中要查找的具体内容中也会先执行其中的`DISTINCT,TOP`等。

- `MYSQL`优化的第一方面为**减少`CPU`的负载**。即尽可能的减小`CPU`的被要求的运算量。而在`SQL`语句中，`GROUP BY,ORDER BY, TOP, DISTINCT, LIMIT`等都会提高运算密度。而要想实现此类型的优化而不改变原有操作(如排序等),可以考虑：

  - 降低问题规模，使得要获取的数据规模尽可能的小。
  - 通过索引加快排序。

- `MYSQL`优化的第二方面为**减少`IO`操作的数量**。而`JOIN, NULL, OR`等操作会增加`IO`在运行语句时的执行次数。
  - 通过尽可能地减少`JOIN`操作次数来优化。而对于大量`JOIN`不可避免的问题，则可以考虑尽可能地降低问题规模，即减少笛卡尔积的结果的规模。
  - 用到`OR`的地方可以用`union/union all`来代替。
  - 尽量减少数据表中`NULL`的字段数量。

- 在设计`MYSQL`数据表时，应该尽可能地避免`NULL,VARCHAR,FLOAT`等类型的数据。同时，每一个字段的具体数据也不能过长，`MYSQL`一行内容的**最大字节数为8020**。超过则会使用多与一行来存储，而导致性能下降。

- 关于将一个`SpringBoot`项目打包成`jar`包，有**通过`IDEA`打包**和**通过`maven`打包**两种方式。具体方式可以参考如下博客：https://www.jb51.net/article/250276.htm。