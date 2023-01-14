package com.example.bookstorebackend2.daoimpl;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.repository.CartRepository;
import com.example.bookstorebackend2.dao.CartDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.Iterator;
import java.util.List;
import static org.springframework.util.ObjectUtils.isEmpty;

@Repository
public class CartDaoImpl implements CartDao{
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Cart> getCartItem(int userId)
    {
        return cartRepository.getCartItem(userId);
    }

    @Override
    public Cart deleteCartItem(int cartId)
    {
        List<Cart> cart = cartRepository.getCartItemById(cartId);
        Iterator<Cart> iter = cart.iterator();
        if(!iter.hasNext()){
            System.out.println("Can't find the corresponding cart item!");
            return null;
        }
        Cart c = iter.next();
        cartRepository.delete(c);
        return c;
    }

    @Override
    public Cart updateChosen(int cartId)
    {
        Cart cart = cartRepository.getById(cartId);
        int chosen = (1 - cart.getChosen());
        /*String sql = "update cart set chosen = ? where cart_id = ?";
        Object[] args = {chosen, cartId};
        jdbcTemplate.update(sql, args);*/
        cart.setChosen(chosen);
        cartRepository.save(cart);
        cartRepository.flush();
        return cart;
    }

    @Override
    public Cart addCart(int bookId, int userId, int num)
    {
        List<Cart> carts = cartRepository.getCartItem(userId);
        for(Cart c : carts){
            if(c.getBookId() == bookId){
                int n = c.getBuyNum();
                n++;
                /*String sql = "update cart set buy_num = ? where cart_id = ?";
                Object[] args = {n, c.getCartId()};
                jdbcTemplate.update(sql, args);*/
                c.setBuyNum(n);
                cartRepository.save(c);
                cartRepository.flush();
                return c;//若有重复的书籍，则直接采购数量++
            }
        }
        Cart cart = new Cart();
        cart.setBookId(bookId);
        cart.setUserId(userId);
        cart.setBuyNum(num);
        cart.setChosen(0);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public Cart updateNum(int cartId, int num)
    {
        Cart cart = cartRepository.getById(cartId);
        //cart.setBuyNum(num);
        /*String sql = "update cart set buy_num = ? where cart_id = ?";
        Object[] args = {num, cartId};
        jdbcTemplate.update(sql, args);*/
        cart.setBuyNum(num);
        cartRepository.save(cart);
        cartRepository.flush();
        return cart;
    }

    @Override
    public List<Cart> delAllCart(int userId)
    {
        List<Cart> carts = cartRepository.getCartItem(userId);
        cartRepository.deleteAllInBatch(carts);//清空某个用户的购物车
        return carts;
    }

    @Override
    public List<Cart> chooseAll(int userId)
    {
        List<Cart> carts = cartRepository.getCartItem(userId);
        boolean changed = false;
        for(Cart cart : carts){
            int id = cart.getCartId();
            int chosen = cart.getChosen();
            if(chosen == 1) continue;//跳过已经被选中的商品
            changed = true;
            /*String sql = "update cart set chosen = ? where cart_id = ?";
            Object[] args = {1 - chosen, id};
            jdbcTemplate.update(sql, args);*/
            cart.setChosen(1 - chosen);
            cartRepository.save(cart);
            cartRepository.flush();
        }
        if(!changed){
            for(Cart cart : carts){
                int id = cart.getCartId();
                /*String sql = "update cart set chosen = ? where cart_id = ?";
                Object[] args = {0, id};
                jdbcTemplate.update(sql, args);*/
                cart.setChosen(0);
                cartRepository.save(cart);
                cartRepository.flush();
            }
        }
        return carts;
    }

    @Override
    public Cart getACart(int cartId)
    {
        List<Cart> ans = cartRepository.getCartItemById(cartId);
        Iterator<Cart> iter = ans.iterator();
        return iter.next();
    }

    @Override
    public List<Cart> getChosenCartItem(int userId) {
        return cartRepository.getChosenCartItem(userId, 1);
    }
}
