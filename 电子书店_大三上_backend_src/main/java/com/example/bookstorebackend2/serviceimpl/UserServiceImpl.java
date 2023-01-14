package com.example.bookstorebackend2.serviceimpl;
import com.example.bookstorebackend2.entity.User;
import com.example.bookstorebackend2.dao.UserDao;
import com.example.bookstorebackend2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public User checkUser(String username, String password)
    {
        return userDao.checkUser(username, password);
    }

    @Override
    public User registerUser(String username, String password, String email)
    {
        return userDao.registerUser(username, password, email);
    }

    @Override
    public User checkUserName(String username)
    {
        return userDao.checkUserName(username);
    }

    @Override
    public User changePassword(String password, String email)
    {
        return userDao.changePassword(password, email);
    }

    @Override
    public User setUserAbility(int userId)
    {
        return userDao.setUserAbility(userId);
    }
}
