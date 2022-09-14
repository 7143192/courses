package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "records")
@NoArgsConstructor
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "record_id")
public class Record {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "record_id")
    private int record_id;
    @Column(name = "user_id")
    private int user_id;

//    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date start_time;
//    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date end_time;

    private int duration;

    private float speed;

    // 这里就是一个接收数据的工具人，接受完就不用了，并不存在sql数据库中
    @Transient
    private List<SingleRecord> path;

    public Record(int user_id, Date start_time, Date end_time, int duration, float speed) {
        this.user_id = user_id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.duration = duration;
        this.speed = speed;
    }
}


