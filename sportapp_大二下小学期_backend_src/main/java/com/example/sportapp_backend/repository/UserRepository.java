package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
//import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("from User where phone = :username and pwd = :password")
    List<User> checkUser(@Param("username") String username,
                         @Param("password") String password);

    @Query("from User where nickname = :nickname")
    User getByNickname(@Param("nickname") String nickname);

    @Query("from User where user_id = :userId")
    User getUserById(@Param("userId")int userId);

    @Query("from User where phone = :phone")
    User getUserByPhone(@Param("phone")String phone);

    @Query("from User where phone = :phone")
    User getUserInfoByPhone(@Param("phone")String phone);

    @Modifying
    @Transactional
    @Query(value = "update User set pwd = :newPwd where phone = :phone")
    int updatePwdByPhone(String phone, String newPwd);
}
