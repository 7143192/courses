package com.example.sportapp_backend.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "user_plan")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "user_plan_id")
public class userPlan implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="user_plan_id")
    private int user_plan_id;
    @Basic
    @Column(name="user_id")
    private int user_id;
    @Basic
    @Column(name="plan_id")
    private int plan_id;
    @Basic
    @Column(name="date_choose")
    private int date_choose;
    @Basic
    @Column(name="finish")
    private int finish;

    public int getUser_plan_id()
    {
        return this.user_plan_id;
    }

    public int getUser_id()
    {
        return this.user_id;
    }
    public void setUser_id(int id)
    {
        this.user_id = id;
    }

    public void setPlan_id(int id)
    {
        this.plan_id = id;
    }

    public void setDate_choose(int date)
    {
        this.date_choose = date;
    }

    public void setFinish(int f)
    {
        this.finish = f;
    }
}
