package com.example.bookstorebackend2.service;
import com.example.bookstorebackend2.entity.Book;

import java.util.List;

public interface BookService {
    List<Book> getBooks();
    Book getBook(int id);
    Book deleteBook(int id);
    Book updateNowPrice(int bookId, int nowPrice);
    Book updatePrevPrice(int bookId, int prevPrice);
    Book updateImage(int bookId, String image);
    Book updateISBN(int bookId, int isbn);
    Book updateStoreNum(int bookId, int num);
    Book updateName(int bookId, String name);
    Book updateAuthor(int bookId, String author);
    List<Book> searchBook(String info);
    Book makeBookShown();
}
