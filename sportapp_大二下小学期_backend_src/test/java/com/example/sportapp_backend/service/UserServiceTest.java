package com.example.sportapp_backend.service;

/*import com.example.sportapp_backend.entity.Favorite;
import com.example.sportapp_backend.entity.User;
import com.example.sportapp_backend.entity.User_exercise;
import com.example.sportapp_backend.entity.userPlan;
import javafx.application.Application;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

import static org.junit.jupiter.api.Assertions.*;


// 所有对数据库的操作都要加上回滚，不然会改变数据库内容

@RunWith(SpringRunner.class)
@SpringBootTest*/
public class UserServiceTest {

    /*@Autowired
    private UserService userService;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    public void checkUser() {
        User user = userService.checkUser("1","1");
        assertNotNull(user);
        assertEquals(4, user.getUser_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void addUser() {
        int rt = userService.addUser("test","189934422323","123333","男", "2034-03-04");
        assertEquals(2, rt);
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void updateUser() {
        int rt = userService.updateUser(1,
                "test",
                "19899344343",
                "12333333",
                "男",
                new Date(2022,3,3),
                1, 2);
        assertEquals(2, rt);
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void removeUser() {
        User rt = userService.removeUser(1);
        assertEquals(1, rt.getUser_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void addUserPlan() {
        userPlan u = userService.addUserPlan(1, 1, 1);
        assertEquals(1, u.getUser_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void getAUser() {
        User user = userService.getAUser(1);
        assertEquals(1, user.getUser_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void delUserPlan() {
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void changePwd() {
        boolean rt = userService.changePwd("18841526511", "1234567a");
        assertEquals(true, rt);
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void register() {
        int rt = userService.register("18841526511", "1234567a");
        assertEquals(-1, rt);
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void addCaring() {
        int rt = userService.addCaring(1, 4);
        assertEquals(0, rt);
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void removeCaring() {
        int rt = userService.removeCaring(1, 4);
        assertEquals(-1, rt);
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void changeBasicInfo() {
        User user = userService.changeBasicInfo(1, 177, 144, 23);
        assertEquals(1, user.getUser_id());
        assertEquals(177, user.getHeight());
        assertEquals(144, user.getWeight());
        assertEquals(23, user.getBmi());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void changeBirth() {
        User user = userService.changeBirth(1, new Date(2022,3, 3));
        assertEquals( new Date(2022,3, 3), user.getBirth());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void addNewFavorite() {
        Favorite favorite = userService.addNewFavorite(1, 1);
        assertEquals(0, favorite.getCourse_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void delFavorite() {
        Favorite favorite = userService.delFavorite(1, 1);
        assertEquals(1, favorite.getFavorite_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void addNewUserExercise() {
        User_exercise rt = userService.addNewUserExercise(1, 1, 123);
        assertEquals(1, rt.getExercise_id());
    }

    @Test
    @Rollback(value = true)
    @Transactional
    public void endUserExercise() {
        User_exercise rt = userService.endUserExercise(1, 1, 480);
        assertEquals(0, rt.getExercise_id());
    }*/
}
