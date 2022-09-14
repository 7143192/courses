package com.example.dentistbackend.controller;
import com.example.dentistbackend.entity.Orders;
import com.example.dentistbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/updateOrder")
    @CrossOrigin
    public @ResponseBody  Orders updateOrders(@RequestParam("doctorName") String doctorName,
                                              @RequestParam("ordernum") int orderNum,
                                              @RequestParam("rsvTime") String rsvTime)//这里只实现了对最大放号量的修改
    {
        return orderService.updateOrderInfo(doctorName, orderNum, rsvTime);
    }

    @RequestMapping("/addOrder")
    @CrossOrigin//这个函数暂时是没用了
    public @ResponseBody Orders AddNewOrder(@RequestParam("doctorName")String doctorName,
                                            @RequestParam("ordernum") int orderNum,
                                            @RequestParam("rsvTime") String rsvTime) throws ParseException {
        return orderService.AddNewOrder(doctorName, orderNum, rsvTime);
    }

    @RequestMapping("/getDoctorOrder")//获取医生的具体排班信息
    @CrossOrigin
    public @ResponseBody List<Orders> getDoctorOrders(@RequestParam("id") int id)
    {
        return orderService.getDoctorOrders(id);
    }

    @RequestMapping("/AssignOrder")
    @CrossOrigin//这个是管理员发放新的诊号的函数
    public @ResponseBody Orders AssignOrder(@RequestParam("doctorId") int doctorId,
                                            @RequestParam("time") String time,
                                            @RequestParam("num") int num)
    {
        return orderService.AssignOrder(doctorId, time, num);
    }

    @RequestMapping("/getOrderByTime")
    @CrossOrigin
    public @ResponseBody List<Orders> getOrderByTime(@RequestParam("time") String time)
    {
        return orderService.getOrderByTime(time);
    }

    @RequestMapping("/getDoctorOrderByTime")
    @CrossOrigin
    public @ResponseBody List<Orders> getDoctorOrderByTime(@RequestParam("id") int doctorId,
                                                           @RequestParam("time") String time)
    {
        return orderService.getDoctorOrdersByTime(doctorId, time);
    }
}
