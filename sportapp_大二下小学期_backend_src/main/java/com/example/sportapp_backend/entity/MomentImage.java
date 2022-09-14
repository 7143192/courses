package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "moment_images")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "img_id")
public class MomentImage {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "img_id")
    private int img_id;

    /*@ManyToOne(fetch = FetchType.EAGER,optional=false)
    @JoinColumn(name="moment_id", nullable = false)
    private Moment moment;*/
    @Basic
    @Column(name="moment_id")
    private int moment_id;

    @Basic
    @Column(name="img")
    private String img;


}
