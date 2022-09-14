package com.example.sportapp_backend.controller;

import com.example.sportapp_backend.entity.Target_comment;
import com.example.sportapp_backend.service.CommentService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @RequestMapping("getComment")
    public @ResponseBody
    List<Target_comment> getComment(
            @RequestParam("target_type") int target_type,
            @RequestParam("target_id") int target_id
    ) {
        return commentService.getComment(target_type, target_id);
    }

    @RequestMapping("deleteComment")
    public @ResponseBody
    int deleteComment(
            @RequestParam("target_type") int target_type,
            @RequestParam("target_id") int target_id,
            @RequestParam("user_id") int user_id
    ) {
        return commentService.deleteComment(target_type, target_id, user_id);
    }

    @RequestMapping("addComment")
    public @ResponseBody
    Target_comment addComment(
            @RequestParam("target_type") int target_type,
            @RequestParam("target_id") int target_id,
            @RequestParam("user_id") int user_id,
            @RequestParam("content") String content
    ) {
         return commentService.addComment(target_type, target_id, user_id, content);
    }

    @RequestMapping("/getCourseComments") //获取课程的评论以及每个评论对应的回复信息
    public @ResponseBody
    List<Pair<Target_comment, List<Target_comment>>> getCourseComments(
            @RequestParam("id") int id)
    {
        return commentService.getCourseComments(id);
    }

    @RequestMapping("/getUserComment") //获取课程的评论以及每个评论对应的回复信息
    public @ResponseBody
    List<Target_comment> getUserCourseComment(
            @RequestParam("target_type") int target_type,
            @RequestParam("target_id") int target_id,
            @RequestParam("user_id") int user_id
    ) {
        return commentService.getUserCourseComment(target_type, target_id, user_id);
    }

    @RequestMapping("/getPartCourseComment")
    public @ResponseBody
    List<Pair<Target_comment, List<Target_comment>>> getPartCourseComment(@RequestParam("id") int id,
                                                                          @RequestParam("cur") int cur,
                                                                          @RequestParam("size") int size)
    {
        return commentService.getPartCourseComment(id, cur, size);
    }
}
