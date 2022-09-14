package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.core.SpringVersion;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "target_like")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "like_id")
public class Target_like implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="like_id")
    private int like_id;

    @Basic
    @Column(name="target_type")
    private int target_type;

    @Basic
    @Column(name="target_id")
    private  int target_id;
    @Basic
    @Column(name="user_id")
    private int user_id;

    //public static int liked = 0;
    //public static int unliked = 1;

//    public int getLike_id(){
//        return like_id;
//    }

}
