package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "relationship")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "relation_id")
public class Relationship implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY) //设置自增主键
    @Id
    @Column(name = "relation_id")
    private int relation_id ;
    @Basic
    @Column(name="user_id")
    private int user_id; //这个id存储的是一个好友关系中id小的那个用户的id
    @Basic
    @Column(name="friend_id")
    private int friend_id; //这个id存大的那个

    public Relationship(int user_id, int friend_id) {
        this.user_id = user_id;
        this.friend_id = friend_id;
    }

    public Relationship() {
    }

    public int getRelation_id(){
        return this.relation_id;
    }
    public int getUser_id(){
        return this.user_id;
    }
    public void setUser_id(int id){
        this.user_id = id;
    }
    public int getFriend_id(){
        return this.friend_id;
    }

}
