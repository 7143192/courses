package com.example.sportapp_backend.repository;

import com.example.sportapp_backend.entity.Target_like;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikeRepositoery extends JpaRepository<Target_like, Integer> {
    @Query(value = "from Target_like where target_type = 1 and target_id = :target_id ")
    List<Target_like> getCourseLike(int target_id);

    @Query(value = "from Target_like where target_type = 2 and target_id = :target_id ")
    List<Target_like> getMomentLike(int target_id);

    @Query(value = "from Target_like where target_type = 3 and target_id = :target_id ")
    List<Target_like> getCommentLike(int target_id);

    @Query(value = "from Target_like where target_type = 4 and target_id = :target_id ")
    List<Target_like> getReplyLike(int target_id);

    @Query(value = "from Target_like where target_type = :target_type and target_id = :target_id and user_id = :user_id")
    Target_like getSpecificOne(int target_type, int target_id, int user_id);

    @Query(value="from Target_like where target_type = :target_type and target_id = :target_id and user_id = :user_id")
    //@Cacheable(value="likeCache")
    List<Target_like> getLikeByUser(@Param("target_type") int target_type,
                                    @Param("target_id") int target_id,
                                    @Param("user_id") int user_id);

    @Modifying
    @Transactional
    @Query(value = "delete from Target_like where target_type = :target_type and target_id = :target_id and user_id = :user_id")
    void deleteLike(int target_type, int target_id, int user_id);

    @Query(value = "from Target_like where target_type = :target_type and target_id = :target_id ")
    List<Target_like> getLikeNumByTypeId(int target_type, int target_id);

    @Query(value="from Target_like where user_id = :user_id")
    List<Target_like> getLikesByUser(@Param("user_id") int user_id);
}
