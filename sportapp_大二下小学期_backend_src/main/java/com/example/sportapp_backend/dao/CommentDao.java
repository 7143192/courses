package com.example.sportapp_backend.dao;

import com.example.sportapp_backend.entity.Target_comment;
import javafx.util.Pair;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;

public interface CommentDao {
    List<Target_comment> getComment(int target_type, int target_id);
    int deleteComment(int target_type, int target_id, int user_id);
    Target_comment addComment(int target_type, int target_id, int user_id, String content);
    List<Pair<Target_comment, List<Target_comment>>> getCourseComments(int id);
    List<Target_comment> getUserCourseComment(int target_type, int target_id, int user_id);
    List<Pair<Target_comment, List<Target_comment>>> getPartCourseComment(int id, int cur, int size);
}
