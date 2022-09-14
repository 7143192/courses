package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface CourseRepository extends JpaRepository<Course, Integer>{
    @Query("select c from Course c")
    List<Course> getAllCourses();

    @Query("from Course where type1 = :type1 or type2 = :type2")
    List<Course> getCoursesByType(@Param("type1") int type1,
                                  @Param("type2") int type2);

    @Query("from Course where type1 = :type1 and type2 = :type2")
    List<Course> getCoursesByTwoType(@Param("type1") int type1,
                      @Param("type2") int type2);

    @Query("from Course where course_id > :cur and course_id <= (:cur + :size)")
    //考虑到本系统课程信息不会人为的修改，所以直接在持久层通过主键id来获取想要的数据段而不再后端做额外的处理
    List<Course> getPartCourseByPos(@Param("cur") int cur, @Param("size") int size);

    @Query("from Course where course_id = :id")
    Course getCourseByLikeId(@Param("id") int id);

    @Query(value = "select * from courses where course_id > :cur limit :size",
            nativeQuery = true)
    List<Course> getLimitedCourse(@Param("cur")int cur, @Param("size")int size);
}
