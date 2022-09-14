package com.example.dentistbackend.dao;
import com.example.dentistbackend.entity.Orders;

import java.text.ParseException;
import java.util.List;

public interface OrderDao {
    List<Orders> getOrders(int doctorId, String RsvTime);

    Orders updateOrders(int doctorId, int orderNum, String rsvTime);//修改某个班次order最大数量

    Orders updateOrderInfo(String doctorName, int orderNum, String rsvTime);

    Orders AddNewOrder(String doctorName, int orderNum, String rsvTime) throws ParseException;

    List<Orders> getDoctorOrders(int id);

    Orders AssignOrder(int doctorId, String time, int num);

    List<Orders> getOrderByTime(String time);

    List<Orders> getDoctorOrderByTime(int doctorId, String time);
}
