package com.example.dentistbackend.service;
import com.example.dentistbackend.entity.Registration;

import java.util.List;

public interface RegService {
    Registration AddNewReg(int doctorId, int patientId, String Time, int state);

    List<Registration> getPatientOrders(String Name);

    List<Registration> getDoctorOrders(String Name);

    Registration deleteReg(String patientName, String doctorName, String rsvTime);

    List<Registration> getDoctorReg(int doctorId);

    int registrationFinish(int regId);
}
