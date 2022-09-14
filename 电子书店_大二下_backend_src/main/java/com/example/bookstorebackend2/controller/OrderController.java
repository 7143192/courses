package com.example.bookstorebackend2.controller;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Orders;
import com.example.bookstorebackend2.repository.OrderRepository;
import com.example.bookstorebackend2.service.OrderService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;

    //@CrossOrigin
    @RequestMapping("/endOrder")//订单完成之后进行删除
    public @ResponseBody Orders deleteOrder(@RequestParam("id") int orderId)
    {
        return orderService.deleteOrder(orderId);
    }

    //@CrossOrigin
    @RequestMapping("/addOrder")//添加一个新的订单
    //函数逻辑：通过userid获取当前用户购物车中被选中的物品信息，之后添加一个order并在orderItem添加相应的信息
    public @ResponseBody Orders addOrder(@RequestParam("id") int userId)
    {
        return orderService.addOrder(userId);
    }

    //@CrossOrigin
    @RequestMapping("/getOrders")
    public @ResponseBody List<Orders> getOrders(@RequestParam("id") int userId)
    {
        return orderRepository.getOrders(userId);
    }

    //@CrossOrigin
    @RequestMapping("/delOrder")
    public @ResponseBody Orders delOrderFormList(@RequestParam("id") int orderId)
    {
        return orderService.delOrderFromList(orderId);
    }

    //@CrossOrigin
    @RequestMapping("/getSearchedOrders")
    public @ResponseBody List<Orders> getSearchedOrders(@RequestParam("searchInfo") String info,
                                                        @RequestParam("id") int userId)
    {
        return orderService.getSearchedOrders(info, userId);
    }

    @RequestMapping("/getAdminSearched")
    public @ResponseBody List<Orders> getAdminSearchedOrders(@RequestParam("info") String info)
    {
        return orderService.getAdminSearchedOrders(info);
    }

    //@CrossOrigin
    @RequestMapping("/buyImmediately")
    public @ResponseBody Orders buyImmediately(@RequestParam("bookId") int bookId,
                                               @RequestParam("userId") int userId)
    {
        return orderService.buyImmediately(bookId, userId);
    }

    @RequestMapping("/checkSearched")
    public @ResponseBody Orders checkSearched(@RequestParam("id") int orderId,
                                              @RequestParam("searchInfo") String info)
    {
        return orderService.checkSearched(orderId, info);
    }

    @RequestMapping("/getAdminOrders")
    public @ResponseBody List<Orders> getAdminOrders()
    {
        return orderService.getAdminOrders();
    }

    @RequestMapping("/getAOrder")
    public @ResponseBody Orders getAOrder(@RequestParam("id") int orderId)
    {
        return orderService.getAOrder(orderId);
    }

    @RequestMapping("/CountUserBuy")
    public @ResponseBody List<Pair<Book, Integer>> CountUserBuy(@RequestParam("month") int month,
                                                          @RequestParam("id") int userId,
                                                                @RequestParam("year") int year)
            //统计用户在某个月的购买情况
    {
        return orderService.CountUserBuy(month, userId, year);
    }
}
