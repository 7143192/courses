package com.example.sportapp_backend.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Data
@Entity
@Proxy(lazy = false)
@Table(name = "course_favorite", indexes = {@Index(name = "userId1", columnList = "user_id"),
                                            @Index(name = "courseId1", columnList = "course_id")})
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"}, ignoreUnknown = true)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "favorite_id")
public class Favorite implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="favorite_id")
    private int favorite_id;
    @Basic
    @Column(name="user_id")
    private int user_id;
    /*@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User user;*/
    @Basic
    @Column(name="course_id")
    private int course_id;

    public int getFavorite_id()
    {
        return this.favorite_id;
    }
    public void setFavorite_id(int id)
    {
        this.favorite_id = id;
    }

    public int getCourse_id() {
        return course_id;
    }
    public int getUser_id() {
        return this.user_id;
    }
    public void setUser_id(int id)
    {
        this.user_id = id;
    }
}
