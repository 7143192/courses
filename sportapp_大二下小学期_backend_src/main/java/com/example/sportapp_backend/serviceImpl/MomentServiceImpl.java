package com.example.sportapp_backend.serviceImpl;

import com.example.sportapp_backend.dao.LikeDao;
import com.example.sportapp_backend.dao.MomentDao;
import com.example.sportapp_backend.entity.Moment;
import com.example.sportapp_backend.service.MomentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class MomentServiceImpl implements MomentService {
    @Autowired
    MomentDao momentDao;

    @Override
    public List<Moment> getAllMoments(){return momentDao.getAllMoments();}

    @Override
    public List<Moment> getUserMoments(int user_id){return momentDao.getUserMoments(user_id);}

    @Override
    public List<Moment> getFollowMoments(int user_id){return momentDao.getFollowMoments(user_id);}

    @Override
    public Moment delMoment(int moment_id)
    {
        return momentDao.delMoment(moment_id);
    }

    @Override
    public Moment addMoment(int user_id,String content){return momentDao.addMoment(user_id,content);}

    @Override
    //@Cacheable(value="momentCache", key="#cur")
    public List<Moment> getPartAllMoment(int cur, int size)
    {
        return momentDao.getPartAllMoment(cur, size);
    }

    @Override
    public List<Moment> getPartUserMoments(int user_id, int cur, int size)
    {
        return momentDao.getPartUserMoments(user_id, cur, size);
    }

    @Override
    public Moment addMomentAndImages(int user_id, String content, List<MultipartFile> images)
    {
        return momentDao.addMomentAndImages(user_id, content, images);
    }

    @Override
    public Moment getLastMoment()
    {
        return momentDao.getLastMoment();
    }
}
