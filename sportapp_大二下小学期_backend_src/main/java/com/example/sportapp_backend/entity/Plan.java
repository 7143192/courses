package com.example.sportapp_backend.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import javax.persistence.*;
import java.sql.Date;
import java.util.List;
@Data
@Entity
@Table(name = "plans")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "plan_id")
public class Plan {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="plan_id")
    private int plan_id;
    @Basic
    @Column(name="plan_name")
    private String plan_name;
    @Basic
    @Column(name="days")
    private int days;
    @Basic
    @Column(name="plan_level")
    private int plan_level;
    @Basic
    @Column(name="day_time")
    private int day_time;
    @Basic
    @Column(name="stars")
    private int stars;
    @Basic
    @Column(name="img")
    private String img;
    @Basic
    @Column(name="description")
    private String description;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "plan_id")
    private List<planItem> items; //用一对多的方式存储一个plan的每日活动内容

    public int getPlan_id()
    {
        return this.plan_id;
    }
    public void setPlan_id(int id)
    {
        this.plan_id = id;
    }

}
