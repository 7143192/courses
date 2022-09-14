package com.example.bookstorebackend2.dao;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Orders;
import javafx.util.Pair;

import java.util.List;

public interface OrderDao {
    Orders deleteOrder(int orderId);
    Orders addOrder(int userId);
    Orders delOrderFormList(int orderId);
    List<Orders> getSearchedOrders(String info, int userId);
    Orders buyImmediately(int bookId, int userId);
    Orders checkSearched(int orderId, String info);
    List<Orders> getAdminOrders();
    Orders getAOrder(int orderId);
    List<Orders> getAdminSearchedOrders(String info);
    List<Pair<Book, Integer>> CountUserBuy(int month, int userId, int year);
}
