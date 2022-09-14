package com.example.sportapp_backend.serviceImpl;
import com.alibaba.fastjson.JSON;
import com.example.sportapp_backend.dao.CourseDao;
import com.example.sportapp_backend.entity.Course;
import com.example.sportapp_backend.entity.User;
import com.example.sportapp_backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class CourseServiceImpl implements CourseService{
    @Autowired
    CourseDao courseDao;
    @Resource(name="redis")
    RedisTemplate redisTemplate;

    @Override
    //@Cacheable(value="courseCache")
    public List<Course> getAllCourses()
    {
        //System.out.println("获取全部课程信息!");
        //return courseDao.getAllCourses();
        String key = "AllCourse";
        //Course.lock.lock();
        long len = redisTemplate.opsForList().size(key);
        if(len == 0) {
            System.out.println("开始获取所有课程信息!");
            List<Course> ans = courseDao.getAllCourses();
            //redisTemplate.opsForList().rightPushAll(key, JSON.toJSONString(ans));
            for(Course c : ans) {
                redisTemplate.opsForList().rightPush(key, JSON.toJSONString(c));
            }
            redisTemplate.expire(key, 500, TimeUnit.SECONDS); //设置过期时间
            //Course.lock.unlock();
            System.out.println("从数据库中获取到了!");
            return ans;
        }
        //Course.lock.unlock();
        Object got = redisTemplate.opsForList().range(key, 0, len - 1);
        //System.out.println("got=" + got);
        List<Course> ans = new ArrayList<>();
        for(Object o : (List<?>) got) {
            //System.out.println("o=" + o.toString());
            ans.add(JSON.parseObject(o.toString(), Course.class));
        }
        System.out.println("从cache中获取到了!");
        return ans;
    }

    @Override
    public List<Course> getCoursesByType(int type1, int type2)
    {
        return courseDao.getCoursesByType(type1, type2);
    }

    @Override
    public List<Course> getCoursesByTwoType(int type1, int type2)
    {
        return courseDao.getCoursesByTwoType(type1, type2);
    }

    @Override
    //@Cacheable(value="courseCache", key="#cur")
    public List<Course> getPartCourse(int cur, int size)
    {
        String key = "partCourse::" + cur;
        Course.lock.lock();
        long len = redisTemplate.opsForList().size(key);
        if(len == 0) {
            System.out.println("开始获取部分课程信息，起点为：cur=" + cur + "!");
            List<Course> ans = courseDao.getPartCourse(cur, size);
            //redisTemplate.opsForList().rightPushAll(key, JSON.toJSONString(ans));
            for(Course c : ans) {
                redisTemplate.opsForList().rightPush(key, JSON.toJSONString(c));
            }
            redisTemplate.expire(key, 500, TimeUnit.SECONDS); //设置过期时间
            Course.lock.unlock();
            System.out.println("从数据库中获取到了!");
            return ans;
        }
        Course.lock.unlock();
        Object got = redisTemplate.opsForList().range(key, 0, len - 1);
        //System.out.println("got=" + got);
        List<Course> ans = new ArrayList<>();
        for(Object o : (List<?>) got) {
            //System.out.println("o=" + o.toString());
            ans.add(JSON.parseObject(o.toString(), Course.class));
        }
        System.out.println("从cache中获取到了!");
        return ans;
    }

    @Override
    public Course getACourseById(int id)
    {
        String key = "ACourse::" + id;
        Object got = redisTemplate.opsForValue().get(key);
        System.out.println("got=" + got);
        if(got == null) {
            System.out.println("要查询的id=" + id + "!");
            Course ans = courseDao.getACourseById(id);
            //若此时cache中不存在这个对象，则set进去并设置过期时间
            //redisTemplate.opsForValue().set(Integer.toString(id), JSON.toJSONString(ans), 20, TimeUnit.SECONDS);
            redisTemplate.opsForValue().set(key, JSON.toJSONString(ans), 100, TimeUnit.SECONDS);
            return ans;
        }
        //若cache中存在这直接返回
        return JSON.parseObject(got.toString(), Course.class);
    }
}
