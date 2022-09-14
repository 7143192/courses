package com.example.bookstorebackend2.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.example.bookstorebackend2.entity.OrderItem;

@Data
@Entity
@Table(name = "Orders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "orderId")
public class Orders {
    @Id
    @Column(name = "order_id")
    private int orderId;
    private int userId;
    private String date;
    //private Double totalPrice;
    private int finish;
    private List<OrderItem> orderItems;

    @Id
    @Column(name = "order_id")
    public int getOrderId()
    {
        return this.orderId;
    }
    public void setOrderId(int id)
    {
        this.orderId = id;
    }
    @Basic
    @Column(name = "user_id")
    public int getUserId()
    {
        return this.userId;
    }
    public void setUserId(int id)
    {
        this.userId = id;
    }
    @Basic
    @Column(name = "order_date")
    public String getDate()
    {
        return this.date;
    }
    public void setDate(String date)
    {
        this.date = date;
    }
    /*@Basic
    @Column(name = "total_price")
    public double getTotalPrice()
    {
        return this.totalPrice;
    }
    public void setTotalPrice(Double price)
    {
        this.totalPrice = price;
    }*/
    @Basic
    @Column(name = "finish")
    public int getFinish()
    {
        return this.finish;
    }
    public void setFinish(int f)
    {
        this.finish = f;
    }
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    public List<OrderItem> getOrderItems()
    {
        return this.orderItems;
    }
    public void setOrderItems(List<OrderItem> items)
    {
        this.orderItems = items;
    }
}
