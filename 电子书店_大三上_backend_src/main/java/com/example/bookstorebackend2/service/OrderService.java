package com.example.bookstorebackend2.service;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.entity.Orders;
import javafx.util.Pair;
import java.util.List;
public interface OrderService {
    Orders deleteOrder(int orderId);
    Orders addOrder(int userId, List<Cart> items);
    Orders delOrderFromList(int orderId);
    List<Orders> getSearchedOrders(String info, int userId);
    Orders buyImmediately(int bookId, int userId);
    Orders checkSearched(int orderId, String info);
    List<Orders> getAdminOrders();
    Orders getAOrder(int orderId);
    List<Orders> getAdminSearchedOrders(String info);
    List<Pair<Book, Integer>> CountUserBuy(int month, int userId, int year);
    Orders getLastOrder();
}
