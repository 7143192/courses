package com.example.sportapp_backend.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.sportapp_backend.entity.*;
import com.example.sportapp_backend.service.UserService;
import com.example.sportapp_backend.util.JwtUtil;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;


    @RequestMapping("/login")
    public @ResponseBody
    JSONObject login(
            @RequestParam("username")String username,
            @RequestParam("password") String password){
        User user = userService.checkUser(username, password);
        JSONObject json = new JSONObject();
        if(user.getUser_id() == -1){

            json.put("user_id", "-1");
            return json;
        }
        else {
//            JSONObject j = JSONObject.fromObject(user);
//            System.out.println(j);
            json.put("user_id", "123");
//            json.put("token", JwtUtil.generateToken(json));
            return json;
        }

    }

    // 前端的username和password都要加密，到后台解密然后和数据库中的明文密码比较
    // 这里的username是手机号
    // 如果要测试，数据库中存在的一组用户名和密码为
    // WsFitrJtlNodVZ3XRuQDsw%3D%3D
    // 0plQgRB/yIW3uL2jpXYqRQ%3D%3D
    // 为加密之后的 18841526511 和 abcABC12345
    @RequestMapping("/checkUser")
    public @ResponseBody
    JSONObject checkUser(@RequestParam("username")String username,
                   @RequestParam("password") String password) throws Exception {

        //String usernameNew = AesEncryptUtil.desEncrypt(username);
        //String passwordNew = AesEncryptUtil.desEncrypt(password);
        //System.out.println("进入了UserController！");
//        System.out.println("username=" + username);
//        System.out.println("password=" + password);
        User user =  userService.checkUser(username, password);
        JSONObject jsonObject = (JSONObject) JSONObject.toJSON(user);
        Map<String, String > tokens = new HashMap<>();
        tokens.put("user_id", String.valueOf(user.getUser_id()));
        jsonObject.put("token", JwtUtil.generateToken(tokens));
        System.out.println(jsonObject);
        return jsonObject;
    }

    // 0 代表添加成功
    // 1 代表密码不符合要求
    // 2 代表昵称重复
    @RequestMapping("addUser")
    public @ResponseBody
    int addUser(
            @RequestParam("nickname")String nickname,
            @RequestParam("phone")String phone,
            @RequestParam("password")String pwd,
            @RequestParam("sex")String sex,
            @RequestParam("birth")String birth
    ) {
        return userService.addUser(nickname, phone, pwd, sex,birth);
    }

    // 用于用户更新信息或者系统更新用户信息
    // 0 表示成功
    // 1 表示密码不符合要求
    // 2 表示nickname重复
    //
    @RequestMapping("/updateUser")
    public @ResponseBody
    int updateUser(
            @RequestParam("userId") int userId,
            @RequestParam("nickname")String nickname,
            @RequestParam("phone")String phone,
            @RequestParam("password")String pwd,
            @RequestParam("sex")String sex,
            @RequestParam("birth") Date birth,
            @RequestParam("state")int state,
            @RequestParam("exp")int exp
    ) {
        return userService.updateUser(userId, nickname, phone, pwd, sex, birth, state, exp);
    }

    // 0 表示成功
    // 1 表示失败
    @RequestMapping("removeUser")
    public @ResponseBody
    User removeUser (
            @RequestParam("userId") int userId
    ) {
        return userService.removeUser(userId);
    }

    @RequestMapping("getAUser")
    public @ResponseBody User getAUser(@RequestParam("id") int id)
    {
        return userService.getAUser(id);
    }

    @RequestMapping("/getUserByPhone")
    public @ResponseBody JSONObject getUserByPhone(@RequestParam("phone") String phone)
    {
        User user = userService.getUserByPhone(phone);
        JSONObject jsonObject = (JSONObject) JSONObject.toJSON(user);
        Map<String, String > tokens = new HashMap<>();
        tokens.put("user_id", String.valueOf(user.getUser_id()));
        jsonObject.put("token", JwtUtil.generateToken(tokens));
        System.out.println(jsonObject);
        return jsonObject;
    }

    @RequestMapping("/addUserPlan")
    public @ResponseBody
    userPlan addUserPlan(@RequestParam("userId") int user_id,
                         @RequestParam("planId") int plan_id,
                         @RequestParam("chooseTime") int chooseTime)
    {
        return userService.addUserPlan(user_id, plan_id, chooseTime);
    }

    @RequestMapping("delUserPlan")
    public @ResponseBody userPlan delUserPlan(@RequestParam("userId") int userId,
                                              @RequestParam("planId") int planId)
    {
        return userService.delUserPlan(userId, planId);
    }

    // 添加关注，关注为单向关系
    // 0 表示关注成功
    // -1 表示已经关注
    @RequestMapping("addCaring")
    public @ResponseBody
    int addCaring(@RequestParam("userId") int user_id,
                  @RequestParam("friendId") int friend_id)
    {
        return userService.addCaring(user_id, friend_id);
    }

    // 移除关注
    // 0 表示移除成功
    // -1 表示没有关注
    @RequestMapping("removeCaring")
    public @ResponseBody
    int removeCaring(@RequestParam("userId") int user_id,
                  @RequestParam("friendId") int friend_id)
    {
        return userService.removeCaring(user_id, friend_id);
    }

    @RequestMapping("changePwd")
    public @ResponseBody
    boolean changePwd(
            @RequestParam("phone") String phone,
            @RequestParam("newPwd") String newPwd
    ) {
        return userService.changePwd(phone, newPwd);
    }

    @RequestMapping("register")
    public @ResponseBody
    int register(@RequestParam("phone") String phone,
                 @RequestParam("pwd") String pwd
    ) {
        return userService.register(phone, pwd);
    }

    @RequestMapping("/changeBasicInfo")
    public @ResponseBody User changeBasicInfo(@RequestParam("id") int id,
                                              @RequestParam(name="height", required = false, defaultValue = "0") int height,
                                              @RequestParam(name="weight", required = false, defaultValue = "0") int weight,
                                              @RequestParam(name="bmi", required = false, defaultValue = "0") int bmi)
    {
        return userService.changeBasicInfo(id, height, weight, bmi);
    }

    @RequestMapping("/changeBirth")
    public @ResponseBody User changeBirth(@RequestParam("id") int id,
                                          @RequestParam("birth") Date birth)
    {
        return userService.changeBirth(id, birth);
    }

    @RequestMapping("/addNewFavorite")
    public @ResponseBody
    Favorite addNewFavorite(@RequestParam("userId") int user_id,
                            @RequestParam("courseId") int course_id)
    {
        return userService.addNewFavorite(user_id, course_id);
    }

    @RequestMapping("/delFavorite")
    public @ResponseBody Favorite delFavorite(@RequestParam("userId") int user_id,
                                              @RequestParam("courseId") int course_id)
    {
        return userService.delFavorite(user_id, course_id);
    }

    @RequestMapping("/getUserFavorite")
    public @ResponseBody
    List<Course> getUserFavorite(@RequestParam("UserId") int user_id) {
        return userService.getUserFavorite(user_id);
    }

    @RequestMapping("addNewUserExercise")
    public @ResponseBody
    User_exercise addNewUserExercise(@RequestParam("userId") int user_id,
                                     @RequestParam("exerciseId") int exercise_id,
                                     @RequestParam("chosenTime") int chosen_time)
    {
        return userService.addNewUserExercise(user_id, exercise_id, chosen_time);
    }

    @RequestMapping("/endUserExercise")
    public @ResponseBody
    User_exercise endUserExercise(@RequestParam("userId") int user_id,
                                  @RequestParam("exerciseId") int exercise_id,
                                  @RequestParam("useTime") int use_time)
    {
        return userService.endUserExercise(user_id, exercise_id, use_time);
    }

    @RequestMapping("checkPhone")
    public @ResponseBody
    int checkPhone(@RequestParam("phone")String phone) {
        return userService.checkPhone(phone);
    }

    private JwtUtil jwtUtil = new JwtUtil();

    @RequestMapping("test")
    public void test() {
        System.out.println("sdf");

    }

    @RequestMapping("/recommendUserCourse")
    List<Course> RecommendUserCourse(@RequestParam("id") int id)
    {
        return userService.RecommendUserCourse(id);
    }

    @RequestMapping(value = "/changeHeader", consumes = {"multipart/form-data"})
    public @ResponseBody User changeUserHeader(@RequestParam("userId") int userId,
                                               String headerBase64) {
        System.out.println("string base64=" + headerBase64);
        JSONArray json = JSONArray.fromObject(headerBase64);
        List<MultipartFile> images = new ArrayList<>();
        for (int i= 0; i < json.size(); i++) {
            net.sf.json.JSONObject jsonOne = json.getJSONObject(i);
            String got_base64 = jsonOne.getString("base64");
            final String[] base64Array = got_base64.split(",");
            String dataUir, data;
            if (base64Array.length > 1) {
                dataUir = base64Array[0];
                data = base64Array[1];
            } else {
                //根据你base64代表的具体文件构建
                dataUir = "data:image/jpg;base64";
                data = base64Array[0];
            }
            MultipartFile multipartFile = new BASE64DecodedMultipartFile(data, dataUir);
            images.add(multipartFile);
        }
        return userService.changeUserHeader(userId, images);
    }
}
