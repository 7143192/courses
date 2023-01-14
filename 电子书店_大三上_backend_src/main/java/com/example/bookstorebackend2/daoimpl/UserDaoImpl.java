package com.example.bookstorebackend2.daoimpl;
import com.example.bookstorebackend2.entity.User;
import com.example.bookstorebackend2.repository.UserRepository;
import com.example.bookstorebackend2.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public User checkUser(String username, String password)
    {
        List<User> user = userRepository.checkUser(username, password);
        Iterator<User> iter = user.iterator();
        if(!iter.hasNext()){
            System.out.println("username or password is wrong!");
            User NewUser = new User();
            NewUser.setUserId(-1);
            return NewUser;
        }
        User u = iter.next();
        System.out.println(u.getUserId());
        System.out.println(u.getUsername());
        System.out.println(u.getPassword());
        System.out.println(u.getEmail());
        return u;
    }

    @Override
    public User registerUser(String username, String password, String email)
    {
        List<User> users = userRepository.getAllUsers();
        for(User u : users){
            if(Objects.equals(u.getUsername(), username)){
                User user = new User();
                user.setUserId(-1);
                return user;//用户名重复不能成功注册
            }
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setSex("男");
        userRepository.save(user);//注册成功
        return user;
    }

    @Override
    public User checkUserName(String username)
    {
        List<User> users = userRepository.getAllUsers();
        for(User user : users){
            if(Objects.equals(user.getUsername(), username)){
                return user;
            }
        }
        User u = new User();
        u.setUserId(0);
        u.setUsername("wrong");
        u.setPassword("123456");
        u.setEmail("@sjtu.edu.cn");
        return u;
    }

    @Override
    public User changePassword(String password, String email)
    {
        List<User> users = userRepository.getAllUsers();
        for(User user : users){
            if(Objects.equals(user.getEmail(), email)){
                /*String sql = "update users set user_password = ? where user_id = ?";
                Object[] args = {password, user.getUserId()};
                jdbcTemplate.update(sql, args);*/
                user.setPassword(password);
                userRepository.save(user);
                userRepository.flush();
                return user;
            }
        }
        User u = new User();
        u.setUserId(0);
        u.setUsername("");
        u.setPassword("");
        u.setEmail("");
        return u;//返回的id为0说明邮箱信息不对
    }

    @Override
    public User setUserAbility(int userId)
    {
        User user = userRepository.getById(userId);
        //String sql = "update users set type = ? where user_id = ?";
        int type = user.getType();
        if(type == 0) type = 2;
        else type = 0;
        //Object[] args = {type, userId};
        //jdbcTemplate.update(sql, args);
        user.setType(type);
        userRepository.save(user);
        userRepository.flush();;
        return user;
    }

    @Override
    public void setStartTime() {
        User.start_time = System.currentTimeMillis();
        return ;
    }
    @Override
    public void setEndTime() {
        User.end_time = System.currentTimeMillis();
        return ;
    }
}
