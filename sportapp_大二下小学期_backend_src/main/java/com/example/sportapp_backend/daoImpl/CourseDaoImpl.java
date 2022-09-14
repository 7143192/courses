package com.example.sportapp_backend.daoImpl;
import com.example.sportapp_backend.dao.CourseDao;
import com.example.sportapp_backend.entity.Course;
import com.example.sportapp_backend.entity.Exercise;
import com.example.sportapp_backend.repository.CourseRepository;
import com.example.sportapp_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Repository
public class CourseDaoImpl implements CourseDao{
    @Autowired
    CourseRepository courseRepository;

    @Override
    public List<Course> getAllCourses()
    {
        return courseRepository.getAllCourses();
    }

    @Override
    public List<Course> getCoursesByType(int type1, int type2)
    {
        return courseRepository.getCoursesByType(type1, type2);
    }

    @Override
    public List<Course> getCoursesByTwoType(int type1, int type2)
    {
        return courseRepository.getCoursesByTwoType(type1, type2);
    }

    @Override
    public Course getACourseById(int courseId)
    {
        return courseRepository.getOne(courseId);
    }

    @Override
    public List<Course> getPartCourse(int cur, int size)
    {
        /*List<Course> all = getAllCourses();
        int len = all.size(); //获取所有跟练课程的数目
        List<Course> ans = new ArrayList<>();
        int pos = 0;
        int num = 0;
        for(Course e : all) {
            if(pos < cur){
                pos++;
                continue;
            }
            if(pos == len || num == size) break;
            pos++;
            ans.add(e);
            num++;
        }*/
        //List<Course> ans = courseRepository.getPartCourseByPos(cur, size);
        List<Course> ans = courseRepository.getLimitedCourse(cur, size);
        //System.out.println("ans=" + ans);
        return ans;
    }
}
