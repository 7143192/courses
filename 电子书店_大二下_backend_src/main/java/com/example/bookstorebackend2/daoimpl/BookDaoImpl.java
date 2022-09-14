package com.example.bookstorebackend2.daoimpl;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.repository.BookRepository;
import com.example.bookstorebackend2.dao.BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class BookDaoImpl implements BookDao{
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Book getSingleBook(int id)
    {
        List<Book> book = bookRepository.getBook(id);
        Iterator<Book> iter = book.iterator();
        if(!iter.hasNext()){
            System.out.println("can't find the book!");
            return null;
        }
        return iter.next();
    }

    @Override
    public List<Book> getBooks()
    {
        List<Book> books = bookRepository.getBooks();
        for (Book book : books) {
            System.out.println(book.getBookId());
            System.out.println(book.getBookName());
            System.out.println(book.getNowPrice());
            System.out.println(book.getBookAuthor());
        }
        return books;
    }

    @Override
    public Book getBook(int id)
    {
        List<Book> book = bookRepository.getBook(id);
        Iterator<Book> iter = book.iterator();
        if(!iter.hasNext()){
            System.out.println("can't find the book!");
            return null;
        }
        Book gotbook = iter.next();
        System.out.println(gotbook.getBookName());
        System.out.println(gotbook.getBookAuthor());
        System.out.println(gotbook.getPrevPrice());
        return gotbook;
    }

    @Override
    public Book deleteBook(int id)
    {
        Book del = getSingleBook(id);
        bookRepository.delete(del);
        return del;//删除成功
    }

    @Override
    public Book updateNowPrice(int bookId, int nowPrice)
    {
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set now_price = ? where book_id = ?";
        Object[] args = {nowPrice, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setNowPrice(nowPrice);
        bookRepository.save(book);
        bookRepository.flush();;
        return book;
    }

    @Override
    public Book updatePrevPrice(int bookId, int prevPrice)
    {
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set prev_price = ? where book_id = ?";
        Object[] args = {prevPrice, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setPrevPrice(prevPrice);
        bookRepository.save(book);
        bookRepository.flush();;
        return book;
    }

    @Override
    public Book updateImage(int bookId, String image)
    {
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set image = ? where book_id = ?";
        Object[] args = {image, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setImage(image);
        bookRepository.save(book);
        bookRepository.flush();
        return book;
    }

    @Override
    public Book updateISBN(int bookId, int isbn)
    {
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set isbn = ? where book_id = ?";
        Object[] args = {isbn, bookId};
        jdbcTemplate.update(sql, args);
        book.setIsbnNum(isbn);*/
        book.setIsbnNum(isbn);
        bookRepository.save(book);
        bookRepository.flush();
        return book;
    }

    @Override
    public Book updateStoreNum(int bookId, int num)
    {
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set store_num = ? where book_id = ?";
        Object[] args = {num, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setStoreNum(num);
        bookRepository.save(book);
        bookRepository.flush();
        return book;
    }

    @Override
    public Book updateName(int bookId, String name)
    {
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set book_name = ? where book_id = ?";
        Object[] args = {name, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setBookName(name);
        bookRepository.save(book);
        bookRepository.flush();
        return book;
    }

    @Override
    public Book updateAuthor(int bookId, String author)
    {
        Book book = getSingleBook(bookId);
        /*String sql = "update bookslist set book_author = ? where book_id = ?";
        Object[] args = {author, bookId};
        jdbcTemplate.update(sql, args);*/
        book.setBookAuthor(author);
        bookRepository.save(book);
        bookRepository.flush();
        return book;
    }

    @Override
    public List<Book> searchBook(String info)
    {
        List<Book> books = bookRepository.getBooks();
        List<Book> ans = new ArrayList<>();
        if(Objects.equals(info, "") || info == null) return books;
        for(Book book : books){
            String name = book.getBookName();
            if(name.toLowerCase().contains(info.toLowerCase())){
                System.out.println("符合条件的输信息:"+book.getBookName()+"," + book.getBookId());
                ans.add(book);
            }
        }
        return ans;
    }

    @Override
    public Book makeBookShown()
    {
        List<Book> notShown = bookRepository.getNotShownBooks();
        Iterator<Book> iter = notShown.iterator();
        if(!iter.hasNext()){
            Book got = new Book();
            got.setBookId(-1);
            return got;
        }
        Book book = iter.next();
        /*String sql = "update bookslist set is_shown = ? where book_id = ?";
        Object[] args = {0, book.getBookId()};
        jdbcTemplate.update(sql, args);*/
        book.setIsShown(0);
        bookRepository.save(book);
        bookRepository.flush();
        return book;
    }
}
