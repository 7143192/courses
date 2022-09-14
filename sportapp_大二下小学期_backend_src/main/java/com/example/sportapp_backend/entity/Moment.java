package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Data
@Entity
@Table(name = "moments", indexes = {@Index(name = "momentUser", columnList = "user_id")})
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "moment_id")
public class Moment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "moment_id")
    private int moment_id;
    @Basic
    @Column(name = "user_id")
    private int user_id;
    @Basic
    @Column(name = "time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Timestamp time;
    @Basic
    @Column(name = "content")
    private String content;

    @Transient
    private String nickname;

    @Transient
    private String sex;

    @Transient
    private Date birth;

    @Transient
    private int exp;

    @Transient
    private String header;

    @Transient
    private int like_num;

    @Transient
    private int comment_num;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "moment_id")
    private List<MomentImage> imageList;

    public int getMoment_id() {
        return this.moment_id;
    }



    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUser_id() {
        return this.user_id;
    }

    public void setUser_id(int id) //因为使用了外键，所以不对用户暴露setter方法接口
    {
        this.user_id = id;
    }


    public void setTime(Timestamp time) {
        this.time = time;
    }


    public void setLike_num(int like_num) {
        this.like_num = like_num;
    }


    public void setComment_num(int comment_num) {
        this.comment_num = comment_num;
    }

}
