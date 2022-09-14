package com.example.bookstorebackend2.repository;
import com.example.bookstorebackend2.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface OrderItemRepository extends JpaRepository<OrderItem,Integer>{
    //@Query(value = "from OrderItem where orderId = :id")
    //List<OrderItem> getAllItemById(@Param("id") int id);

    @Query(value = "from OrderItem where itemId = :id")
    List<OrderItem> getItem(@Param("id") int itemId);

    @Query("select oi from OrderItem oi")
    List<OrderItem> getAllItems();
}
