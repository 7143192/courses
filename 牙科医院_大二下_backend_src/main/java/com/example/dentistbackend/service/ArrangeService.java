package com.example.dentistbackend.service;
import com.example.dentistbackend.entity.Arrangement;
import java.util.List;
public interface ArrangeService {
    Arrangement findArrangeById(Integer id);

    List<Arrangement> getArrangements();

    List<Arrangement> getDoctorArrangement(int id);

    List<Arrangement> getWeekdayArrangement(String weekday);

    Arrangement AddNewArrangement(String weekday, String date, String startTime, String doctorName,
                                  int orderNum);
}
