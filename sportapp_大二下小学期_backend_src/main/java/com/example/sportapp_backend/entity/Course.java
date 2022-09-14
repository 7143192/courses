package com.example.sportapp_backend.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.io.File;
import java.sql.Date;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Data
@Entity
@Proxy(lazy = false)
@Table(name = "courses", indexes = {@Index(name = "courseId", columnList = "course_id")})
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "course_id")
public class Course {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "course_id")
    private int course_id;
    @Basic
    @Column(name="type1")
    private int type1;//type1存储的一个1位的整数，表示根据分区选择的类型组合
    @Basic
    @Column(name="type2")
    private int type2;//type2存储的是一个三位的整数，表示根据运动部位的类型组合
    @Basic
    @Column(name="like_num")
    private int like_num;
    @Basic
    @Column(name="favorite_num")
    private int favorite_num;
    @Basic
    @Column(name="url")
    private String url;
    @Basic
    @Column(name="img")
    private String img;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private List<Favorite> favorites; //通过一对多的方式存储一门课程的被收藏的情况
    @Basic
    @Column(name="course_name")
    private String course_name;
    @Basic
    @Column(name="course_detail")
    private String course_detail;
    @Basic
    @Column(name="course_level")
    private int course_level;
    @Basic
    @Column(name="day_time")
    private int day_time;

    public static Lock lock = new ReentrantLock();

    public int getType1()
    {
        return this.type1;
    }

    public int getType2()
    {
        return this.type2;
    }

}
