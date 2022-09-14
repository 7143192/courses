package com.example.dentistbackend.service;
import com.example.dentistbackend.entity.Patient;
import java.util.List;
public interface PatientService {
    Patient findPatientById(Integer id);
    List<Patient> getPatients();
    Patient checkUser(String username, String password);
    Patient findPatientByName(String name);
    Patient registerNewPatient(String name, String sex, int age, String username, String password
            ,String cardNum);
    Patient updatePatient(String name, String sex, int age, String cardNum,
                          String username, String password);

    Patient RegNewPatient(String name, String username, String password, String cardNum, String sex);
}
