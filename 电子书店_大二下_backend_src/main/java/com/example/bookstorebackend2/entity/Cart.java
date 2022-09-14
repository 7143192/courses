package com.example.bookstorebackend2.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "cart")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "cartId")
public class Cart {
    @Id
    @Column(name = "cart_id")
    private int cartId;
    private int bookId;
    private int userId;
    private Integer buyNum;
    private Integer chosen;

    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getCartId()
    {
        return this.cartId;
    }
    public void setCartId(int id)
    {
        this.cartId = id;
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
    @Column(name = "buy_num")
    public int getBuyNum()
    {
        return this.buyNum;
    }
    public void setBuyNum(int num)
    {
        this.buyNum = num;
    }
    @Basic
    @Column(name = "chosen")
    public int getChosen()
    {
        return this.chosen;
    }
    public void setChosen(Integer chosen)
    {
        this.chosen = chosen;
    }
}
