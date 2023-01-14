package com.example.bookstorebackend2.controller;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.entity.Orders;
import com.example.bookstorebackend2.repository.OrderRepository;
import com.example.bookstorebackend2.service.CartService;
import com.example.bookstorebackend2.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import javafx.util.Pair;
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private CartService cartService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    //@CrossOrigin
    @RequestMapping("/endOrder")//订单完成之后进行删除
    public @ResponseBody Orders deleteOrder(@RequestParam("id") int orderId)
    {
        return orderService.deleteOrder(orderId);
    }

    //@CrossOrigin
    @RequestMapping("/addOrder")//添加一个在购物车中下的新的订单
    //函数逻辑：通过userid获取当前用户购物车中被选中的物品信息，之后添加一个order并在orderItem添加相应的信息
    public @ResponseBody Orders addOrder(@RequestParam("id") int userId)
    {
        List<Cart> items = cartService.getChosenCartItem(userId);
        return orderService.addOrder(userId, items);
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
    @RequestMapping("/buyImmediately")//添加一个通过立即购买按钮下的新的订单信息
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

    @RequestMapping("/KafkaAddOrder")
    public @ResponseBody void KafkaAddOrder(@RequestParam("id") int userId) {
        List<Cart> items = cartService.getChosenCartItem(userId);//获取用户下订单时已经选中的购物车条目
        //格式为：userId:1,2,3,...(为cartItem的主键编号)
        StringBuilder data = new StringBuilder(userId + ":");
        for(Cart c : items) {
            data.append(c.getCartId());
            data.append(",");
        }
        System.out.println("data=" + data);
        kafkaTemplate.send("OrderTopic1", "key", data.toString());
    }

    @RequestMapping("/getLastOrder")
    public @ResponseBody Orders getLastOrder()
    {
        return orderService.getLastOrder();
    }
}
