package com.example.dentistbackend.daoimpl;
import com.example.dentistbackend.dao.AdminDao;
import com.example.dentistbackend.entity.Admin;
import com.example.dentistbackend.entity.Doctor;
import com.example.dentistbackend.repository.AdminRepository;
import com.example.dentistbackend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Repository
public class AdminDaoImpl implements AdminDao{
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Admin checkUser(String username, String password)
    {
        List<Admin> admin = adminRepository.checkUser(username, password);
        Iterator<Admin> a = admin.iterator();
        if(!a.hasNext()){
            Admin A = new Admin();
            A.setAdminId(-1);
            return A;
        }
        return a.next();
    }

    @Override
    public Doctor updateDoctorInfo(int doctorId, String username, String deptName)
    {
        Doctor doctor = doctorRepository.getById(doctorId);
        if(!Objects.equals(username, "")){
            doctor.setUsername(username);
        }
        if(!Objects.equals(deptName, "")){
            doctor.setTitle(deptName);
        }
        doctorRepository.save(doctor);
        doctorRepository.flush();
        return doctor;
    }
}
