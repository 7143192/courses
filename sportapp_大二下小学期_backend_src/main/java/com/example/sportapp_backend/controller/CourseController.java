package com.example.sportapp_backend.controller;
import com.example.sportapp_backend.entity.Course;
import com.example.sportapp_backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CourseController {
    @Autowired
    CourseService courseService;

    @RequestMapping("/getAllCourses")
    public @ResponseBody
    List<Course> getAllCourses()
    {
        return courseService.getAllCourses();
    }

    @RequestMapping("/getCoursesByType")
    public @ResponseBody List<Course> getCoursesByType(@RequestParam(name="type1", required = false, defaultValue = "0")
                                                                   int type1,
                                                       @RequestParam(name="type2", required = false, defaultValue = "0")
                                                               int type2)
    {
        //缺省值为 0 ，表示这个组合没有选择，前端传回来的数字每一位都是从 1 开始的
        return courseService.getCoursesByType(type1, type2);
    }

    @RequestMapping("/getCoursesByTwoType")
    public @ResponseBody List<Course> getCoursesByTwoType(@RequestParam("type1") int type1,
                                                          @RequestParam("type2") int type2)
    {
        return courseService.getCoursesByTwoType(type1, type2);
    }

    @RequestMapping("/getPartCourse")
    public @ResponseBody List<Course> getPartCourse(@RequestParam("cur") int cur,
                                                    @RequestParam("size") int size)
    {
        return courseService.getPartCourse(cur, size);
    }
}
