package com.example.bookstorebackend2.repository;
import com.example.bookstorebackend2.entity.Book;
import com.example.bookstorebackend2.entity.BookImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookImageRepository extends MongoRepository<BookImage, Integer> {

}
