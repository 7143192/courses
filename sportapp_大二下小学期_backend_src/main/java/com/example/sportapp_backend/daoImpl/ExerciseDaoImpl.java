package com.example.sportapp_backend.daoImpl;
import com.example.sportapp_backend.dao.ExerciseDao;
import com.example.sportapp_backend.entity.Exercise;
import com.example.sportapp_backend.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

@Repository
public class ExerciseDaoImpl implements ExerciseDao{
    @Autowired
    ExerciseRepository exerciseRepository;
    @Override
    public List<Exercise> getAllExercise()
    {
        return exerciseRepository.findAll();
    }

    @Override
    public List<Exercise> getPartExercise(int cur, int size)
    {
        /*List<Exercise> all = getAllExercise();
        int len = all.size(); //获取所有跟练课程的数目
        List<Exercise> ans = new ArrayList<>();
        int pos = 0;
        int num = 0;
        for(Exercise e : all) {
            if(pos < cur){
                pos++;
                continue;
            }
            if(pos == len || num == size) break;
            pos++;
            ans.add(e);
            num++;
        }
        System.out.println("ans=" + ans);*/
        //Exercise.lock.lock();
        //List<Exercise> ans = exerciseRepository.getPartExerciseByPos(cur, size);
        List<Exercise> ans = exerciseRepository.getLimitedExercise(cur, size);
        //Exercise.lock.unlock();
        return ans;
    }
}
