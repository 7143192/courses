package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "verification_code")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "code_id")
public class Verification_code {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "code_id")
    private int code_id ;

    @Basic
    @Column(name = "phone")
    private String phone;

    @Basic
    @Column(name = "code")
    private String code;

    @Basic
    @Column(name = "time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time;


    public void set_phone(String phone){
        this.phone = phone;
    }

    public void setTime(Timestamp time){
        this.time = time;
    }
}
