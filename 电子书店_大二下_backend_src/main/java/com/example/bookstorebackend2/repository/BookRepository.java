package com.example.bookstorebackend2.repository;
import com.example.bookstorebackend2.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface BookRepository extends JpaRepository<Book,Integer>{
    @Query("select b from Book b")
    List<Book> getBooks();

    @Query(value = "from Book where bookId = :id")
    List<Book> getBook(@Param("id") int id);

    @Query(value = "from Book where isShown = 1")
    List<Book> getNotShownBooks();
}
