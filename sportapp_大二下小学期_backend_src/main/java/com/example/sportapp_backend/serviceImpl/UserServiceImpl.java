package com.example.sportapp_backend.serviceImpl;

import com.alibaba.fastjson.JSON;
import com.example.sportapp_backend.dao.UserDao;
import com.example.sportapp_backend.entity.*;
import com.example.sportapp_backend.repository.CourseRepository;
import com.example.sportapp_backend.repository.UserRepository;
import com.example.sportapp_backend.service.CourseService;
import com.example.sportapp_backend.service.LikeService;
import com.example.sportapp_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.*;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.sportapp_backend.config.RedisCacheManagerConfig;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.persistence.Id;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@CacheConfig(cacheNames = "myCache")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private LikeService likeService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;
    @Resource(name="redis")
    RedisTemplate redisTemplate;
    //public List<User> users = getAllUser();
    //@Autowired
    //public final List<User> users = userDao.getAllUsers();
    @Override
    //@Cacheable(value="myCache")
     public User checkUser(String username, String password) {
        String key = "myCache::SimpleKey [" + username + "," + password + "]";
        //Object got = redisTemplate.opsForValue().get(Integer.toString(id));
        User.lock.lock();
        Object got = redisTemplate.opsForValue().get(key);
        //String json = JSON.toJSONString(got);
        System.out.println("got=" + got);
        if(got == null) {
            //System.out.println("要查询的id=" + id + "!");
            User ans = userDao.checkUser(username, password);
            //若此时cache中不存在这个对象，则set进去并设置过期时间
            //redisTemplate.opsForValue().set(Integer.toString(id), JSON.toJSONString(ans), 20, TimeUnit.SECONDS);
            if(ans != null){
                redisTemplate.opsForValue().set(key, JSON.toJSONString(ans), 500, TimeUnit.SECONDS);
            }
            User.lock.unlock();
            return ans;
        }
        User.lock.unlock();
        //若cache中存在这直接返回
        return JSON.parseObject(got.toString(), User.class);
    }

    @Override
    public
    int addUser(String nickname, String phone, String password, String sex,String birth) {
        return userDao.addUser(nickname,phone, password,sex,birth);
    }

    @Override
    //@CachePut(value="myCache", key = "#result.id") //同时修改cache和数据库
    public
    int updateUser(
            int userId,
            String nickname,
            String phone,
            String password,
            String sex,
            Date   birth,
            int    state,
            int    exp
    ) {
        System.out.println("进入了updateUser的service层!");
        return userDao.updateUser(
                userId,
                nickname,
                phone,
                password,
                sex,
                birth,
                state,
                exp
        );
    }

    @Override
    //@CacheEvict(value = "myCache", key = "#userId")
    public User removeUser(int userId) {return userDao.removeUser(userId);}

    @Override
    @CacheEvict(value="myCache", key = "#user_id")
    public userPlan addUserPlan(int user_id, int plan_id, int chooseTime)
    {
        return userDao.addUserPlan(user_id, plan_id, chooseTime);
    }

    @Override
    //@Cacheable(value="myCache", key = "#id")
    public User getAUser(int id)
    {
        String key = "myCache::" + id;
        //Object got = redisTemplate.opsForValue().get(Integer.toString(id));
        User.lock1.lock();
        Object got = redisTemplate.opsForValue().get(key);
        //String json = JSON.toJSONString(got);
        System.out.println("got=" + got);
        if(got == null) {
            System.out.println("要查询的id=" + id + "!");
            User ans = userDao.getAUser(id);
            //若此时cache中不存在这个对象，则set进去并设置过期时间
            //redisTemplate.opsForValue().set(Integer.toString(id), JSON.toJSONString(ans), 20, TimeUnit.SECONDS);
            redisTemplate.opsForValue().set(key, JSON.toJSONString(ans), 500, TimeUnit.SECONDS);
            User.lock1.unlock();
            return ans;
        }
        User.lock1.unlock();
        //若cache中存在这直接返回
        return JSON.parseObject(got.toString(), User.class);
    }

    @Override
    @CacheEvict(value = "myCache", key = "#userId")
    public userPlan delUserPlan(int userId, int planId)
    {
        return userDao.delUserPlan(userId, planId);
    }

    public boolean changePwd(String phone, String newPwd){
        return userDao.changePwd(phone, newPwd);
    }

    @Override
    public int register(String phone, String pwd){
        return userDao.register(phone, pwd);
    }

    @Override
    public int addCaring(int userId, int friendId) {return userDao.addCaring(userId, friendId);}

    @Override
    public int removeCaring(int userId, int friendId) {return userDao.removeCaring(userId, friendId);}

    @Override
    @CachePut(value="myCache", key="#id")
    public User changeBasicInfo(int id, int height, int weight, int bmi)
    {
        return userDao.changeBasicInfo(id, height, weight, bmi);
    }

    @Override
    @CachePut(value="myCache", key="#id")
    public User changeBirth(int id, Date birth)
    {
        return userDao.changeBirth(id, birth);
    }

    @Override
    @CacheEvict(value="myCache", key = "#user_id")
    public Favorite addNewFavorite(int user_id, int course_id)
    {
        return userDao.addNewFavorite(user_id, course_id);
    }

    @Override
    @CacheEvict(value="myCache", key = "#user_id")
    public Favorite delFavorite(int user_id, int course_id)
    {
        return userDao.delFavorite(user_id, course_id);
    }

    @Override
    @CacheEvict(value="myCache", key = "#user_id")
    public List<Course> getUserFavorite(int user_id) {
        return userDao.getUserFavorite(user_id);
    }

    @Override
    @CacheEvict(value="myCache", key = "#user_id")
    public User_exercise addNewUserExercise(int user_id, int exercise_id, int chosen_time)
    {
        return userDao.addNewUserExercise(user_id, exercise_id, chosen_time);
    }

    @Override
    @CacheEvict(value="myCache", key = "#user_id")
    public User_exercise endUserExercise(int user_id, int exercise_id, int use_time)
    {
        return userDao.endUserExercise(user_id, exercise_id, use_time);
    }

    @Override
    public int checkPhone(String phone){
        return userDao.checkPhone(phone);
    }

    @Override
    public User getUserByPhone(String phone){
        return userDao.getUserByPhone(phone);
    }

    @Override
    public List<Course> RecommendUserCourse(int id) {
        //List<User> users = userDao.getAllUsers();
        //return userDao.recommend(id, users);
        List<User> users = getAllUser();
        return recommend(id, users);
    }

    @Override
    @Cacheable(value="myCache")
    public List<User> getAllUser() {
        return userDao.getAllUsers();
    }

    @Override
    public double pearson_dis(List<Course> rating1, List<Course> rating2)
    {
        long start = System.currentTimeMillis();
        int n = rating1.size();
        if(n == 0) return 0.0;
        int n1 = rating2.size();
        if(n1 == 0) return 0.0;
        List<Integer> rating1ScoreCollect = new ArrayList<>();
        List<Integer> rating2ScoreCollect = new ArrayList<>();
        for(Course c1 : rating1) {
            List<Target_like> likes1 = likeService.getLikesByTypeId(1, c1.getCourse_id());
            rating1ScoreCollect.add(likes1.size() + 2);
        } //以每个课程被点赞的数量作为评分依据
        for(Course c2 : rating2) {
            List<Target_like> likes2 = likeService.getLikesByTypeId(1, c2.getCourse_id());
            rating2ScoreCollect.add(likes2.size() + 2);
        }
        double Ex= rating1ScoreCollect.stream().mapToDouble(x->x).sum() / n;//计算X的平均值
        double Ey= rating2ScoreCollect.stream().mapToDouble(y->y).sum() / n1;//计算Y的平均值
        double sum1 = 0.0;
        for (Integer value : rating1ScoreCollect) {
            for (Integer integer : rating2ScoreCollect) {
                sum1 += ((value - Ex) * (integer - Ey));
            }
        }
        double sum2 = 0.0;
        for (Integer value : rating1ScoreCollect) {
            sum2 += Math.pow((value - Ex), 2);
        }
        double sum3 = 0.0;
        for (Integer value : rating2ScoreCollect) {
            sum3 += Math.pow((value - Ey), 2);
        }
        double res1 = Math.sqrt(sum2 * sum3);
        long end = System.currentTimeMillis();
        System.out.println("pearson_dis函数耗时为:" + (end - start) + "ms!");
        return sum1 / res1;
    }

    @Override
    public Map<Double, Integer> computeNearestNeighbor(int userId, List<User> users)
    {
        Map<Double, Integer> distances = new TreeMap<>();
        User u1 = userRepository.getUserById(userId);
        List<User> randomUsers = getRandomPartUser(userId, users);
        //for(User uu : randomUsers) System.out.println("userId=" + uu.getUser_id());
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

    @Override
    public List<Course> getUserCoursesByLikes(int userId)
    {
        List<Target_like> likes = likeService.getUserLikes(userId);
        List<Course> ans = new ArrayList<>();
        for(Target_like like : likes) {
            //ans.add(courseRepository.getCourseByLikeId(like.getTarget_id()));
            ans.add(courseService.getACourseById(like.getTarget_id()));
        }
        return ans;
    }

    @Override
    public List<User> getRandomPartUser(int userId, List<User> users)
    {
        List<User> ans = new ArrayList<>();
        for(int i = 0; i < 5; ++i) {
            int randomPos = (int)(Math.random() * (users.size() - 1));
            //System.out.println("randomPos=" + randomPos);
            User u = users.get(randomPos);
            if(!ans.contains(u)) ans.add(u);
        }
        if(ans.size() < 5) {
            int cur = ans.size();
            for(int i = 0; i < 5; ++i) {
                if(cur == 5) break;
                User u = users.get(i);
                if(!ans.contains(u)) {
                    cur++;
                    ans.add(u);
                }
            }
        }
        return ans;
    }

    @Override
    public boolean checkInTheCourseList(int userId, int courseId)
    {
        List<Course> courses = getUserCoursesByLikes(userId);
        for(Course c : courses) {
            if(c.getCourse_id() == courseId) return true;
        }
        return false;
    }

    @Override
    public List<Course> recommend(int userId, List<User> users)
    {
        //找到最近邻
        long start = System.currentTimeMillis();
        Map<Double, Integer> distances = computeNearestNeighbor(userId, users);
        long end = System.currentTimeMillis();
        System.out.println("计算最近邻耗时为:" + (end - start) + "ms!");
        Integer nearest = distances.values().iterator().next();
        System.out.println("最近邻 -> " + nearest);
        long start1 = System.currentTimeMillis();
        User neighborRatings = getAUser(nearest);
        User userRatings = getAUser(userId);
        //System.out.println("用户like的course: -> " + getUserCoursesByLikes(userRatings.getUser_id()));
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
        long end1 = System.currentTimeMillis();
        System.out.println("根据最近邻添加课程耗时:" + (end1 - start1) + "ms!");
        if(recommended.size() == 5) return recommended;
        //Collections.sort(recommended);
        long start2 = System.currentTimeMillis();
        //List<Course> all = courseService.getAllCourses();
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
        long end2 = System.currentTimeMillis();
        System.out.println("随机补全课程耗时为:" + (end2 - start2) + "ms!");
        return recommended;
    }

    @Override
    public User changeUserHeader(int userId, List<MultipartFile> images)
    {
        return userDao.changeUserHeader(userId, images);
    }

}
