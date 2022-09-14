package com.example.bookstorebackend2.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "bookslist")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "bookId")
public class Book {
    @Id
    @Column(name = "book_id")
    private int bookId;
    private Integer IsbnNum;
    private String bookName;
    private String bookAuthor;
    private int NowPrice;
    private int PrevPrice;
    private Integer StoreNum;
    private String description;
    private String image;
    private int isShown;
//注意数据库中字段的命名方式！暂时来看应该尽量避免大写字母
    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getBookId()
    {
        return this.bookId;
    }
    public void setBookId(int id)
    {
        this.bookId = id;
    }
    @Basic
    @Column(name = "ISBN")
    public Integer getIsbnNum()
    {
        return this.IsbnNum;
    }
    public void setIsbnNum(Integer num)
    {
        this.IsbnNum = num;
    }
    @Basic
    @Column(name = "book_name")
    public String getBookName()
    {
        return this.bookName;
    }
    public void setBookName(String name)
    {
        this.bookName = name;
    }
    @Basic
    @Column(name = "book_author")
    public String getBookAuthor()
    {
        return this.bookAuthor;
    }
    public void setBookAuthor(String author)
    {
        this.bookAuthor = author;
    }
    @Basic
    @Column(name = "now_price")
    public int getNowPrice()
    {
        return this.NowPrice;
    }
    public void setNowPrice(int price)
    {
        this.NowPrice = price;
    }
    @Basic
    @Column(name = "prev_price")
    public int getPrevPrice()
    {
        return this.PrevPrice;
    }
    public void setPrevPrice(int price)
    {
        this.PrevPrice = price;
    }
    @Basic
    @Column(name = "store_num")
    public Integer getStoreNum()
    {
        return this.StoreNum;
    }
    public void setStoreNum(Integer num)
    {
        this.StoreNum = num;
    }
    @Basic
    @Column(name = "description")
    public String getDescription()
    {
        return this.description;
    }
    public void setDescription(String description)
    {
        this.description = description;
    }
    @Basic
    @Column(name = "image")
    public String getImage()
    {
        return this.image;
    }
    public void setImage(String image)
    {
        this.image = image;
    }
    @Basic
    @Column(name = "is_shown")
    public int getIsShown()
    {
        return this.isShown;
    }
    public void setIsShown(int shown)
    {
        this.isShown = shown;
    }
}
