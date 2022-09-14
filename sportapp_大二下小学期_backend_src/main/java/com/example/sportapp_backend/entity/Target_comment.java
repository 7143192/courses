package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "target_comment", indexes={@Index(name="targetType", columnList = "target_type"),
                                @Index(name = "targetId", columnList = "target_id")})
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "comment_id")

public class Target_comment implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int comment_id;

    @Basic
    private int target_type;

    @Basic
    private  int target_id;

    @Basic
    private int user_id;

    @Basic
    @Column(name = "time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Timestamp time;

    @Basic
    private String content;

    @Transient
    private int like_num;

    @Transient
    private String nickname;

    @Transient
    private String header;

    @Transient
    private String sex;

    public int getTarget_type(){
        return target_type;
    }
    public void setTarget_type(int target_type){
        this.target_type = target_type;
    }
    public int getTarget_id(){
        return target_id;
    }
    public void setTarget_id(int target_id){
        this.target_id = target_id;
    }
    public int getUser_id(){
        return user_id;
    }
    public void setUser_id(int user_id){
        this.user_id = user_id;
    }

    public void setTime(Timestamp time){
        this.time = time;
    }
    public String getContent(){
        return content;
    }
    public void setContent(String content){
        this.content = content;
    }

    public void setHeader(String header){
        this.header = header;
    }

    public void setNickname(String name){
        this.nickname = name;
    }

    public void setSex(String sex){
        this.sex = sex;
    }

    public void setLike_num(int like_num){
        this.like_num = like_num;
    }
}
