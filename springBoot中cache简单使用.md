# `SpringBoot`中`cache`的的简单使用

`SpringBoot`中的cache主要有`Cache`,`Redis`以及`Ehcache`几种，而我在本次后端中暂时使用过的是前两种。本文也主要关注的是前两种`cache`的使用。

1. 普通`Cache`:(只支持**简单的K-V存储**，但是可以额外存储图片视频等(但是这次我并没有尝试))

- 需要引入的依赖：

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-cache</artifactId>
  </dependency>
  ```

- 普通的`cache`主要是通过直接使用`SpringBoot`提供的**注解**进行操作的。主要用到的注解如下：(注：这里的注解在下面的`redis`也会用到并且用法基本一致)

  - `EnableCaching`:用于声明在程序中**开始使用cache**。一般可以用在项目的**启动类**中。在声明此注解之后，在调用使用了`cache`的方法时会先检查`cache`中是否缓存有对应的数据(通过key来检查)，若有则不调用函数直接通过`cache`获取，没有则需要重新调用函数。例如：

    ```java
    @EnableCaching
    @SpringBootApplication
    @CrossOrigin
    public class SportappBackEndApplication {
    
        public static void main(String[] args) {
            SpringApplication.run(SportappBackEndApplication.class, args);
        }
    
    }
    ```

  - `CacheConfig`:一般用在一个**类**中，作用类似于**配置文件**，主要是声明在这个类中用到的`cache`的统一的命名空间(可以理解为就是存储这个类相关的数据的那部分cache的**名称**，同时也可以作为进行查找的**`key`的一部分**)以及一些其他的通用设置。例如：

    ```java
    @Service
    @Transactional
    @CacheConfig(cacheNames = "myCache")//cacheNames这个参数可以同时声明多个名称作为参数，以数组的形式呈现，意思是这部分数据会同时存储到生命的每一块cache中去。如：
    //@CacheConfig(cacheNames={"myCahce", "myCache1",....})
    public class UserServiceImpl implements UserService {
    .....
    }
    ```

  - `Cacheable`:一般用在一个**方法**上面，用于声明这个函数的返回值是要被放入`cache`中去的，(前提是使用了`EnableCaching`),**主要**有两个参数，一个是**`value(cacheNames)`**,主要是声明返回值是要被放入哪个(些)cache块中去；另外一个为**`key`**,主要是声明存入`cache`的数据的主键。`key`这个参数值一般为**函数参数的一部分**，也可以不指定，则系统会根据参数进行自动组合来回去一个`key`。例如：

    ```java
    @Override
    @Cacheable(value="likeCache", key="#id")
    public List<Target_like> getUserLikes(int id)
    {
        System.out.println("获取用户" + id + "的点赞信息!");
        return likeDao.getUserLikes(id);
    }
    ```

  - `CachePut`:参数和上一个注解类似，主要是声明在**可能修改磁盘内容的函数**上面。这个注解的意思是在进行磁盘修改的同时，不清空cache，而是**同步的修改cache**。但是要注意的是**修改前的类型和要添加的类型必须一样**，否则会报错。由于只支持简单的键值存储，所以想向`cache`中的`List,set`等数据结构中添加新的元素是不能实现的(因为加之前是list，加的内容是一个实例化对象。)这部分个人没有理解明白，在此次添加`cache`过程中也没有使用。

  - `CacheEvict`:参数与上面的类似，主要是声明在一个函数上面，主要意思是要在函数返回时清空**对应的**`cache`并重新拉取对应的内容。在这个注解中，`value`参数主要是声明要`evict`的cache的名称，而`key`参数主要是声明要删除这个名称的cache空间里面的那一部分cache。(因为一个cache命名空间中可能存储多个结构类似但是主键不同的内容)，若不声明`key`,则清空这个`value`中的所有缓存内容。(因为这次的系统一对多关联较多，怕出问题，所以当修改其中某一项时我是直接使用了`CacheEvict`)例如：

  - ```Java
    @Override
    @CacheEvict(value="myCache", key = "#user_id")//这里是要evict掉myCache::user_id的缓存内容。
    public Favorite addNewFavorite(int user_id, int course_id)
    {
        return userDao.addNewFavorite(user_id, course_id);
    }
    ```

  - 上述只是记录了我暂时用到的参数以及注解，更详细的参数信息可以参考如下博客：https://blog.csdn.net/qq_42038623/article/details/120889008。

2. `Redis Cache`（主要支持`KV`存储，同时也支持`List,Set,Hash`等数据结构的存储(暂时来看好像是不支持`Pair`的。。。)）

- 本地安装`redis`：https://github.com/MicrosoftArchive/redis/releases, 选择对应的`msi`文件，在本地运行安装就行了。

- 需要引入的依赖：

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-cache</artifactId>
  </dependency>
  <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-cache</artifactId>
  </dependency>
  <dependency>
  	  <groupId>org.apache.commons</groupId>
  	  <artifactId>commons-lang3</artifactId>
        <version>3.12.0</version>
  </dependency>
  ```

- 在`application.proptites`中做如下修改：

  ```properties
  # 默认为0
  spring.redis.database=0
  spring.redis.host=127.0.0.1
  spring.redis.port=6379
  # 密码默认为空
  spring.redis.password=
  spring.redis.timeout=5000ms
  
  spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true
  spring.jpa.open-in-view=true
  ```

- 添加相关的`redis`配置类：

  ```java
  @Configuration
  public class RedisCacheManagerConfig {
      @Bean(name="redis")
      public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
          RedisTemplate<String, Object> template = new RedisTemplate<>();
          template.setConnectionFactory(factory);
          Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
          ObjectMapper om = new ObjectMapper();
          om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
          om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL);
          jackson2JsonRedisSerializer.setObjectMapper(om);
          StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
  
          //key 采用的String 的序列化方式
          template.setKeySerializer(stringRedisSerializer);
          //hash的key也采用String的序列化方式
          template.setHashKeySerializer(stringRedisSerializer);
          //value 序列化方式采用jackson
          template.setValueSerializer(stringRedisSerializer);
          //hash 的 value序列化方式采用jackson
          template.setHashKeySerializer(jackson2JsonRedisSerializer);
          template.afterPropertiesSet();
          template.afterPropertiesSet();
          return template;
      }
  
  
      @Bean
      RedisCacheWriter writer(RedisTemplate<String, Object> redisTemplate) {
          return RedisCacheWriter.nonLockingRedisCacheWriter(Objects.requireNonNull(redisTemplate.getConnectionFactory()));
      }
  
      @Bean
      CacheManager cacheManager(RedisCacheWriter writer) {
          RedisSerializer<String> redisSerializer = new StringRedisSerializer();
          Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
  
          Map<String, RedisCacheConfiguration> configurationMap = new HashMap<>();
  
          // 配置序列化（解决乱码的问题）
          RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                  .entryTtl(Duration.ofHours(1))//time
                  .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                  .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                  .disableCachingNullValues();
  
          //此处可以自定义缓存空间的缓存的过期时间，可以根据自己实际情况进行设置，也可以不设置，用统一过期时间
          //configurationMap.put("test-controller", config.entryTtl(Duration.ofSeconds(200)));
  
          //解决查询缓存转换异常的问题
          ObjectMapper om = new ObjectMapper();
          om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
          om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
          jackson2JsonRedisSerializer.setObjectMapper(om);
  
          return RedisCacheManager.builder(writer)
                  .initialCacheNames(configurationMap.keySet())
                  .withInitialCacheConfigurations(configurationMap)
                  //统一配置缓存空间的过期时间为500s
                  .cacheDefaults(config.entryTtl(Duration.ofSeconds(500)))
                  .build();
      }
      @Bean
      public FilterRegistrationBean registerOpenSessionInViewFilterBean() {
          FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
          filterRegistrationBean.setFilter(new OpenEntityManagerInViewFilter());
          filterRegistrationBean.setOrder(-10);
          filterRegistrationBean.setEnabled(true);
          filterRegistrationBean.addUrlPatterns("/*");
          Map<String, String> initParameters = Maps.newHashMap();
          initParameters.put("excludes", "/favicon.ico,/img/*,/js/*,/css/*,/webjars/*,/druid/*,/static/*");
          filterRegistrationBean.setInitParameters(initParameters);
          return filterRegistrationBean;
      }
  }
  ```

- 使用**注解进行数据的缓存**：
  - 用到的注解基本就是普通`cache`中提到的那一些。并且用法类似。

- 使用**非注解(直接使用代码)进行缓存**:

  - 在使用过程中发现，在直接使用`redis`注解进行`cache`时，一般的数据不会出问题，但是**对于entity中存在一对多(多对多、一对一、多对一)关系的数据**，会出现**可以成功存入`redis`但是获取却报错**的情况。具体的报错信息为`Can't initalize a collection, can't initialize a proxy - no session(through chain:.....)`。这个问题网上大部分解答说是`Lazy`获取出了问题，说要使用`@JsonIgnore`,但是`ignore`则会对我的系统产生较大影响，故舍弃。后续通过较长时间的探索，最终的解决方式如下：(参考博客为：https://www.jianshu.com/p/34e8b21b61fb)

    - 首先修改之前的配置文件(其实上面的是已经改好了的)：

      ```java
      。。。。。
      //key 采用的String 的序列化方式
      template.setKeySerializer(stringRedisSerializer);
      //hash的key也采用String的序列化方式
      template.setHashKeySerializer(stringRedisSerializer);
      //value 序列化方式采用jackson
      template.setValueSerializer(stringRedisSerializer);//由jackson2JsonRedisSerializer修改为stringRedisSerializer
      //hash 的 value序列化方式采用jackson
      template.setHashKeySerializer(jackson2JsonRedisSerializer);
      。。。。。
      ```

    - 之后通过**非注解**的方式来进行缓存的存储与获取：(主要使用了两种，一种是[`opsforValues()`](https://blog.csdn.net/m0_55208404/article/details/113728643),一种是[`opsforList()`](https://blog.csdn.net/weixin_43658899/article/details/121040307),详细使用可以看一下链接)

    - 注：`opsforValue`可以直接通过set函数的参数的方式进行过期时间的设置，但是`opsforList`好像不行，可以使用`RedisTemplate,expire(ket, timeout, Type)`进行额外的过期时间配置，key就是要过期的键的名称，timeout是具体的过期时间。
    
    - 对对应的实体类做如下注解修饰：
    
      ```java
      @Data
      @Entity
      @Proxy(lazy = false)
      @Table(name = "users")
      @JsonIgnoreProperties(value = {"handler","fieldHandler"})
      @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "user_id")
      public class User implements Serializable {
      ....
      }
      ```
    
    - 对对应的`service`实现层加注解`@Transactional`:
    
      ```java
      @Service
      @Transactional
      @CacheConfig(cacheNames = "myCache")
      public class UserServiceImpl implements UserService {
      ....
      }
      ```
    
    - ```java
      @Override
      //@Cacheable(value="myCache", key = "#id")
      public User getAUser(int id)
      {
          String key = "myCache::" + id;//按照之前提到的命名格式命名，可以统一进行evict，put等操作
          //Object got = redisTemplate.opsForValue().get(Integer.toString(id));
          Object got = redisTemplate.opsForValue().get(key);
          //String json = JSON.toJSONString(got);
          System.out.println("got=" + got);
          if(got == null) {
              System.out.println("要查询的id=" + id + "!");
              User ans = userDao.getAUser(id);
              //若此时cache中不存在这个对象，则set进去并设置过期时间
              //redisTemplate.opsForValue().set(Integer.toString(id), JSON.toJSONString(ans), 20, TimeUnit.SECONDS);
              redisTemplate.opsForValue().set(key, JSON.toJSONString(ans), 500, TimeUnit.SECONDS);
              return ans;
          }
          //若cache中存在这直接返回
          return JSON.parseObject(got.toString(), User.class);//注意使用JSON进行类型转化的方式
      }
      ```
    
    - ```java
      @Override
      //@Cacheable(value="courseCache", key="#cur")
      public List<Course> getPartCourse(int cur, int size)
      {
          String key = "partCourse::" + cur;
          long len = redisTemplate.opsForList().size(key);
          if(len == 0) {
              System.out.println("开始获取部分课程信息，起点为：cur=" + cur + "!");
              List<Course> ans = courseDao.getPartCourse(cur, size);
              //redisTemplate.opsForList().rightPushAll(key, JSON.toJSONString(ans));
              for(Course c : ans) {
                  redisTemplate.opsForList().rightPush(key, JSON.toJSONString(c));
              }
              return ans;
          }
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
    
    - 可以成功访问和存储了。