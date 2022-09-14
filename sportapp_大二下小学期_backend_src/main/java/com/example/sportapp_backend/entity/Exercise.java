package com.example.sportapp_backend.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Data
@Entity
@Table(name = "exercise_course", indexes = {@Index(name = "exerciseId", columnList = "exercise_id")})
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "exercise_id")
public class Exercise {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="exercise_id")
    private int exercise_id;
    @Basic
    @Column(name="exercise_name")
    private String name;
    @Basic
    @Column(name="join_num")
    private int join_num;
    @Basic
    @Column(name="url")
    private String url;
    @Basic
    @Column(name="img")
    private String img;
    public static Lock lock = new ReentrantLock();


    public String getName()
    {
        return this.name;
    }
    public void setName(String name)
    {
        this.name = name;
    }

}
