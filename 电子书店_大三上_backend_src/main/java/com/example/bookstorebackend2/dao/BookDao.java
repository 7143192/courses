package com.example.bookstorebackend2.dao;
import com.example.bookstorebackend2.entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> getBooks();//获取所有书籍信息
    Book getBook(int id);//根据id获取一本书
    Book deleteBook(int id);//删除一本书
    Book updateNowPrice(int bookId, int nowPrice);
    Book updatePrevPrice(int bookId, int prevPrice);
    Book updateImage(int bookId, String image);
    Book updateISBN(int bookId, int isbn);
    Book updateStoreNum(int bookId, int num);
    Book updateName(int bookId, String name);
    Book updateAuthor(int bookId, String author);
    List<Book> searchBook(String info);
    Book makeBookShown();
    List<Book> SearchByTag(String tag);
}
