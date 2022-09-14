package com.example.bookstorebackend2.daoimpl;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.entity.OrderItem;
import com.example.bookstorebackend2.entity.Orders;
import com.example.bookstorebackend2.repository.BookRepository;
import com.example.bookstorebackend2.repository.CartRepository;
import com.example.bookstorebackend2.repository.OrderRepository;
import com.example.bookstorebackend2.repository.OrderItemRepository;
import com.example.bookstorebackend2.dao.OrderDao;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.*;

@Repository
public class OrderDaoImpl implements OrderDao{
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int getMaxOrderId()
    {
        List<Orders> orders = orderRepository.getAllOrders();
        Iterator<Orders> iter = orders.iterator();
        int max = 0;
        for(Orders o : orders){
            if(o.getOrderId() >= max){
                max = o.getOrderId();
            }
        }
        return max;
    }

    @Override
    public Orders deleteOrder(int orderId)
    {
        //List<OrderItem> items = orderItemRepository.getAllItemById(orderId);//
        List<Orders> got = orderRepository.getOrderById(orderId);//
        Iterator<Orders> iter11 = got.iterator();//
        Orders GotOrder = iter11.next();//
        List<OrderItem> items = GotOrder.getOrderItems();//
        for(OrderItem item : items){
            int bookId = item.getBookId();
            List<Book> book = bookRepository.getBook(bookId);
            Iterator<Book> iter=  book.iterator();
            Book ABook = iter.next();
            int leftNum = ABook.getStoreNum() - item.getBuyNum();//获取剩余数量
            /*String sql = "update bookslist set store_num = ? where book_id = ?";
            Object[] args = {leftNum, item.getBookId()};
            jdbcTemplate.update(sql, args);//更新购买的书本的剩余数量*/
            ABook.setStoreNum(leftNum);
            bookRepository.save(ABook);
            bookRepository.flush();
        }
        //orderItemRepository.deleteAllInBatch(items);//删除与此订单号有关的所有item
        List<Orders> order = orderRepository.getOrderById(orderId);
        Iterator<Orders> iter = order.iterator();
        if(!iter.hasNext()){
            System.out.println("Not Found!");
            return null;
        }
        Orders o = iter.next();
        /*String sql = "update orders set finish = ? where order_id = ?";
        Object[] args = {1, o.getOrderId()};//1表示订单已经完成
        jdbcTemplate.update(sql, args);*/
        o.setFinish(1);
        orderRepository.save(o);
        orderRepository.flush();
        return o;
    }

    @Override
    public Orders addOrder(int userId)
    {
        List<Cart> cart = cartRepository.getChosenCartItem(userId, 1);
        Iterator<Cart> got = cart.iterator();
        if(!got.hasNext()){//还没有商品被选中，则下订单失败
            Orders o = new Orders();
            //o.setTotalPrice(0.0);
            o.setUserId(userId);
            o.setDate("2000-01-01");
            o.setOrderId(-1);
            return o;//返回一个失败的标记
        }
        int total = 0;//用于存储选中物品的总价格
        //获取下订单当天的日期信息
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(formatter.format(date));
        int max = getMaxOrderId();
        max++;//获取当前order的自增id编号
        //插入新的order记录
        Orders order = new Orders();
        order.setUserId(userId);
        order.setDate(formatter.format(date));
        //order.setTotalPrice(total);
        order.setFinish(0);//初始状态表示订单未完成
        orderRepository.save(order);
        List<OrderItem> newItems = new ArrayList<>();//记录新订单对应的订单条目
        //orderRepository.flush();//
        for(Cart cartItem : cart){
            List<Book> book = bookRepository.getBook(cartItem.getBookId());
            Iterator<Book> iter = book.iterator();
            Book ABook = iter.next();
            int price = (ABook).getNowPrice();
            int num = cartItem.getBuyNum();
            total += price * num;
            //这里有考虑：是否要在刚下订单的时候就更新剩余书本数量？
            /*int leftNum = ABook.getStoreNum() - num;//获取剩余数量
            String sql = "update bookslist set store_num = ? where book_id = ?";
            Object[] args = {leftNum, cartItem.getBookId()};
            jdbcTemplate.update(sql, args);//更新对应书本的剩余库存量*/
            OrderItem item = new OrderItem();
            item.setPrice(price);//设置购买时的价格信息
            item.setBuyNum(num);
            item.setBookId(cartItem.getBookId());
            item.setOrderId(max);//
            //item.setOrder(order);//
            //newItems.add(item);//添加新的订单条目
            orderItemRepository.save(item);//保存新的orderItem
            orderItemRepository.flush();
        }
        //order.setOrderItems(newItems);//设置订单对应的订单条目信息
        //orderRepository.save(order);//设置订单对应的订单条目信息
        cartRepository.deleteAllInBatch(cart);//删除所有与此订单相关的购物车记录
        /*String sql = "update orders set total_price = ? where order_id = ?";
        Object[] args = {total, max};
        jdbcTemplate.update(sql, args);//更新order的总价格*/
        return order;
    }

    @Override
    public Orders delOrderFormList(int orderId)
    {
        List<Orders> order = orderRepository.getOrderById(orderId);
        Iterator<Orders> iter = order.iterator();
        Orders updateOrder = iter.next();//获取要更新状态的order
        /*String sql = "update orders set finish = ? where order_id = ?";
        Object[] args = {2, updateOrder.getOrderId()};
        jdbcTemplate.update(sql, args);*///将finish更新为2表示订单处于下了但是为支付就被删除的状态
        updateOrder.setFinish(2);
        orderRepository.save(updateOrder);
        orderRepository.flush();
        return updateOrder;
    }

    @Override
    public List<Orders> getSearchedOrders(String info, int userId)
    {
        System.out.println(info);
        List<Orders> ans = new ArrayList<>();
        List<Orders> orders = orderRepository.getOrders(userId);//获取该用户的所有order信息
        if(Objects.equals(info, "") || info == null){
            return orders;//若没有search信息，则直接返回该用户所有order信息
        }
        for(Orders order : orders){
            int id = order.getOrderId();
            //List<OrderItem> items = orderItemRepository.getAllItemById(id);//
            List<OrderItem> items = order.getOrderItems();
            for(OrderItem item : items){
                int bookId = item.getBookId();
                List<Book> book = bookRepository.getBook(bookId);
                Iterator<Book> iter = book.iterator();
                Book b = iter.next();
                String bookName = b.getBookName();
                System.out.println(bookName);
                if(bookName.toLowerCase().contains(info.toLowerCase())){//这里的搜索是按照书名来进行查找的
                    System.out.println(order.getOrderId());
                    //System.out.println(order.getTotalPrice());
                    System.out.println(order.getDate());
                    ans.add(order);
                    break;
                }
            }
        }
        return ans;//返回order的集合
    }

    @Override
    public Orders buyImmediately(int bookId, int userId)
    {
        List<Book> book = bookRepository.getBook(bookId);
        Iterator<Book> iter = book.iterator();
        Book b = iter.next();//获取要立即购买的书本信息
        int price = b.getNowPrice();
        Orders newOrder = new Orders();
        newOrder.setFinish(0);
        newOrder.setUserId(userId);
        //newOrder.setTotalPrice(price);
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(formatter.format(date));
        newOrder.setDate(formatter.format(date));
        orderRepository.save(newOrder);//保存生成的新的order
        //orderRepository.flush();
        int max = getMaxOrderId();
        OrderItem item = new OrderItem();
        item.setPrice(price);//设置刚购买的时的价格信息
        item.setBookId(bookId);
        item.setOrderId(max);//
        //item.setOrder(newOrder);//
        item.setBuyNum(1);
        List<OrderItem> items = new ArrayList<>();//
        items.add(item);
        orderItemRepository.save(item);
        orderItemRepository.flush();
        newOrder.setOrderItems(items);//
        newOrder.setOrderId(max);
        return newOrder;
    }

    @Override
    public Orders checkSearched(int orderId, String info)
    {
        List<Orders> order = orderRepository.getOrderById(orderId);
        Iterator<Orders> iter1 = order.iterator();
        Orders o = iter1.next();
        //List<OrderItem> items = orderItemRepository.getAllItemById(orderId);//
        List<OrderItem> items = o.getOrderItems();
        for(OrderItem item : items){
            int id = item.getBookId();
            List<Book> book = bookRepository.getBook(id);
            Iterator<Book> iter = book.iterator();
            Book b = iter.next();
            String name = b.getBookName();
            if(name.contains(info)) return o;//复合筛选条件
        }
        Orders notO = new Orders();
        notO.setOrderId(-1);//不符合筛选条件
        return notO;
    }

    @Override
    public List<Orders> getAdminOrders()
    {
        return orderRepository.getAllOrders();
    }

    @Override
    public Orders getAOrder(int orderId)
    {
        List<Orders> ans = orderRepository.getOrderById(orderId);
        Iterator<Orders> iter = ans.iterator();
        Orders order = iter.next();
        return order;
    }

    @Override
    public List<Orders> getAdminSearchedOrders(String info)
    {
        System.out.println("要查找的内容:" + info);
        String s = info.substring(1, info.length() - 1);
        System.out.println(s);
        List<Orders> ans = new ArrayList<>();
        List<Orders> orders = orderRepository.getAllOrders();//获取该用户的所有order信息
        orderRepository.flush();
        if(s == "" || s == null){
            return orders;//若没有search信息，则直接返回该用户所有order信息
        }
        for(Orders order : orders){
            int id = order.getOrderId();
            //List<OrderItem> items = orderItemRepository.getAllItemById(id);//
            List<OrderItem> items = order.getOrderItems();//
            orderItemRepository.flush();
            for(OrderItem item : items){
                int bookId = item.getBookId();
                Book b = bookRepository.getById(bookId);
                bookRepository.flush();
                String bookName = b.getBookName();
                //System.out.println(bookName);
                if(bookName.toLowerCase().contains(s.toLowerCase())){//这里的搜索是按照书名来进行查找的
                    ans.add(order);
                    break;
                }
            }
        }
        orderRepository.flush();
        return ans;//返回order的集合
    }

    @Override
    public List<Pair<Book, Integer>> CountUserBuy(int month, int userId, int year)
    {
        String s = String.valueOf(year);
        s += "-";
        if(month < 10) s += "0";
        s += String.valueOf(month);
        s += "-01";//获得对应月份的首日
        //List<Orders> AllOrders = orderRepository.getAllOrders();//
        /*List<Orders> orders = new ArrayList<>();
        for(Orders order : AllOrders){
            String time = order.getDate();
            String gotMonth = time.substring(5, 7);
            int got = 0;
            if(gotMonth.contains("0")) got = Integer.parseInt(gotMonth.substring(1));
            else got = Integer.parseInt(gotMonth);
            if(got == month && order.getUserId() == userId && order.getFinish() == 1)
                orders.add(order);
        }//筛选符合条件的订单*/
        List<Orders> orders = orderRepository.getUserOrdersByMonth(s, userId);
        List<Pair<Book, Integer>> pairs = new ArrayList<>();
        List<Integer> nums = new ArrayList<>();
        List<Book> books = bookRepository.getBooks();
        for(int i = 0;i < books.size();++i) nums.add(0);
        for(Orders order : orders){
            List<OrderItem> items = order.getOrderItems();
            for(OrderItem item : items){
                for(int i = 0;i < books.size();++i){
                    if(books.get(i).getBookId() == item.getBookId()){
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
        return pairs;
    }
}
