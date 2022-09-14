package com.example.sportapp_backend.daoImpl;

import com.example.sportapp_backend.dao.CommentDao;
import com.example.sportapp_backend.entity.Exercise;
import com.example.sportapp_backend.entity.Target_comment;
import com.example.sportapp_backend.repository.CommentRepository;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.lang.annotation.Target;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Repository
public class CommentDaoImpl implements CommentDao {
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Target_comment> getComment(int target_type, int target_id){
        return commentRepository.getCommentByTypeId(target_type, target_id);
    }

    @Override
    public int deleteComment(int target_type, int target_id, int user_id){
        try {
            Target_comment tmp = commentRepository.getCommentByTypeIdUserid(target_type, target_id, user_id);
            if(tmp == null)
                return -1;
            commentRepository.deleteCommentByTypeId(target_type, target_id, user_id);
            return 1;
        }
        catch (Exception e){
            return -1;
        }
    }

    @Override
    public Target_comment addComment(int target_type, int target_id, int user_id, String content){
        //if(commentRepository.getCommentByTypeIdUserid(target_type, target_id, user_id) != null)
        //    return -1;
        Target_comment t = new Target_comment();
        t.setTarget_type(target_type);
        t.setTarget_id(target_id);
        t.setUser_id(user_id);
        long time = Calendar.getInstance().getTimeInMillis();
        Timestamp ts = new Timestamp(time);
        t.setTime(ts);
        t.setContent(content);
        commentRepository.save(t);
        return t;
    }

    @Override
    public List<Pair<Target_comment, List<Target_comment>>> getCourseComments(int id)
    {
        List<Target_comment> list1 = commentRepository.getCourseComments(id);
        List<Pair<Target_comment, List<Target_comment>>> ans = new ArrayList<>();
        for(Target_comment t : list1) {
            List<Target_comment> list2 = commentRepository.getCourseReply(t.getComment_id());
            Pair<Target_comment, List<Target_comment>> p = new Pair<>(t, list2);
            ans.add(p);
        }
        return ans;
    }

    @Override
    public List<Target_comment> getUserCourseComment(int target_type, int target_id, int user_id){
        return commentRepository.getUserCourseComment(target_type, target_id, user_id);
    }

    @Override
    public List<Pair<Target_comment, List<Target_comment>>> getPartCourseComment(int id, int cur, int size)
    {
        /*List<Target_comment> all = commentRepository.getCourseComments(id);
        List<Pair<Target_comment, List<Target_comment>>> ans = new ArrayList<>();
        int len = all.size(); //获取所有评论的数目
        int pos = 0;
        int num = 0;
        for(Target_comment t : all) {
            if(pos < cur){
                pos++;
                continue;
            }
            if(pos == len || num == size) break;
            List<Target_comment> list2 = commentRepository.getCourseReply(t.getComment_id());
            Pair<Target_comment, List<Target_comment>> p = new Pair<>(t, list2);
            pos++;
            ans.add(p);
            num++;
        }
        System.out.println("ans=" + ans);
        return ans;*/
        List<Target_comment> all = commentRepository.getLimitedComment(id, cur, size);
        List<Pair<Target_comment, List<Target_comment>>> ans = new ArrayList<>();
        int len = all.size(); //获取所有评论的数目
        int pos = 0;
        int num = 0;
        for(Target_comment t : all) {
            /*if(pos < cur){
                pos++;
                continue;
            }
            if(pos == len || num == size) break;*/
            List<Target_comment> list2 = commentRepository.getCourseReply(t.getComment_id());
            Pair<Target_comment, List<Target_comment>> p = new Pair<>(t, list2);
            pos++;
            ans.add(p);
            num++;
        }
        System.out.println("ans=" + ans);
        return ans;
    }
}
