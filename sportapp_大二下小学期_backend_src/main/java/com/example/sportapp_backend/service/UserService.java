package com.example.sportapp_backend.service;

import com.example.sportapp_backend.entity.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.List;
import java.util.Map;

public interface UserService {
    User checkUser(String username, String password);
    int addUser(String nickname, String phone, String password, String sex,String birth);
    int updateUser(
            int userId,
            String nickname,
            String phone,
            String password,
            String sex,
            Date birth,
            int state,
            int exp
    );
    User removeUser(int userId);
    userPlan addUserPlan(int user_id, int plan_id, int chooseTime);
    User getAUser(int id);
    userPlan delUserPlan(int userId, int planId);

    boolean changePwd(String phone, String newPwd);
    int register(String phone, String pwd);

    int addCaring(int userId, int friendId);
    int removeCaring(int userId, int friendId);
    User changeBasicInfo(int id, int height, int weight, int bmi);
    User changeBirth(int id, Date birth);
    Favorite addNewFavorite(int user_id, int course_id);
    Favorite delFavorite(int user_id, int course_id);
    List<Course> getUserFavorite(int user_id);
    User_exercise addNewUserExercise(int user_id, int exercise_id, int chosen_time);
    User_exercise endUserExercise(int user_id, int exercise_id, int use_time);
    int checkPhone(String phone);
    User getUserByPhone(String phone);
    List<User> getAllUser();
    List<Course> RecommendUserCourse(int id);
    List<User> getRandomPartUser(int userId, List<User> users);
    Map<Double, Integer> computeNearestNeighbor(int userId, List<User> users);
    List<Course> getUserCoursesByLikes(int userId);
    List<Course> recommend(int userId, List<User> users);
    boolean checkInTheCourseList(int userId, int courseId);
    double pearson_dis(List<Course> rating1, List<Course> rating2);
    User changeUserHeader(int userId, List<MultipartFile> images);
}
