package com.example.sportapp_backend.serviceImpl;

import com.alibaba.fastjson.JSON;
import com.example.sportapp_backend.dao.CommentDao;
import com.example.sportapp_backend.dao.LikeDao;
import com.example.sportapp_backend.dao.UserDao;
import com.example.sportapp_backend.entity.Course;
import com.example.sportapp_backend.entity.Target_comment;
import com.example.sportapp_backend.entity.User;
import com.example.sportapp_backend.service.CommentService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentDao commentDao;

    @Autowired(required = false)
    private LikeDao likeDao;

    @Autowired(required = false)
    private UserDao userDao;
    @Resource(name="redis")
    RedisTemplate redisTemplate;

    @Override
    @Cacheable(value="commentCache")
    public List<Target_comment> getComment(int target_type, int target_id){
        List<Target_comment> list = commentDao.getComment(target_type, target_id);
        for(int i = 0; i < list.size(); i++){
            Target_comment t = list.get(i);
            User user=userDao.getAUser(t.getUser_id());
            int id = t.getTarget_id();
            int type = t.getTarget_type();
            if(type == 1 || type == 2){
                type = 3;
            }
            else type = 4;
            int num = likeDao.getLikeNum(type, id);
            list.get(i).setLike_num(num);
            list.get(i).setNickname(user.getNickname());
            list.get(i).setHeader(user.getHeader());
            list.get(i).setSex(user.getSex());
        }
        return list;
    }

    @Override
    public int deleteComment(int target_type, int target_id, int user_id){
        int type;
        if(target_type == 1 || target_type == 2){
            type = 3;
        }
        else type = 4;
        likeDao.removeLike(type, target_id, user_id);
        return commentDao.deleteComment(target_type, target_id, user_id);
    }

    @Override
    public  Target_comment addComment(int target_type, int target_id, int user_id, String content){
        return commentDao.addComment(target_type, target_id, user_id, content);
    }

    @Override
    public List<Pair<Target_comment, List<Target_comment>>> getCourseComments(int id)
    {
        return commentDao.getCourseComments(id);
    }

    @Override
    public List<Target_comment> getUserCourseComment(int target_type, int target_id, int user_id){
        return commentDao.getUserCourseComment(target_type, target_id, user_id);
    }

    @Override
    //@Cacheable(value="commentCache")
    //这里存疑，redis好像并不支持pair类型
    public List<Pair<Target_comment, List<Target_comment>>> getPartCourseComment(int id, int cur, int size)
    {
        System.out.println("开始获取课程" + id + "的部分评论，当前处于:" + cur + "!");
        return commentDao.getPartCourseComment(id, cur, size);
    }
}
