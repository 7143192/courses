package com.example.sportapp_backend.dao;
import com.example.sportapp_backend.entity.Exercise;

import java.sql.Date;
import java.util.List;
public interface ExerciseDao {
    List<Exercise> getAllExercise();
    List<Exercise> getPartExercise(int cur, int size);
}
