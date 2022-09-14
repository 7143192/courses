package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface RelationshipRepository extends JpaRepository<Relationship, Integer> {
    @Query("from Relationship where user_id = :user_id")
    List<Relationship> getAllRelationshipById(@Param("user_id") int user_id);//这个是在获取一个用户所有好友关系

    //这个是在获取一个用户是否具有一个好友关系，可以用于查找，删除原有关系与添加新关系
    @Query("from Relationship where (user_id = :user_id and friend_id = :friend_id) ")
    Relationship getARelationshipById(@Param("user_id") int user_id,
                                      @Param("friend_id") int friend_id);
}
