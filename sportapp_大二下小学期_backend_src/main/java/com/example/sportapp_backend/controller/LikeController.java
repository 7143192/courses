package com.example.sportapp_backend.controller;
import com.example.sportapp_backend.entity.Target_like;
import com.example.sportapp_backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LikeController {
    @Autowired
    private LikeService likeService;

    @RequestMapping("/addNewLike")
    public @ResponseBody
    Target_like addNewLike(
            @RequestParam("target_type") int target_type,
            @RequestParam("target_id") int target_id,
            @RequestParam("user_id") int user_id
    ) {
        System.out.println("user_id=" + user_id);
        return  likeService.addNewLike(target_type, target_id, user_id);
    }

    @RequestMapping("/removeLike")
    public @ResponseBody
    int removeLike(
            @RequestParam("target_type") int target_type,
            @RequestParam("target_id") int target_id,
            @RequestParam("user_id") int user_id
    ) {
        return  likeService.removeLike(target_type, target_id, user_id);
    }

    @RequestMapping("/getLikeNum")
    public @ResponseBody
    int getLikeNum(
            @RequestParam("target_type") int target_type,
            @RequestParam("target_id") int target_id
    ) {
        return  likeService.getLikeNum(target_type, target_id);
    }

    @RequestMapping("/getUserLikes")
    public @ResponseBody
    List<Target_like> getUserLikes(@RequestParam("id") int id)
    {
        return likeService.getUserLikes(id);
    }

    @RequestMapping("/checkLiked")
    public @ResponseBody
    Target_like checkLiked(@RequestParam("target_type") int target_type,
                           @RequestParam("target_id") int target_id,
                           @RequestParam("user_id") int user_id)
    {
        return likeService.checkLiked(target_type, target_id, user_id);
    }
}
