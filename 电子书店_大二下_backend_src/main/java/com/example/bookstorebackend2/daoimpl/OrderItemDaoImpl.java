package com.example.bookstorebackend2.daoimpl;
import com.example.bookstorebackend2.dao.OrderItemDao;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.OrderItem;
import com.example.bookstorebackend2.entity.Orders;
import com.example.bookstorebackend2.entity.User;
import com.example.bookstorebackend2.repository.BookRepository;
import com.example.bookstorebackend2.repository.OrderRepository;
import com.example.bookstorebackend2.repository.OrderItemRepository;
import com.example.bookstorebackend2.dao.OrderDao;
import com.example.bookstorebackend2.repository.UserRepository;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import java.util.*;

import static com.sun.deploy.trace.Trace.flush;

@Repository
public class OrderItemDaoImpl implements OrderItemDao {
    @Autowired
    private PlatformTransactionManager platformTransactionManager;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<OrderItem> getOrderItems(int orderId)
    {
        //return orderItemRepository.getAllItemById(orderId);
        return null;
    }

    @Override
    public OrderItem updateNum(int itemId, int Num)
    {
        List<OrderItem> list = orderItemRepository.getItem(itemId);
        Iterator<OrderItem> iter = list.iterator();
        if(!iter.hasNext()){
            System.out.println("Can't find the corresponding orderitem!");
            return null;
        }
        OrderItem item = iter.next();
        int old_buy = item.getBuyNum();//记录之前的购买数量
        //Orders o1 = item.getOrder();//
        int orderId1 = item.getOrderId();
        int bookId = item.getBookId();
        List<Orders> Order = orderRepository.getOrderById(orderId1);//
        Iterator<Orders> iter1 = Order.iterator();
        Orders o = iter1.next();//获得对应的订单信息
        item.setBuyNum(Num);
        orderItemRepository.save(item);
        orderItemRepository.flush();
        return item;
        //return null;
    }

    @Override
    public int getSoldNum(int bookId, int month)
    {
        return 0;
    }

    String getTime(int year, int month)
    {
        String s = String.valueOf(year);
        s += "-";
        //String s = "2022-";
        if(month < 10){
            s += "0";
            s += String.valueOf(month);
        }
        else s+= String.valueOf(month);
        s += "-01";
        return s;
    }

    @Override
    public List<Pair<Book, Integer>> getFirstBooks(int month, int year)
    {
        /*List<Book> books = bookRepository.getBooks();
        List<Pair<Book, Integer>> pairs = new ArrayList<>();
        List<Integer> nums = new ArrayList<>();
        for(int i = 0;i < books.size();++i) nums.add(0);
        String s = "";
        if(month >= 1 && month <= 9){
            s += "0";
            s += String.valueOf(month);
        }
        else{
            s += String.valueOf(month);
        }
        //System.out.println("s = " + s);
        List<Orders> orders = orderRepository.getAllOrders();
        List<Orders> finished = new ArrayList<>();
        for (Orders o : orders) {
            String date = o.getDate();
            String got_month = date.substring(5,7);
            //System.out.println("got = " + got_month);
            if(!got_month.equals(s)) continue;//只获取目标月份的内容
            if (o.getFinish() == 1) finished.add(o);//获取已经完成的订单
        }
        for(Orders order : finished){
            //List<OrderItem> items = orderItemRepository.getAllItemById(order.getOrderId());//
            List<OrderItem> items = order.getOrderItems();//
            for(OrderItem item : items){
                Book book = bookRepository.getById(item.getBookId());
                for(int i = 0;i < books.size();++i){
                    if(books.get(i) == book){
                        int old = nums.get(i);
                        int new_num = old + item.getBuyNum();
                        nums.set(i, new_num);
                    }
                }
            }
        }
        for(int i = 0;i < books.size();++i){
            Pair<Book, Integer> pair = new Pair<>(books.get(i), nums.get(i));
            pairs.add(pair);
        }
        pairs.sort((a, b) -> b.getValue() - a.getValue());//按照销量进行反向排序(从大到小)
        List<Pair<Book, Integer>> res = new ArrayList<>();
        for(int i = 0;i < 6;++i){
            res.add(pairs.get(i));
        }
        return res;*/
        String s = getTime(year, month);
        List<Orders> orders = orderRepository.getOrdersByMonth(s);
        System.out.println("得到的order信息为：");
        System.out.println(orders);//直接从数据库中拿到对应月份的信息
        List<Book> books = bookRepository.getBooks();
        List<Pair<Book, Integer>> pairs = new ArrayList<>();
        List<Integer> nums = new ArrayList<>();
        for(int i = 0;i < books.size();++i) nums.add(0);
        for(Orders o : orders){
            List<OrderItem> items = o.getOrderItems();
            for(OrderItem item : items){
                Book book = bookRepository.getById(item.getBookId());
                for(int i = 0;i < books.size();++i){
                    if(books.get(i) == book){
                        int old = nums.get(i);
                        int new_num = old + item.getBuyNum();
                        nums.set(i, new_num);
                    }
                }
            }
        }
        for(int i = 0;i < books.size();++i){
            Pair<Book, Integer> pair = new Pair<>(books.get(i), nums.get(i));
            pairs.add(pair);
        }
        pairs.sort((a, b) -> b.getValue() - a.getValue());//按照销量进行反向排序(从大到小)
        List<Pair<Book, Integer>> res = new ArrayList<>();
        for(int i = 0;i < 6;++i){
            res.add(pairs.get(i));
        }
        return res;
        //return null;
    }

    @Override
    public List<Pair<User, Integer>> getUserTotalPrice(int month, int year)
    {
        //String s = "2022-";
        String s = getTime(year, month);
        List<Pair<User, Integer>> pairs = new ArrayList<>();
        List<User> users = userRepository.getAllUsers();
        for(User user : users){
            if(user.getType() == 1) continue;//跳过对于管理员的消费统计
            int total = 0;
            /*List<Orders> orders = orderRepository.getOrders(user.getUserId());
            List<Orders> finished = new ArrayList<>();
            for(Orders o : orders){
                String date = o.getDate();
                String got_month = date.substring(5,7);
                //System.out.println("got = " + got_month);
                if(!got_month.equals(s)) continue;//只获取目标月份的内容
                if (o.getFinish() == 1) finished.add(o);//获取已经完成的订单
            }*/
            List<Orders> finished = orderRepository.getUserOrdersByMonth(s, user.getUserId());
            System.out.println(user.getUserId() + "用户的订单为：");
            System.out.println(finished);//
            for(Orders order : finished){
                //List<OrderItem> items = orderItemRepository.getAllItemById(order.getOrderId());//
                List<OrderItem> items = order.getOrderItems();
                for(OrderItem item : items){
                    int price = bookRepository.getById(item.getBookId()).getNowPrice();//获取价格
                    //total += price * item.getBuyNum();
                    total += item.getBuyNum() * item.getPrice();
                }
            }
            Pair<User, Integer> pair = new Pair<>(user, total);
            pairs.add(pair);//生成新的键值对
        }
        pairs.sort((a,b) -> b.getValue() - a.getValue());
        return pairs;
        //return null;
    }
}
