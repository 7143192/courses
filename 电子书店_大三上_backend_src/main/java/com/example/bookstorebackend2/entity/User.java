package com.example.bookstorebackend2.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "users")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "userId")
public class User {
    @Id
    @Column(name = "user_id")
    private int userId;
    private String username;
    private String password;
    private String email;
    private int type;//0代表正常用户，1代表管理员(暂定),2表示用户被禁用
    private String sex;

    public static long start_time;//记录用户登录之后的会话开始时间
    public static long end_time;//记录用户登出时的会话结束时间

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getUserId()
    {
        return this.userId;
    }
    public void setUserId(int id)
    {
        this.userId = id;
    }
    @Basic
    @Column(name = "username")
    public String getUsername()
    {
        return this.username;
    }
    public void setUsername(String username)
    {
        this.username = username;
    }
    @Basic
    @Column(name = "user_password")
    public String getPassword()
    {
        return this.password;
    }
    public void setPassword(String pwd)
    {
        this.password = pwd;
    }
    @Basic
    @Column(name = "e_mail")
    public String getEmail()
    {
        return this.email;
    }
    public void setEmail(String email)
    {
        this.email = email;
    }
    @Basic
    @Column(name = "type")
    public int getType()
    {
        return this.type;
    }
    public void setType(int type)
    {
        this.type = type;
    }
    @Basic
    @Column(name = "sex")
    public String getSex()
    {
        return this.sex;
    }
    public void setSex(String sex)
    {
        this.sex = sex;
    }
}
