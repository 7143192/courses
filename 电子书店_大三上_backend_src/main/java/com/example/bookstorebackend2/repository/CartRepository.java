package com.example.bookstorebackend2.repository;
import com.example.bookstorebackend2.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface CartRepository extends JpaRepository<Cart, Integer>{
    @Query(value = "from Cart where userId = :id")
    List<Cart> getCartItem(@Param("id") int userId);

    @Query(value = "from Cart where cartId = :id")
    List<Cart> getCartItemById(@Param("id") int cartId);

    @Query(value = "from Cart where userId = :id and chosen = :chosen")
    List<Cart> getChosenCartItem(@Param("id") int userId, @Param("chosen") int chosen);
}
