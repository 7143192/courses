package com.example.bookstorebackend2.dao;
import com.example.bookstorebackend2.entity.Cart;
import java.util.List;

public interface CartDao {
    List<Cart> getCartItem(int userId);
    Cart deleteCartItem(int cartId);
    Cart updateChosen(int cartId);
    Cart addCart(int bookId, int userId, int num);
    Cart updateNum(int cartId, int num);
    List<Cart> delAllCart(int userId);
    List<Cart> chooseAll(int userId);
    Cart getACart(int cartId);
    List<Cart> getChosenCartItem(int userId);
}
