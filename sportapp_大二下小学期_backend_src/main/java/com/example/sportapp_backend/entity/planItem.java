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
@Table(name = "plan_items")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "item_id")
public class planItem {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="item_id")
    private int item_id;
    @Basic
    @Column(name="plan_id")
    private int plan_id;
    @Basic
    @Column(name="item_name")
    private String item_name;
    @Basic
    @Column(name="description")
    private String description;
    @Basic
    @Column(name="video_url")
    private String video_url;


    public int getPlan_id()
    {
        return this.plan_id;
    }
    public void setPlan_id(int id)
    {
        this.plan_id = id;
    }

}
