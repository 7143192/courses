package com.example.bookstorebackend2.serviceimpl;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.OrderItem;
import com.example.bookstorebackend2.dao.OrderItemDao;
import com.example.bookstorebackend2.entity.User;
import com.example.bookstorebackend2.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javafx.util.Pair;
@Service
public class OrderItemServiceImpl implements OrderItemService{
    @Autowired
    private OrderItemDao orderItemDao;

    @Override
    public List<OrderItem> getOrderItems(int orderId)
    {
        return orderItemDao.getOrderItems(orderId);
    }

    @Override
    public OrderItem updateNum(int itemId, int Num)
    {
        return orderItemDao.updateNum(itemId, Num);
    }

    @Override
    public int getSoldNum(int bookId, int month)
    {
        return orderItemDao.getSoldNum(bookId, month);
    }

    @Override
    public List<Pair<Book, Integer>> getFirstBooks(int month, int year)
    {
        return orderItemDao.getFirstBooks(month, year);
    }

    @Override
    public List<Pair<User, Integer>> getUserTotalPrice(int month, int year)
    {
        return orderItemDao.getUserTotalPrice(month, year);
    }
}
