# `SportApp-Jmeter`性能测试以及优化

1. `Jmeter`的使用：

- `Jmeter`使用主要分为两部分，一部分是**通过GUI进行简单调试**，一部分是**通过命令行进行压力测试**。
- 关于`Jmeter`安装以及GUI的简单使用，可以参考[这个博客](https://blog.csdn.net/bin0503/article/details/123543484)。
- 若一个`Thread Group`里面有多个`HTTP Request`的时候，可以考虑添加`HTTP Request Defaults`来统一配置请求类型以及请求接口等信息。
- 要想使得不同`HTTP Request`之间有一定的时间间隔，可以考虑在两个`Request`之间插入一个`Timer`来配置间隔时间。
- 若想通过`JSON`进行参数传递，则要在最开始时添加`HTTP Header Manger`，并添加`Content-Type:application/json`。
- 关于`Jmeter`命令行的使用：
  - 使用形如`D:/apache-jmeter-5.4.3/apache-jmeter-5.4.3/bin/jmeter -n -t test1.jmx -l log1.jtl`来执行`test1.jmx`中的压力测试，并将结果写入`log1.jtl`文件中去。命令中的`D:/...`是`jmeter`脚本的路径。
  - 使用形如`D:/apache-jmeter-5.4.3/apache-jmeter-5.4.3/bin/jmeter -g log1.jtl -o report1`将记录在`log1.jtl`中的结果转化为`HTML`的格式进行展示，注意，要保证`report1`**文件夹**必须要是**空的或者不存在**。 
- 关于`Jmeter`如何模拟多个不同用户的并发，可以参见如下博客介绍：https://blog.csdn.net/weixin_44079378/article/details/126119469，http://t.zoukankan.com/testerhappy-p-9037093.html。
  - 进行多用户并发模拟，通过实践来看我比较倾向于使用`CSV data set Config`进行配置，具体的配置方法可以参考上述连接。注意，创建的`CSV Config`要放在对应的`HTTP Request`下面。

2. `SpringBoot`进行**大线程数**性能测试的注意事项:

- `SpringBoot`中内置的`tomcat`容器默认的最大线程数为**200**，一般进行单机运行调试时不会出现问题。

- 但是要通过`Jmeter`等工具进行大型压力测试，如2000个`thread`或更多的情况下，`tomcat`默认的最大线程数太少了，竞争太激烈，会导致性能测试结果过差，所以需要手动的配置新的属性。具体配置为在`application.propities`文件中添加：

  ```properties
  server.tomcat.uri-encoding=UTF-8 //设置放松请求的编码格式
  server.tomcat.max-threads=2000 //设置tomcat容器的允许的最大线程数
  server.tomcat.accept-count=800 //设置tomcat容器允许的最大等待数，即消息队列能够容纳的最大数量
  #server.tomcat.max-connections=2000 //设置tomcat容器的最大连接数，一般要大于上面两项之和，内置的tomcat默认值为10000，一般可以不重新配置
  ```

- 在配置`Jmeter`参数时，线程的总上线时间要设置合理，若线程太多但是总时间给的太少也不好。

3. 优化：

- `getPartCourse`接口：考虑到系统中的课程不会被人为的修改，所以在做分页拉取时，直接在持久层通过主键值来判断想要的结果的范围，而不再后端重新做操作，来减少循环数量；另外在`service`层通过加锁的方式使得与数据库的交互次数只为1次，之后的次数都是直接访问cache;添加了过期时间。代码如下：

  ```java
  @Override
  public List<Course> getPartCourse(int cur, int size)
  {
      String key = "partCourse::" + cur;
      Course.lock.lock();
      long len = redisTemplate.opsForList().size(key);
      if(len == 0) {
          System.out.println("开始获取部分课程信息，起点为：cur=" + cur + "!");
          List<Course> ans = courseDao.getPartCourse(cur, size);
          for(Course c : ans) {
              redisTemplate.opsForList().rightPush(key, JSON.toJSONString(c));
          }
          Course.lock.unlock();
          return ans;
      }
      Course.lock.unlock();
      Object got = redisTemplate.opsForList().range(key, 0, len - 1);
      System.out.println("got=" + got);
      List<Course> ans = new ArrayList<>();
      for(Object o : (List<?>) got) {
          System.out.println("o=" + o.toString());
          ans.add(JSON.parseObject(o.toString(), Course.class));
      }
      return ans;
  }
  ```

- `getPartCourseComment`接口：暂时没有想出优化方案，而且使用了`pair`,不好使用`redis cache`。

- `getAUser/checkUser`接口：加锁，限制与数据库交互次数，但是性能变化不大。

- `addComment`接口：由于允许同一个用户或者不同用户发表重复多个的评论，所以暂时来看并不涉及并发时的冲突问题。且性能可以，同时由于涉及到数据库的写操作，所以平均下来较慢于直接查询。
- `getPartExercise`接口：与`course`；类似，直接通过数据库去拿要的数据；在`controller`层加锁，保证只有一个线程与数据库交互，其余线程都从`cache`中获取，但是发现这是一个“负优化”。。。还变的比没有加锁的时候慢了，通过打印信息判断式最开始并行线程较拥挤，加了锁锁的竞争过大，导致时间变长了。
- `addNewLike`接口/`removeLike`接口：遇到的问题是将`add`与`remove`操作发在一个线程组里面可能会出现500错误。暂时来看是放在同一个线程组中运行时出现了并发顺序错误的问题而导致出现一定数量的错误。但是分开测试就没有上述问题。考虑到前端用户是在点赞之后才能取消点赞，所以这个问题不予考虑。分开测试之后的性能较好。
- `addUserPlan`接口：平均1秒不到，感觉挺好。。。`delUserPlan`接口：感觉挺好。。
- `insertRecord`接口：由于要同时写入`MYSQL`与`InfluxDB`两个数据库，所以可能会导致其性能弱于普通的插入。但是从测试来看，其性能并不稳定，有时很好，平均0.1秒，最大1.1秒，有时平均1.2秒，最大达到了6秒。
- `getPartUserRecord`接口：