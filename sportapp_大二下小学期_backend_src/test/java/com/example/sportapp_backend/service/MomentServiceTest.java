package com.example.sportapp_backend.service;

/*import com.example.sportapp_backend.entity.Moment;
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
class MomentServiceTest {

    /*@Autowired
    private MomentService momentService;

    @Test
    void getAllMoments() {
        List<Moment> rt = momentService.getAllMoments();
        assertNotNull(rt);
    }

    @Test
    void getUserMoments() {
        List<Moment> rt = momentService.getUserMoments(1);
        assertEquals(1, rt.get(0).getUser_id());
    }

    @Test
    void getFollowMoments() {
        List<Moment> rt = momentService.getFollowMoments(1);
        assertEquals(0,rt.size());
    }

//    @Test
//    @Rollback(value = true)
//    @Transactional
//    void delMoment() {
//        Moment m = momentService.delMoment(1);
//        assertEquals(1, m.getMoment_id());
//    }

    @Test
    @Rollback(value = true)
    @Transactional
    void addMoment() {
        Moment m = momentService.addMoment(1, "test");
        assertEquals("test", m.getContent());
    }*/
}
