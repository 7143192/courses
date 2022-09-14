package com.example.dentistbackend.service;
import com.example.dentistbackend.entity.Admin;
import com.example.dentistbackend.entity.Doctor;

import java.util.List;
public interface AdminService {
    Admin checkUser(String username, String password);
    Doctor updateDoctorInfo(int doctorId, String username, String deptName);
}
