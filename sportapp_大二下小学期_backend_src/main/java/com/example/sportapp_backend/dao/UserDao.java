package com.example.sportapp_backend.dao;
import com.example.sportapp_backend.entity.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.List;
import java.util.Map;

public interface UserDao {
    //用户注册以及身份验证相关
    User checkUser(String username, String password);
    int addUser(String nickname, String phone, String password, String sex,String birth);
    int updateUser(
            int userId,
            String nickname,
            String phone,
            String password,
            String sex,
            Date birth,
            int    state,
            int    exp
    );
    User removeUser(int userId);
    userPlan addUserPlan(int user_id, int plan_id, int chooseTime); //添加一个新的用户的计划
    User getAUser(int id);
    userPlan delUserPlan(int user_id, int plan_id);
    boolean changePwd(String phone, String newPwd);
    int register(String phone, String pwd);
    User getUserByPhone(String phone);
    //关注关系相关接口
    int addCaring(int userId, int friendId);
    int removeCaring(int userId, int friendId);
    List<Relationship> getAllCaring(int userId);
    //修改基本信息相关
    User changeBasicInfo(int id, int height, int weight, int bmi); //修改身高体重BMI等信息.
    User changeBirth(int id, Date birth);
    //课程收藏相关
    Favorite addNewFavorite(int user_id, int course_id);
    Favorite delFavorite(int user_id, int course_id);
    List<Course> getUserFavorite(int user_id);
    //用户跟练相关
    User_exercise addNewUserExercise(int user_id, int exercise_id, int chosen_time);
    User_exercise endUserExercise(int user_id, int exercise_id, int use_time);
    int checkPhone(String phone);

    /*double pearson_dis(List<Course> rating1, List<Course> rating2);
    Map<Double, Integer> computeNearestNeighbor(int userId, List<User> users);
    List<Course> getUserCoursesByLikes(int userId);
    List<Course> recommend(int userId, List<User> users);
    boolean checkInTheCourseList(int userId, int courseId);
    List<User> getRandomPartUser(int userId, List<User> users);*/
    List<User> getAllUsers();
    User changeUserHeader(int userId, List<MultipartFile> images);
}
