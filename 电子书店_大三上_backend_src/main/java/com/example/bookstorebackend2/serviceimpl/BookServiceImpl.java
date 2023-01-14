package com.example.bookstorebackend2.serviceimpl;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.dao.BookDao;
import com.example.bookstorebackend2.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService{
    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> getBooks()
    {
        return bookDao.getBooks();
    }

    @Override
    public Book getBook(int id)
    {
        return bookDao.getBook(id);
    }

    @Override
    public Book deleteBook(int id)
    {
        return bookDao.deleteBook(id);
    }

    @Override
    public Book updateNowPrice(int bookId, int nowPrice)
    {
        return bookDao.updateNowPrice(bookId, nowPrice);
    }

    @Override
    public Book updatePrevPrice(int bookId, int prevPrice)
    {
        return bookDao.updatePrevPrice(bookId, prevPrice);
    }

    @Override
    public Book updateImage(int bookId, String image)
    {
        return bookDao.updateImage(bookId, image);
    }

    @Override
    public Book updateISBN(int bookId, int isbn)
    {
        return bookDao.updateISBN(bookId, isbn);
    }

    @Override
    public Book updateStoreNum(int bookId, int num)
    {
        return bookDao.updateStoreNum(bookId, num);
    }

    @Override
    public Book updateName(int bookId, String name)
    {
        return bookDao.updateName(bookId, name);
    }

    @Override
    public Book updateAuthor(int bookId, String author)
    {
        return bookDao.updateAuthor(bookId, author);
    }

    @Override
    public List<Book> searchBook(String info)
    {
        return bookDao.searchBook(info);
    }

    @Override
    public Book makeBookShown()
    {
        return bookDao.makeBookShown();
    }

    @Override
    public List<Book> SearchByTag(String tag)
    {
        return bookDao.SearchByTag(tag);
    }
}
