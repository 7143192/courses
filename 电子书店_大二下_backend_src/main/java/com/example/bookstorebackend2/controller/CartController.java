package com.example.bookstorebackend2.controller;
import com.example.bookstorebackend2.entity.Cart;
import com.example.bookstorebackend2.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    //@CrossOrigin
    @RequestMapping("/getCart")
    public @ResponseBody List<Cart> getCartItem(@RequestParam("id") int userId)
    {
        return cartService.getCartItem(userId);
    }

    //@CrossOrigin
    @RequestMapping("/delCart")//删除单个cartItem
    public @ResponseBody Cart deleteCartItem(@RequestParam("id") int cartId)
    {
        return cartService.deleteCartItem(cartId);
    }

    //@CrossOrigin
    @RequestMapping("/delAllCart")
    public @ResponseBody List<Cart> delAllCart(@RequestParam("id") int userId)
    {
        return cartService.delAllCart(userId);
    }

    //@CrossOrigin
    @RequestMapping("/updateChosen")
    public @ResponseBody Cart updateChosen(@RequestParam("id") int cartId)
    {
        return cartService.updateChosen(cartId);
    }

    //@CrossOrigin
    @RequestMapping("/addCart")
    public @ResponseBody Cart addCart(@RequestParam("bookId") int bookId,
                                      @RequestParam("userId") int userId,
                                      @RequestParam("num") int num)
    {
        return cartService.addCart(bookId, userId, num);
    }

    //@CrossOrigin
    @RequestMapping("/updateNum")//通过按钮的电机更新购物车中的某一本书的待购买数量
    public @ResponseBody Cart updateNum(@RequestParam("id") int cartId, @RequestParam("num") int num)
    {
        return cartService.updateNum(cartId, num);
    }

    //@CrossOrigin
    @RequestMapping("/chooseAll")
    public @ResponseBody List<Cart> chooseAll(@RequestParam("id") int userId)
    {
        return cartService.chooseAll(userId);
    }

    @RequestMapping("/getACart")
    public @ResponseBody Cart getACart(@RequestParam("id") int cartId)
    {
        return cartService.getACart(cartId);
    }
}
