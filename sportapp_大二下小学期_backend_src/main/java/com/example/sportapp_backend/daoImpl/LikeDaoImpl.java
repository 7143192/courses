package com.example.sportapp_backend.daoImpl;

import com.example.sportapp_backend.dao.LikeDao;
import com.example.sportapp_backend.entity.Target_like;
import com.example.sportapp_backend.repository.LikeRepositoery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.lang.annotation.Target;
import java.util.Iterator;
import java.util.List;

@Repository
public class LikeDaoImpl implements LikeDao {
    @Autowired
    private LikeRepositoery likeRepositoery;
    @Override
     public Target_like addNewLike(int target_type, int target_id, int user_id){
        try {
            List<Target_like> list = likeRepositoery.getLikeByUser(target_type, target_id, user_id);
            //Iterator<Target_like> iter = list.iterator();
            if(list.size() != 0) { //此用户已经对这个对象点过赞了，不允许重复点赞
                Target_like t = new Target_like();
                t.setLike_id(-1);
                return t; //主键为-1表示已经点过赞了
            }
            Target_like target_like = new Target_like();
            target_like.setTarget_type(target_type);
            target_like.setTarget_id(target_id);
            target_like.setUser_id(user_id);
            likeRepositoery.save(target_like);
            likeRepositoery.flush();
            return target_like;
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public int removeLike(int target_type, int target_id, int user_id) {
        try {
            Target_like target_like = likeRepositoery.getSpecificOne(target_type, target_id, user_id);
            if(target_like == null)
                return 0;
            //likeRepositoery.deleteLike(target_type, target_id, user_id);
            likeRepositoery.delete(target_like);
            likeRepositoery.flush();
            return 1;
        }
        catch(Exception e) {
            return -1;
        }
    }

    @Override
    public int getLikeNum(int target_type, int target_id){
       List<Target_like> list = likeRepositoery.getLikeNumByTypeId(target_type, target_id);
       return list.size();
    }

    @Override
    public List<Target_like> getUserLikes(int id)
    {
        return likeRepositoery.getLikesByUser(id);
    }

    @Override
    public Target_like checkLiked(int target_type, int target_id, int user_id)
    {
        List<Target_like> got = likeRepositoery.getLikeByUser(target_type, target_id, user_id);
        Iterator<Target_like> iter = got.iterator();
        if(!iter.hasNext()) {
            Target_like t = new Target_like();
            t.setLike_id(-1);
            return t;
        }
        return iter.next();
    }

    @Override
    public List<Target_like> getLikesByTypeId(int target_type, int target_id)
    {
        return likeRepositoery.getLikeNumByTypeId(target_type, target_id);
    }
}
