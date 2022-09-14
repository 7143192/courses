package com.example.bookstorebackend2.serviceimpl;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Orders;
import com.example.bookstorebackend2.dao.OrderDao;
import com.example.bookstorebackend2.service.OrderService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao;

    @Override
    public Orders deleteOrder(int orderId)
    {
        return orderDao.deleteOrder(orderId);
    }

    @Override
    public Orders addOrder(int userId)
    {
        return orderDao.addOrder(userId);
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
}
