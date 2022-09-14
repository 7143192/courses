package com.example.bookstorebackend2.service;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.OrderItem;
import com.example.bookstorebackend2.entity.User;
import javafx.util.Pair;

import java.util.List;

public interface OrderItemService {
    List<OrderItem> getOrderItems(int orderId);
    OrderItem updateNum(int itemId, int Num);
    int getSoldNum(int bookId, int month);
    List<Pair<Book, Integer>> getFirstBooks(int month, int year);
    List<Pair<User, Integer>> getUserTotalPrice(int month, int year);
}
