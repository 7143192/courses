package com.example.bookstorebackend2.serviceimpl;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.dao.CartDao;
import com.example.bookstorebackend2.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartServiceImpl implements CartService{
    @Autowired
    private CartDao cartDao;

    @Override
    public List<Cart> getCartItem(int userId)
    {
        return cartDao.getCartItem(userId);
    }

    @Override
    public Cart deleteCartItem(int cartId)
    {
        return cartDao.deleteCartItem(cartId);
    }

    @Override
    public Cart updateChosen(int cartId)
    {
        return cartDao.updateChosen(cartId);
    }

    @Override
    public Cart addCart(int bookId, int userId, int num)
    {
        return cartDao.addCart(bookId, userId, num);
    }

    @Override
    public Cart updateNum(int cartId, int num)
    {
        return cartDao.updateNum(cartId, num);
    }

    @Override
    public List<Cart> delAllCart(int userId)
    {
        return cartDao.delAllCart(userId);
    }

    @Override
    public List<Cart> chooseAll(int userId)
    {
        return cartDao.chooseAll(userId);
    }

    @Override
    public Cart getACart(int cartId)
    {
        return cartDao.getACart(cartId);
    }
}
