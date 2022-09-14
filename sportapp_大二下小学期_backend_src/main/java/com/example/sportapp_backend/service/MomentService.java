package com.example.sportapp_backend.service;


import com.example.sportapp_backend.entity.Moment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MomentService {
    List<Moment> getAllMoments();
    List<Moment> getUserMoments(int user_id);
    List<Moment> getFollowMoments(int user_id);
    Moment delMoment(int moment_id);
    Moment addMoment(int user_id,String content);
    List<Moment> getPartAllMoment(int cur, int size);
    List<Moment> getPartUserMoments(int user_id, int cur, int size);
    Moment addMomentAndImages(int user_id, String content, List<MultipartFile> images);
    Moment getLastMoment();
}
