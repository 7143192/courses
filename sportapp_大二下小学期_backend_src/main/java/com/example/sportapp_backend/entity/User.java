package com.example.sportapp_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Data
@Entity
@Proxy(lazy = false)
@Table(name = "users", indexes = {@Index(name = "userId", columnList = "user_id"),
        @Index(name = "username", columnList = "phone")})
//@Table(name="users")
@JsonIgnoreProperties(value = {"handler","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "user_id")
public class User implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id")
    private int user_id ;
    @Basic
    @Column(name = "nickname")
    private String nickname;
    @Basic
    @Column(name = "pwd")
    @JsonIgnore
    private String pwd;
    @Basic
    @Column(name = "phone")
    private String phone;
    @Basic
    @Column(name = "sex")
    private String sex;
    @Basic
    @Column(name = "birth")
    private Date birth;
    @Basic
    @Column(name = "state")
    private int state;
    @Basic
    @Column(name = "exp")
    private int exp;
    @Basic
    @Column(name="header")
    private String header; //存储头像信息
    @Basic
    @Column(name="background")
    private String background; //存储用户详细信息的背景图片
    @Basic
    @Column(name="height")
    private int height;
    @Basic
    @Column(name="weight")
    private int weight;
    @Basic
    @Column(name="bmi_num")
    private int bmi;
    //@JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Favorite> favorites; //通过一对多的方式存储用户的收藏课程信息
    //@JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<userPlan> chosenPlan; //通过一对一的方式存储用户的计划信息,但是还采用了1对多，是考虑到可能没有计划，方便处理
    //@JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<User_exercise> userExercise; //通过一对多来存储用户跟练过的课程，(可能)用于后续的统计.
    public static Lock lock = new ReentrantLock();
    public static Lock lock1 = new ReentrantLock();
    //@JsonIgnore
    /*@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="relationship",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "friend_id")}
    )
    @JsonIgnoreProperties(value = { "hibernateLazyInitializer","friends", "favorites"})
    private List<User> friends;

//    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinTable(name = "relationship",joinColumns = {@JoinColumn(name = "user_id",referencedColumnName = "user_id")}
//            ,inverseJoinColumns = {@JoinColumn(name = "friend_id",referencedColumnName = "neNeid")})
//    private List<User> friends;
    //@JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Relationship> relationships1;
    // 这里的level可以直接从exp计算得到，没有在数据库中存储；
    //private int level;
    //@JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "friend_id")
    private List<Relationship> relationships2;*/

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }


    public void setState(int state) {
        this.state = state;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public String getHeader()
    {
        return this.header;
    }



    public int getHeight()
    {
        return this.height;
    }
    public void setHeight(int height)
    {
        this.height = height;
    }
    public int getWeight()
    {
        return this.weight;
    }
    public void setWeight(int weight)
    {
        this.weight = weight;
    }
    public int getBmi()
    {
        return this.bmi;
    }
    public void setBmi(int bmi)
    {
        this.bmi = bmi;
    }
    public List<Favorite> getFavorites()
    {
        return this.favorites;
    }
    public void setFavorites(List<Favorite> list)
    {
        this.favorites = list;
    }
    public List<userPlan> getChosenPlan()
    {
        return this.chosenPlan;
    }
    public void setChosenPlan(List<userPlan> list)
    {
        this.chosenPlan = list;
    }
    public List<User_exercise> getUserExercise()
    {
        return this.userExercise;
    }
    public void setUserExercise(List<User_exercise> list)
    {
        this.userExercise = list;
    }

    public User() { }

    public User(String nickname, String pwd, String phone, String sex, String birth) {
        this.nickname = nickname;
        this.pwd = pwd;
        this.phone = phone;
        this.sex = sex;
        this.birth =Date.valueOf(birth);
        this.state = 0;
        this.exp = 0;
        this.height=0;
        this.weight=0;
        this.bmi=0;
        this.header="https://img95.699pic.com/xsj/14/qu/q9.jpg!/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast";
        this.background="https://img95.699pic.com/xsj/0f/es/fx.jpg!/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast";
    }

    public User(String nickname, String pwd, String phone, String sex, Date birth, int state, int exp, String header, String background, int height, int weight, int bmi) {
        this.nickname = nickname;
        this.pwd = pwd;
        this.phone = phone;
        this.sex = sex;
        this.birth = birth;
        this.state = state;
        this.exp = exp;
        this.header = header;
        this.background = background;
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
    }
}
