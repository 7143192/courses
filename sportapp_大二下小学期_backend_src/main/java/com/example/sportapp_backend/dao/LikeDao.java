package com.example.sportapp_backend.dao;

import com.example.sportapp_backend.entity.Target_like;
import javafx.scene.control.TableColumn;

import java.util.List;


public interface LikeDao {
    Target_like addNewLike(int target_type, int target_id, int user_id);
    int removeLike(int target_type, int target_id, int user_id);
    int getLikeNum(int target_type, int target_id);
    List<Target_like> getUserLikes(int id);
    Target_like checkLiked(int target_type, int target_id, int user_id);
    List<Target_like> getLikesByTypeId(int target_type, int target_id);
}
