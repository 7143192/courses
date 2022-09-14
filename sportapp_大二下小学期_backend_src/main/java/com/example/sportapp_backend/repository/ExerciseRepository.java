package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
//import javax.transaction.Transactional;
import java.util.List;
public interface ExerciseRepository extends JpaRepository<Exercise, Integer>{
    @Query(value="from Exercise where exercise_id > :cur and exercise_id <= (:cur + :size)")
    List<Exercise> getPartExerciseByPos(@Param("cur") int cur, @Param("size") int size);
    @Query(value = "select * from exercise_course where exercise_id > :cur limit :size",
            nativeQuery = true)
    List<Exercise> getLimitedExercise(@Param("cur") int cur, @Param("size") int size);
}
