package com.example.bookstorebackend2.service;
import com.example.bookstorebackend2.entity.User;
public interface UserService {
    User checkUser(String username, String password);
    User registerUser(String username, String password, String email);
    User checkUserName(String username);
    User changePassword(String password, String email);
    User setUserAbility(int userId);
}
