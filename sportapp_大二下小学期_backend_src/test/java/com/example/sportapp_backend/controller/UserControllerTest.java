package com.example.sportapp_backend.controller;

/*import com.example.sportapp_backend.service.UserService;
import com.squareup.moshi.Json;
import net.sf.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Date;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc*/
class UserControllerTest {

    /*@Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;


    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void login() throws Exception {
//        String username = "1";
//        String password = "1";
//        this.mockMvc.perform(get(
//                "/login?username="+
//                        username +
//                        "&password="+
//                        password
//        )).andExpect(status().isOk());

    }

//    @Test
//    public void checkUser() throws Exception {
//        String username = "1";
//        String password = "1";
//        this.mockMvc.perform(get(
//                "/checkUser?username="+
//                        username +
//                        "&password="+
//                        password
//        )).andExpect(status().isOk());
//    }

    @Test
    void addUser() throws Exception {
        String nickname = "1";
        String phone = "12345";
        String sex = "男";
        String password = "1";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("nickname", Collections.singletonList(nickname));
        params.put("phone", Collections.singletonList(phone));
        params.put("sex", Collections.singletonList(sex));
        params.put("password", Collections.singletonList(password));
        params.put("birth", Collections.singletonList("2022-03-04"));

        this.mockMvc.perform(get(
                "/addUser").params(params)).andExpect(status().isOk());
    }

    @Test
    void updateUser() throws Exception {
        int userId = 1;
         Date birth = new Date(2022, 3, 4);
        int state = 1;
        int exp = 23;
        String nickname = "1";
        String phone = "12345";
        String sex = "男";
        String password = "1";

        this.mockMvc.perform(get(
                "/updateUser")
                        .param("userId", String.valueOf(userId))
                        .param("birth", String.valueOf(birth))
                        .param("state", String.valueOf(state))
                        .param("exp", String.valueOf(exp))
                        .param("nickname", nickname)
                        .param("phone", phone)
                        .param("sex",sex)
                        .param("password", password)

                ).andExpect(status().isOk());
    }

    @Test
    void removeUser() throws Exception {
        this.mockMvc.perform(get(
                    "/removeUser").param("userId", "1")).andExpect(status().isOk());

    }

    @Test
    void getAUser() throws Exception {
        this.mockMvc.perform(get(
                "/getAUser").param("id", "1")).andExpect(status().isOk());
    }

    @Test
    void addUserPlan() throws Exception {
        this.mockMvc.perform(get(
                "/addUserPlan")
                .param("userId", "1")
                .param("planId", "1")
                .param("chooseTime", "123")
        ).andExpect(status().isOk());

    }

    @Test
    void delUserPlan() throws Exception {
        this.mockMvc.perform(get(
                "/delUserPlan")
                .param("userId", "1")
                .param("planId", "1")

        ).andExpect(status().isOk());
    }

//    @Test
//    void addCaring() throws Exception {
//        this.mockMvc.perform(get(
//                "/addCaring")
//                .param("userId", "1")
//                .param("friendId", "4")
//        ).andExpect(status().isOk()).andExpect(content().string("{\"msg\":\"token无效!!\",\"code\":\"403\"}"));
//    }

//    @Test
//    void removeCaring() throws Exception {
//        int user_id = 1;
//        int friend_id = 4;
//        this.mockMvc.perform(get(
//                "/removeCaring?userId="+
//                        user_id +"&friendId="+
//                        friend_id
//        )).andExpect(status().isOk()).andExpect(content().string("{\"msg\":\"token无效!!\",\"code\":\"403\"}"));
//    }

    @Test
    void changePwd() throws Exception {
        this.mockMvc.perform(get(
                "/changePwd")
                .param("phone", "1")
                .param("newPwd", "1234")
        ).andExpect(status().isOk());
    }

    @Test
    void register() throws Exception {
        this.mockMvc.perform(get(
                "/register")
                .param("phone", "1")
                .param("pwd", "1234")
        ).andExpect(status().isOk());
    }

    @Test
    void changeBasicInfo() throws Exception {
        this.mockMvc.perform(get(
                "/changeBasicInfo")
                .param("id", "1")
                .param("bmi", "1234")
        ).andExpect(status().isOk());
    }

    @Test
    void changeBirth() throws Exception {
        this.mockMvc.perform(get(
                "/changeBirth")
                .param("id", "1")
                .param("birth", String.valueOf(new Date(2,2,2)))
        ).andExpect(status().isOk());
    }

    @Test
    void addNewFavorite() throws Exception {
        this.mockMvc.perform(get(
                "/addNewFavorite")
                .param("userId", "1")
                .param("courseId", "1")
        ).andExpect(status().isOk());
    }

    @Test
    void delFavorite() throws Exception {
        this.mockMvc.perform(get(
                "/delFavorite")
                .param("userId", "1")
                .param("courseId", "1")
        ).andExpect(status().isOk());
    }

    @Test
    void addNewUserExercise() throws Exception {
        this.mockMvc.perform(get(
                "/addNewUserExercise")
                .param("userId", "1")
                .param("exerciseId", "1")
                .param("chosenTime", "123")
        ).andExpect(status().isOk());
    }

    @Test
    void endUserExercise() throws Exception {
        this.mockMvc.perform(get(
                "/endUserExercise")
                .param("userId", "1")
                .param("exerciseId", "1")
                .param("useTime", "123")
        ).andExpect(status().isOk());
    }

    @Test
    void checkPhone() throws Exception {
        this.mockMvc.perform(get(
                "/checkPhone")
                .param("phone", "1")
        ).andExpect(status().isOk());
    }*/
}
