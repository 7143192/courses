package com.example.dentistbackend.controller;
import com.example.dentistbackend.entity.Admin;
import com.example.dentistbackend.entity.Doctor;
import com.example.dentistbackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
public class AdminController {
    @Autowired
    private AdminService AdminService;

    @RequestMapping("/checkAdmin")
    @CrossOrigin
    public @ResponseBody Admin checkUser(@RequestParam("username")String username, @RequestParam("password")String password)
    {
        return AdminService.checkUser(username, password);
    }

    @RequestMapping("/updateDoctorInfo")//这是管理员更新医生信息，好像和另外一个重复，最终用的是这个
    @CrossOrigin
    public @ResponseBody Doctor updateDoctorInfo(@RequestParam("id") int doctorId,
                                                 @RequestParam(name = "username", required = false, defaultValue = "") String username,
                                                 @RequestParam(name = "title", required = false, defaultValue = "") String title)
    {
        return AdminService.updateDoctorInfo(doctorId, username, title);
    }
}
