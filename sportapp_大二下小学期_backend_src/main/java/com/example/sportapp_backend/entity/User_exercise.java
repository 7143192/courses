package com.example.sportapp_backend.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "user_exercise")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "user_exercise_id")
public class User_exercise implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_exercise_id")
    private int user_exercise_id;
    @Basic
    @Column(name="exercise_id")
    private int exercise_id;
    @Basic
    @Column(name="user_id")
    private int user_id;
    @Basic
    @Column(name="chosen_time")
    private int chosen_time; //以 秒 为单位存储
    @Basic
    @Column(name="use_time")
    private int use_time; //以 秒 为单位存储
    @Basic
    @Column(name="finish")
    private int finish;

    public int getUser_exercise_id()
    {
        return this.user_exercise_id;
    }
    public void setUser_exercise_id(int id)
    {
        this.user_exercise_id = id;
    }
    public int getExercise_id()
    {
        return this.exercise_id;
    }
    public void setExercise_id(int id)
    {
        this.exercise_id = id;
    }

    public void setUser_id(int id)
    {
        this.user_id = id;
    }

    public void setChosen_time(int time)
    {
        this.chosen_time = time;
    }

    public void setUse_time(int time)
    {
        this.use_time = time;
    }

    public void setFinish(int finish)
    {
        this.finish = finish;
    }
}
