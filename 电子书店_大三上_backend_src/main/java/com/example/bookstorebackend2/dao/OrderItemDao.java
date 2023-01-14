package com.example.bookstorebackend2.dao;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.entity.OrderItem;
import com.example.bookstorebackend2.entity.User;
import javafx.util.Pair;
import java.util.List;
public interface OrderItemDao {
    List<OrderItem> getOrderItems(int orderId);
    OrderItem updateNum(int itemId, int Num);
    int getSoldNum(int bookId, int month);
    List<Pair<Book, Integer>> getFirstBooks(int month, int year);
    List<Pair<User, Integer>> getUserTotalPrice(int month, int year);
    void addOrderItemsByOrder(List<Cart> items);
}
