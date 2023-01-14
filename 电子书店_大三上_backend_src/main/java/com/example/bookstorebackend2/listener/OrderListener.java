package com.example.bookstorebackend2.listener;

import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.entity.Orders;
import com.example.bookstorebackend2.server.WebSocketServer;
import com.example.bookstorebackend2.service.CartService;
import com.example.bookstorebackend2.service.OrderService;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class OrderListener {
    @Autowired
    CartService cartService;
    @Autowired
    OrderService orderService;
    @Autowired
    KafkaTemplate<String, String> kafkaTemplate;
    @Autowired
    WebSocketServer ws;

    @KafkaListener(topics = "OrderTopic1", groupId = "order_topic_group")
    public Orders OrderTopic1Listener(ConsumerRecord<String, String> record) {
        //int old_max = orderService.getLastOrder().getOrderId();
        String value = record.value();
        System.out.println("value=" + value);
        String s1 = value.substring(0, value.indexOf(':'));
        int userId = Integer.parseInt(s1);//获取userId
        List<Cart> items = new ArrayList<>();
        String s2 = value.substring(value.indexOf(':') + 1);
        String[] arr = s2.split(",");//将选中的购物车项目的id按照“，”分隔开。
        for (String s : arr) {
            Cart c = cartService.getACart(Integer.parseInt(s));
            items.add(c);//获取items列表
        }
        try {
            Orders o = orderService.addOrder(userId, items);
            //String data = String.valueOf(orderService.getLastOrder().getOrderId());
            String data = userId + ",Done";
            kafkaTemplate.send("OrderTopic2", "key", data);
            return o;
        } catch(Exception e) {
            e.printStackTrace();
            String data = userId + ",Error";
            kafkaTemplate.send("OrderTopic2", "key", data);
        }
        return null;
    }

    @KafkaListener(topics = "OrderTopic2", groupId = "order_topic_group")
    public void OrderTopic2Listener(ConsumerRecord<String, String> record) {
        //String value = record.value();
        //System.out.println("value=" + value);
        System.out.println("listened message=" + record.value());
        String val = record.value();
        int pos = val.indexOf(',');
        String userId = val.substring(0, pos);
        String message = val.substring(pos + 1);
        System.out.println("message=" + message + ", userId=" + userId);
        ws.SendMessageToUser(message, userId);
    }
}
