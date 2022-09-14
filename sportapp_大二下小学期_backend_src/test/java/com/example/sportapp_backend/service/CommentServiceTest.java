package com.example.sportapp_backend.service;

/*import com.example.sportapp_backend.entity.Target_comment;
import javafx.util.Pair;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@SpringBootTest*/
class CommentServiceTest {

    /*@Autowired
    private CommentService commentService;

    @Test
    void getComment() {
        List<Target_comment> l = commentService.getComment(1, 1);
        assertEquals(1, l.get(0).getTarget_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    void deleteComment() {
        int rt = commentService.deleteComment(1, 1,1);
        assertEquals(-1, rt);
    }

    @Test
    @Rollback(value = true)
    @Transactional
    void addComment() {
        Target_comment t = commentService.addComment(1, 1, 1, "test");
        assertEquals("test", t.getContent());
    }

    @Test
    void getCourseComments() {
        List<Pair<Target_comment, List<Target_comment>>> rt = commentService.getCourseComments(1);
        assertEquals(1,rt.get(0).getKey().getTarget_id());
    }

    @Test
    void getUserCourseComment() {
        List<Target_comment> rt = commentService.getUserCourseComment(1, 1, 1);
        assertEquals(1, rt.get(0).getUser_id());
    }*/
}
