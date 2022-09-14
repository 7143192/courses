package com.example.sportapp_backend.dao;
import com.example.sportapp_backend.entity.Course;

import java.util.List;

public interface CourseDao {
    List<Course> getAllCourses();
    List<Course> getCoursesByType(int type1, int type2);
    List<Course> getCoursesByTwoType(int type1, int type2);
    List<Course> getPartCourse(int cur, int size);
    Course getACourseById(int courseId);
}
