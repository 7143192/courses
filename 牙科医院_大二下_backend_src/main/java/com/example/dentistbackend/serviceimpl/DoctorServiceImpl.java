package com.example.dentistbackend.serviceimpl;
import com.example.dentistbackend.dao.DoctorDao;
import com.example.dentistbackend.entity.Doctor;
import com.example.dentistbackend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Iterator;
import java.util.List;
import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class DoctorServiceImpl implements DoctorService{
    @Autowired
    private DoctorDao doctorDao;
    @Override
    public Doctor findDoctorById(Integer id){
        //return doctorDao.findOne(id);
        Doctor doctor = doctorDao.findOne(id);
        System.out.println(doctor.getDoctorId());
        System.out.println(doctor.getUsername());
        System.out.println(doctor.getPassword());
        System.out.println(doctor.getDescription());
        return doctor;
    }

    @Override
    public List<Doctor> getDoctors() {
        List<Doctor> list = doctorDao.getDoctors();
        Iterator<Doctor> i = list.iterator();
        while(i.hasNext()){
            Doctor d = i.next();
            System.out.println(d.getDoctorId());
            System.out.println(d.getUsername());
            System.out.println(d.getPassword());
        }
        return list;
    }

    @Override
    public Doctor checkUser(String username, String password)
    {
        Doctor doctor = doctorDao.checkUser(username, password);
        if(isEmpty(doctor)) System.out.println("Not Found!");
        else{
            System.out.println(doctor.getDoctorId());
            System.out.println(doctor.getUsername());
            System.out.println(doctor.getPassword());
            System.out.println(doctor.getName());
        }
        return doctor;
    }

    @Override
    public Doctor findDoctorByName(String name)
    {
        return doctorDao.getDoctorByName(name);
    }

    @Override
    public Doctor updateDoctor(String doctorName, String username, String password,
                               String title, String description, String image)
    {
        return doctorDao.updateDoctor(doctorName, username, password, title, description, image);
    }

    @Override
    public Doctor addDoctor(String doctorName, String username, String password,
                            String title, String description, String deptName, String image)
    {
        return doctorDao.addDoctor(doctorName, username, password, title, description, deptName, image);
    }

    @Override
    public Doctor deleteDoctor(String doctorName)
    {
        return doctorDao.deleteDoctor(doctorName);
    }

    @Override
    public List<Doctor> getDoctorsByDept(String dept)
    {
        return doctorDao.getDoctorsByDept(dept);
    }
}
