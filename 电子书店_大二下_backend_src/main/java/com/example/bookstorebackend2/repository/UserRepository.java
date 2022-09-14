package com.example.bookstorebackend2.repository;
import com.example.bookstorebackend2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "from User where username = :username and password = :user_password")
    List<User> checkUser(@Param("username")String username, @Param("user_password") String password);

    @Query("select u from User u")
    List<User> getAllUsers();
}
