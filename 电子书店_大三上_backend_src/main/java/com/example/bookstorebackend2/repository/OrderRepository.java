package com.example.bookstorebackend2.repository;
import com.example.bookstorebackend2.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Integer> {
    @Query(value = "from Orders where userId = :id")
    List<Orders> getOrders(@Param("id") int userId);

    @Query(value = "from Orders where orderId = :id")
    List<Orders> getOrderById(@Param("id") int id);

    @Query("select o from Orders o")
    List<Orders> getAllOrders();

    @Query(value = "from Orders where finish = 1")
    List<Orders> getOrdersByState();

    @Query(value = "from Orders where finish = 1 and date between :time and LAST_DAY(:time)")
    List<Orders> getOrdersByMonth(@Param("time") String time);//根据时间筛选所有满足条件的订单

    @Query(value = "from Orders where finish = 1 and date between :time and LAST_DAY(:time) and userId = :id")
    List<Orders> getUserOrdersByMonth(@Param("time") String time, @Param("id") int id);//根据时间来筛选某个用户已经完成的订单

    @Query(value = "select * from orders order by order_id desc limit 1",
            nativeQuery = true)
    Orders getLastOrder();
}
