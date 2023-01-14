package com.example.bookstorebackend2.serviceimpl;
import com.example.bookstorebackend2.dao.CartDao;
import com.example.bookstorebackend2.dao.OrderItemDao;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.entity.Orders;
import com.example.bookstorebackend2.dao.OrderDao;
import com.example.bookstorebackend2.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import javafx.util.Pair;
@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderItemDao orderItemDao;
    @Autowired
    private CartDao cartDao;

    @Override
    public Orders deleteOrder(int orderId)
    {
        return orderDao.deleteOrder(orderId);
    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Orders addOrder(int userId, List<Cart> items)
    {
        //List<Cart> items = cartDao.getChosenCartItem(userId);//获取下订单时用户选中的购物车项
        Orders new_order = orderDao.addOrder(userId);//插入新的order信息
        //int res = 10 / 0;
        try {
            orderItemDao.addOrderItemsByOrder(items);//插入对应的items信息
        } catch(Exception e) {
            e.printStackTrace();
        }
        //int res = 10 / 0;
        return new_order;
    }

    @Override
    public Orders delOrderFromList(int orderId)
    {
        return orderDao.delOrderFormList(orderId);
    }

    @Override
    public List<Orders> getSearchedOrders(String info, int userId)
    {
        return orderDao.getSearchedOrders(info, userId);
    }

    @Override
    public Orders buyImmediately(int bookId, int userId)
    {
        return orderDao.buyImmediately(bookId, userId);
    }

    @Override
    public Orders checkSearched(int orderId, String info)
    {
        return orderDao.checkSearched(orderId, info);
    }

    @Override
    public List<Orders> getAdminOrders()
    {
        return orderDao.getAdminOrders();
    }

    @Override
    public Orders getAOrder(int orderId)
    {
        return orderDao.getAOrder(orderId);
    }

    @Override
    public List<Orders> getAdminSearchedOrders(String info)
    {
        return orderDao.getAdminSearchedOrders(info);
    }

    @Override
    public List<Pair<Book, Integer>> CountUserBuy(int month, int userId, int year)
    {
        return orderDao.CountUserBuy(month, userId, year);
    }

    @Override
    public Orders getLastOrder()
    {
        return orderDao.getLastOrder();
    }
}
