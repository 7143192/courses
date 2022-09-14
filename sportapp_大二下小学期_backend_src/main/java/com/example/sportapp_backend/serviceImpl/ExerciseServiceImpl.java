package com.example.sportapp_backend.serviceImpl;
import com.example.sportapp_backend.dao.ExerciseDao;
import com.example.sportapp_backend.entity.Exercise;
import com.example.sportapp_backend.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.sql.Date;
import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService{
    @Autowired
    ExerciseDao exerciseDao;

    @Override
    @Cacheable(value="exerciseCache1")
    public List<Exercise> getAllExercise()
    {
        return exerciseDao.getAllExercise();
    }

    @Override
    @Cacheable(value="exerciseCache1", key="#cur")
    public List<Exercise> getPartExercise(int cur, int size)
    {
        System.out.println("开始获取PartExercise!");
        return exerciseDao.getPartExercise(cur, size);
    }
}
