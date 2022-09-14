package com.example.sportapp_backend.controller;
import com.example.sportapp_backend.entity.Exercise;
import com.example.sportapp_backend.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import net.sf.json.JSONObject;

import java.util.List;

@RestController
public class ExerciseController {
    @Autowired
    ExerciseService exerciseService;

    @RequestMapping("/getAllExercise") //获取所有课程
    public @ResponseBody
    List<Exercise> getAllExercise()
    {
        return exerciseService.getAllExercise();
    }

    @RequestMapping("/getPartExercise")
    public @ResponseBody List<Exercise> getPartExercise(@RequestParam("cur") int cur,
                                                        @RequestParam("size") int size)
    {
        //Exercise.lock.lock();
        List<Exercise> ans = exerciseService.getPartExercise(cur, size);
        //Exercise.lock.unlock();
        return ans;
    }
}
