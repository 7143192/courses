package com.example.dentistbackend.daoimpl;
import com.example.dentistbackend.dao.PatientDao;
import com.example.dentistbackend.entity.Patient;
import com.example.dentistbackend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Repository
public class PatientDaoImpl implements PatientDao{
    @Autowired
    private PatientRepository PatientRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Patient findOne(Integer id){
        return PatientRepository.getById(id);
    }

    @Override
    public List<Patient> getPatients() {
        return PatientRepository.getPatients();
    }

    @Override
    public Patient checkUser(String username, String password)
    {
        List<Patient> patient = PatientRepository.checkUser(username, password);
        Iterator<Patient> iter = patient.iterator();
        if(!iter.hasNext()){
            Patient p = new Patient();
            p.setPatientId(-1);
            return p;
        }
        return iter.next();
    }

    @Override
    public Patient getPatientByName(String name)
    {
        List<Patient> list = PatientRepository.getPatientByName(name);
        Iterator<Patient> iter = list.iterator();
        int id = -1;
        while(iter.hasNext()){
            Patient p = iter.next();
            id = p.getPatientId();
            break;
        }
        if(id == -1){
            System.out.println("Not Found!");
            return null;
        }
        System.out.println("Success!");
        Patient p = findOne(id);
        System.out.println(p.getUsername());
        System.out.println(p.getPassword());
        System.out.println(p.getSex());
        System.out.println(p.getAge());
        return p;
    }

    @Override
    public Patient RegisterNewPatient(String name, String sex, int age, String username, String password
    ,String cardNum)
    {
        List<Patient> list = PatientRepository.getPatients();
        for(Patient patient : list){//检查用户名是否重复
            if(Objects.equals(patient.getUsername(), username)){
                System.out.println("用户名已存在！");
                return null;
            }
        }
        Patient p = new Patient();
        p.setName(name);
        p.setAge(age);
        p.setUsername(username);
        p.setPassword(password);
        p.setSex(sex);
        p.setCardNum(cardNum);
        System.out.println("Success!");
        PatientRepository.save(p);
        return p;
    }

    @Override
    public Patient updatePatient(String name, String sex, int age, String cardNum,
                                 String username, String password)
    {
        List<Patient> list = PatientRepository.getPatientByName(name);
        Iterator<Patient> iter = list.iterator();
        if(!iter.hasNext()){
            System.out.println("Wrong information about the patient!");
            return null;
        }
        //Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        //session.beginTransaction();
        int patientId = -1;
        Patient patient = iter.next();
        patientId = patient.getPatientId();
        String sql = "update patient set sex = ?, age = ?, IDCard = ?, username = ?, password = ?" +
                "where ID_p = ?";
        Object[] args = {(!Objects.equals(sex, "")) ? sex : patient.getSex(),
                (age != 0) ? age : patient.getAge(),
                (!Objects.equals(cardNum, "")) ? cardNum : patient.getCardNum(),
                (!Objects.equals(username, "")) ? username : patient.getUsername(),
                (!Objects.equals(password, "")) ? password : patient.getPassword(),
                patientId};
        jdbcTemplate.update(sql, args);//进行更新操作
        if(!Objects.equals(sex, "")){
            patient.setSex(sex);
        }
        if(age != 0) patient.setAge(age);
        if(!Objects.equals(cardNum, "")) patient.setCardNum(cardNum);
        if(!Objects.equals(username, "")) patient.setUsername(username);
        if(!Objects.equals(password, "")) patient.setPassword(password);
        //session.getTransaction().commit();
        System.out.println("Successfully update the information of the patient!");
        return patient;
    }

    @Override
    public Patient RegNewPatient(String name, String username, String password,
                                 String cardNum, String sex)
    {
        Patient patient = new Patient();
        patient.setName(name);
        patient.setUsername(username);
        patient.setPassword(password);
        patient.setSex(sex);
        patient.setCardNum(cardNum);
        patient.setAge(20);
        PatientRepository.save(patient);
        PatientRepository.flush();
        return patient;
    }
}
