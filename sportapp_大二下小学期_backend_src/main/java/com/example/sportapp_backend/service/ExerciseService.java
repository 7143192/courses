package com.example.sportapp_backend.service;
import com.example.sportapp_backend.entity.Exercise;

import java.sql.Date;
import java.util.List;

public interface ExerciseService {
    List<Exercise> getAllExercise();
    List<Exercise> getPartExercise(int cur, int size);
}
