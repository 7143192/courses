package com.example.bookstorebackend2.controller;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.OrderItem;
import com.example.bookstorebackend2.entity.User;
import com.example.bookstorebackend2.service.OrderItemService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class OrderItemController {
    @Autowired
    private OrderItemService orderItemService;

    //@CrossOrigin
    @RequestMapping("/getOrderItem")
    public @ResponseBody List<OrderItem> getOrderItems(@RequestParam("id") int orderId)
    {
        return orderItemService.getOrderItems(orderId);
        //先利用userid从orders表中获得此用户所有订单信息，之后在orderitem表中根据ordersid来分别获取所有的item，
    }

    //@CrossOrigin
    @RequestMapping("/updateItemNum")//更新某一条购物记录的数量信息
    public @ResponseBody OrderItem updateNum(@RequestParam("id") int itemId,
                                             @RequestParam("num") int Num)
    {
        return orderItemService.updateNum(itemId, Num);
    }

    @RequestMapping("/getBookSoldNum")
    public @ResponseBody int getSoldNum(@RequestParam("id") int bookId, @RequestParam("month") int month)
    {
        return orderItemService.getSoldNum(bookId, month);
    }

    @RequestMapping("/getFirstBooks")
    public @ResponseBody List<Pair<Book, Integer>> getFirstBooks(@RequestParam("month") int month,
                                                                 @RequestParam("year") int year)//获取销量排名前几位的图书
    {
        return orderItemService.getFirstBooks(month, year);
    }

    @RequestMapping("/getUserTotalPrice")
    public @ResponseBody List<Pair<User, Integer>> getUserTotalPrice(@RequestParam("month") int month,
                                                                     @RequestParam("year") int year)
    {
        return orderItemService.getUserTotalPrice(month, year);
    }
}
