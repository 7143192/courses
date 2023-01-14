package com.example.bookstorebackend2.controller;
import com.example.bookstorebackend2.entity.User;
import com.example.bookstorebackend2.repository.UserRepository;
import com.example.bookstorebackend2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    //@CrossOrigin
    @RequestMapping("/checkUser")
    public @ResponseBody User checkUser(@RequestParam("username") String username,
                          @RequestParam("password") String password)
    {
        return userService.checkUser(username, password);
    }

    //@CrossOrigin
    @RequestMapping("registerUser")
    public @ResponseBody User registerUser(@RequestParam("username") String username,
                                           @RequestParam("password") String password,
                                           @RequestParam("email") String email)
    {
        return userService.registerUser(username, password, email);
    }

    //@CrossOrigin
    @RequestMapping("/checkUserName")//检查用户名是否重复
    public @ResponseBody User checkUserName(@RequestParam("username") String username)
    {
        return userService.checkUserName(username);
    }

    //@CrossOrigin
    @RequestMapping("/changePassword")//忘记密码时进行密码的重置
    public @ResponseBody User changePassword(@RequestParam("newPassword") String password,
                                             @RequestParam("email") String email)
    {
        return userService.changePassword(password, email);
    }

    @RequestMapping("/getAllUser")
    public @ResponseBody List<User> getAllUser()
    {
        return userRepository.getAllUsers();
    }

    @RequestMapping("/setAbility")
    public @ResponseBody User setUserAbility(@RequestParam("id") int userId)
    {
        return userService.setUserAbility(userId);
    }
}
