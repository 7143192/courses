package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
//这里就不再写获取某个用户的favorite的函数了，因为已经与user绑定了
public interface FavoriteRepository extends JpaRepository<Favorite, Integer>{
    @Query(value="from Favorite where user_id = :userId and course_id = :courseId")
    List<Favorite> getFavoritesByUser(@Param("userId") int userId,
                                      @Param("courseId") int courseId);

    @Query(value="from Favorite where user_id = :userId")
    List<Favorite> getFavoritesByUserId(@Param("userId") int userId);
}
