package com.example.dentistbackend.service;
import com.example.dentistbackend.entity.Orders;

import java.text.ParseException;
import java.util.List;

public interface OrderService {
    Orders updateOrderInfo(String doctorName, int orderNum, String rsvTime);

    Orders AddNewOrder(String doctorName, int orderNum, String rsvTime) throws ParseException;

    List<Orders> getDoctorOrders(int id);

    Orders AssignOrder(int doctorId, String time, int num);

    List<Orders> getOrderByTime(String time);

    List<Orders> getDoctorOrdersByTime(int doctorId, String time);
}
