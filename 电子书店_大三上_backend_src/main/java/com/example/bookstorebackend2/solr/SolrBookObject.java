package com.example.bookstorebackend2.solr;

import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.BookImage;
import org.apache.solr.client.solrj.beans.Field;

public class SolrBookObject {

    // need to use string for id
    @Field("bookId")
    private String bookId;
    @Field("IsbnNum")
    private String IsbnNum;
    @Field("bookName")
    private String bookName;
    @Field("bookAuthor")
    private String bookAuthor;
    @Field("description")
    private String description;
    @Field("image")
    private BookImage image;
    @Field("keyword")
    private String keyword;

    public SolrBookObject(String id, String isbn, String name,
                          String author, String description,
                          BookImage image, String keyword) {
        this.bookId = id;
        this.IsbnNum = isbn;
        this.bookName = name;
        this.bookAuthor = author;
        this.description = description;
        this.image = image;
        this.keyword = keyword;
    }

    public SolrBookObject() {
    }

    public SolrBookObject(Book b) {
        this.bookId = String.valueOf(b.getBookId());
        this.IsbnNum = String.valueOf(b.getIsbnNum());
        this.bookName = b.getBookName();
        this.bookAuthor = b.getBookAuthor();
        this.description = b.getDescription();
        this.image = b.getBookImage();
        this.keyword = b.getKeyword();
    }

    public String getBookId()
    {
        return this.bookId;
    }
    public void setBookId(String id)
    {
        this.bookId = id;
    }
    public String getIsbnNum()
    {
        return this.IsbnNum;
    }
    public void setIsbnNum(String num)
    {
        this.IsbnNum = num;
    }
    public String getBookName()
    {
        return this.bookName;
    }
    public void setBookName(String name)
    {
        this.bookName = name;
    }
    public String getBookAuthor()
    {
        return this.bookAuthor;
    }
    public void setBookAuthor(String author)
    {
        this.bookAuthor = author;
    }
    public String getDescription()
    {
        return this.description;
    }
    public void setDescription(String description)
    {
        this.description = description;
    }
    public BookImage getImage()
    {
        return this.image;
    }
    public void setImage(BookImage image)
    {
        this.image = image;
    }
    public String getKeyword()
    {
        return this.keyword;
    }
    public void setKeyword(String word)
    {
        this.keyword = word;
    }
}
