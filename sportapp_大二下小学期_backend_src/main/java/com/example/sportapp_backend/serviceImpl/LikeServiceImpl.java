package com.example.sportapp_backend.serviceImpl;

import com.example.sportapp_backend.dao.LikeDao;
import com.example.sportapp_backend.entity.Target_like;
import com.example.sportapp_backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {
    @Autowired
    private LikeDao likeDao;

    @Override
    @CacheEvict(value="likeCache", key="#user_id")
    public Target_like addNewLike(int target_type, int target_id, int user_id){
        return likeDao.addNewLike(target_type, target_id, user_id);
    }

    @Override
    @CacheEvict(value="likeCache", key="#target_user")
    public int removeLike(int target_type, int target_id, int target_user){
        return likeDao.removeLike(target_type, target_id, target_user);
    }

    @Override
    @Cacheable(value="likeCache")
    public int getLikeNum(int target_type, int target_id){
        return likeDao.getLikeNum(target_type, target_id);
    }

    @Override
    @Cacheable(value="likeCache", key="#id")
    public List<Target_like> getUserLikes(int id)
    {
        System.out.println("获取用户" + id + "的点赞信息!");
        return likeDao.getUserLikes(id);
    }

    @Override
    public Target_like checkLiked(int target_type, int target_id, int user_id)
    {
        return likeDao.checkLiked(target_type, target_id, user_id);
    }

    @Override
    @Cacheable(value="likeCache")
    public List<Target_like> getLikesByTypeId(int target_type, int target_id)
    {
        return likeDao.getLikesByTypeId(target_type, target_id);
    }
}
