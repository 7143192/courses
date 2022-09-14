package com.example.sportapp_backend.daoImpl;

import com.example.sportapp_backend.dao.VerificationDao;
import com.example.sportapp_backend.entity.Verification_code;
import com.example.sportapp_backend.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Calendar;

@Repository
public class VerificationDaoImpl implements VerificationDao {
    @Autowired
    private VerificationRepository verificationRepository;

    @Override
    public void newCode(String phone, String code){
        Verification_code v = new Verification_code();
        v.set_phone(phone);
        v.setCode(code);
        long time = Calendar.getInstance().getTimeInMillis();
        Timestamp ts = new Timestamp(time);
        v.setTime(ts);
        verificationRepository.save(v);
    }
    public boolean checkCode(String phone, String code){
        Verification_code v = verificationRepository.checkCode(phone, code);
        if(v != null){
            verificationRepository.deleteCode(phone, code);
            return true;
        }
        return false;
    }
}
