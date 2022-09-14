package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.User_exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
//import javax.transaction.Transactional;
import java.util.List;
public interface UserExerciseRepository extends JpaRepository<User_exercise, Integer>{
    @Query("from User_exercise where user_id = :user_id and exercise_id = :exercise_id and finish = 0")
    List<User_exercise> getUnFinishedExerciseByInfo(@Param("user_id") int user_id,
                                                    @Param("exercise_id") int exercise_id);
}
