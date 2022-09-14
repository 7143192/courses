package com.example.sportapp_backend.service;

import com.example.sportapp_backend.entity.Target_like;

import java.util.List;

public interface LikeService {
    Target_like addNewLike(int target_type, int target_id, int target_user);
    int removeLike(int target_type, int target_id, int target_user);
    int getLikeNum(int target_type, int target_id);
    List<Target_like> getUserLikes(int id);
    Target_like checkLiked(int target_type, int target_id, int user_id);
    List<Target_like> getLikesByTypeId(int target_type, int target_id);
}
