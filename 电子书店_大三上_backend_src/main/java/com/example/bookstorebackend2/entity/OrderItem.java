package com.example.bookstorebackend2.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import javax.persistence.*;
import com.example.bookstorebackend2.entity.Orders;

@Data
@Entity
@Table(name = "orderitem")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "itemId")
public class OrderItem {
    @Id
    @Column(name = "item_id")
    private int itemId;
    private int bookId;
    private int orderId;
    private int price;//记录刚刚下这个订单时这本书的价格(价格快照)
    private int buyNum;
    //private Orders order;

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getItemId()
    {
        return itemId;
    }
    public void setItemId(int id)
    {
        this.itemId = id;
    }
    @Basic
    @Column(name = "book_id")
    public int getBookId()
    {
        return this.bookId;
    }
    public void setBookId(int id)
    {
        this.bookId = id;
    }
    @Basic
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
    @Column(name = "price")
    public int getPrice()
    {
        return this.price;
    }
    public void setPrice(int price)
    {
        this.price = price;
    }
    @Basic
    @Column(name = "buy_num")
    public int getBuyNum()
    {
        return this.buyNum;
    }
    public void setBuyNum(int num)
    {
        this.buyNum = num;
    }
    /*@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    public Orders getOrder()
    {
        return this.order;
    }
    public void setOrder(Orders o)
    {
        this.order = o;
    }*/
}
