package com.example.sportapp_backend.service;
import com.example.sportapp_backend.entity.Course;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    List<Course> getCoursesByType(int type1, int type2);
    List<Course> getCoursesByTwoType(int type1, int type2);
    List<Course> getPartCourse(int cur, int size);
    Course getACourseById(int courseId);
}
