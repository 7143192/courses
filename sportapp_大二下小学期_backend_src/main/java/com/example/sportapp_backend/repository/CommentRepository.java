package com.example.sportapp_backend.repository;

import com.example.sportapp_backend.entity.Target_comment;
import com.example.sportapp_backend.entity.Target_like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface CommentRepository extends JpaRepository<Target_comment, Integer> {
    @Query(value = "from Target_comment where target_type =:target_type and target_id =:target_id")
    List<Target_comment> getCommentByTypeId(int target_type, int target_id);

    @Query(value = "from Target_comment where target_type =:target_type and target_id =:target_id and user_id = :user_id")
    Target_comment getCommentByTypeIdUserid(int target_type, int target_id, int user_id);

    @Modifying
    @Transactional
    @Query(value = "delete from Target_comment where target_type =:target_type and target_id =:target_id and user_id = :user_id")
    void deleteCommentByTypeId(int target_type, int target_id, int user_id);

    @Query(value="from Target_comment where target_type = 1 and target_id = :course_id")
    List<Target_comment> getCourseComments(@Param("course_id") int course_id);

    @Query(value="from Target_comment where target_type = 3 and target_id = :id")
    List<Target_comment> getCourseReply(@Param("id") int id);

    @Query(value="from Target_comment where target_type = :target_type and target_id = :target_id and user_id = :user_id")
    List<Target_comment> getUserCourseComment(int target_type, int target_id, int user_id);

    @Query(value = "select * from target_comment where target_type = 1 and target_id = :id limit :cur,:size",
            nativeQuery = true)
    List<Target_comment> getLimitedComment(@Param("id") int id,
                                           @Param("cur") int cur,
                                           @Param("size") int size);
}
