package com.example.sportapp_backend.daoImpl;

import com.example.sportapp_backend.dao.UserDao;
import com.example.sportapp_backend.entity.*;
import com.example.sportapp_backend.repository.*;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.sql.Date;
import java.util.*;

@Repository
//@CacheConfig(cacheNames = "userCache")
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private userPlanRepository userPlanRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private RelationshipRepository relationshipRepository;
    @Autowired
    private UserExerciseRepository userExerciseRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private LikeRepositoery likeRepositoery;

    @Override
    public User checkUser(String username, String password) {
        List<User> got = userRepository.checkUser(username, password);
        Iterator<User> iter = got.iterator();
        if (!iter.hasNext()) {
            User u = new User();
            u.setUser_id(-1);
            return u; //user_id返回值为-1表示没有找到对应的用户
        }
        return iter.next();
    }

    @Override
    public int addUser(String nickname, String phone, String password, String sex,String birth) {
        User tmp = userRepository.getByNickname(nickname);
        if (tmp != null) return 2;
        if (password.length() < 6) return 1;
        Date date = new Date(2022, 2, 3);

        tmp = new User(nickname, password, phone, sex, date, 0,0,
                "https://img95.699pic.com/xsj/14/qu/q9.jpg!/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast",
                "https://img95.699pic.com/xsj/0f/es/fx.jpg!/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast",
                122, 177, 22);

        userRepository.save(tmp);
        return 0;
    }

    @Override
    public int updateUser(
            int userId,
            String nickname,
            String phone,
            String password,
            String sex,
            Date birth,
            int state,
            int exp
    ) {
        User tmp = userRepository.getUserById(userId);
        assert tmp != null;

        User tmp1 = userRepository.getByNickname(nickname);
        if (tmp1 != null) return 2;
        if (password.length() < 6) return 1;

        tmp.setNickname(nickname);
        tmp.setPhone(phone);
        tmp.setPwd(password);
        tmp.setSex(sex);
        tmp.setBirth(birth);
        tmp.setState(state);
        tmp.setExp(exp);
        userRepository.save(tmp);
        return 0;
    }

    @Override
    public User removeUser(int userId) {
        User tmp = userRepository.getUserById(userId);
        if (tmp == null) return null;
        userRepository.delete(tmp);
        userRepository.flush();
        return tmp;
    }

    @Override
    public userPlan addUserPlan(int user_id, int plan_id, int chooseTime) {
        userPlan u = new userPlan();
        u.setPlan_id(plan_id);
        u.setUser_id(user_id);
        u.setDate_choose(chooseTime);
        u.setFinish(0); //初始时默认没有结束
        userPlanRepository.save(u);
        userPlanRepository.flush();
        return u;
    }

    @Override
    public User getAUser(int id) {
        //System.out.println("进入了UserDao的getAUser函数!");
        return userRepository.getUserById(id);
    }

    @Override
    public userPlan delUserPlan(int userId, int planId) {
        List<userPlan> list = userPlanRepository.getDelPlan(userId, planId);
        Iterator<userPlan> iter = list.iterator();
        userPlan u = iter.next();
        u.setFinish(1); //设置为已结束
        userPlanRepository.save(u);
        userPlanRepository.flush();
        return u;
    }

    public boolean changePwd(String phone, String newPwd) {
        User user = userRepository.getUserByPhone(phone);
        if (user == null)
            return false;
        userRepository.updatePwdByPhone(phone, newPwd);
        return true;
    }

    @Override
    public int register(String phone, String pwd) {
        try {
            User user = new User();
            user.setPhone(phone);
            user.setPwd(pwd);
            user.setNickname("undetermined");
            user.setSex("男");
            user.setState(0);
            user.setExp(0);
            Date date = new Date(0, 0, 1);
            user.setBirth(date);
            userRepository.save(user);
            return userRepository.getUserByPhone(phone).getUser_id();
        } catch (Exception e) {
            return -1;
        }


    }

    @Override
    public int addCaring(int userId, int friendId) {
        Relationship r = relationshipRepository.getARelationshipById(userId, friendId);
        if (r != null) {   // 已经关注
            return -1;
        }
        r = new Relationship(userId, friendId);
        relationshipRepository.save(r);
        relationshipRepository.flush();
        return 0;
    }

    @Override
    public int removeCaring(int userId, int friendId) {
        Relationship r = relationshipRepository.getARelationshipById(userId, friendId);
        if (r == null) {   // 没有关注
            return -1;
        }
        relationshipRepository.delete(r);
        relationshipRepository.flush();
        return 0;
    }

    @Override
    public List<Relationship> getAllCaring(int userId) {
        List<Relationship> res = relationshipRepository.getAllRelationshipById(userId);
        return res;
    }

    @Override
    public User changeBasicInfo(int id, int height, int weight, int bmi) {
        User user = userRepository.getUserById(id);
        if (height != 0) user.setHeight(height);
        if (weight != 0) user.setWeight(weight);
        if (bmi != 0) user.setBmi(bmi); //为0表示此项没有被修改
        userRepository.save(user);
        userRepository.flush();
        return user;
    }

    @Override
    public User changeBirth(int id, Date birth) {
        User user = userRepository.getUserById(id);
        user.setBirth(birth);
        userRepository.save(user);
        userRepository.flush(); //存储新的信息
        return user;
    }

    @Override
    public Favorite addNewFavorite(int user_id, int course_id)
    {
        List<Favorite> list = favoriteRepository.getFavoritesByUser(user_id, course_id);
        Iterator<Favorite> iter = list.iterator();
        if(iter.hasNext()) { //已经收藏过了，不能重复收藏
            Favorite f = new Favorite();
            f.setFavorite_id(-1);
            return f;
        }
        Favorite f = new Favorite();
        f.setUser_id(user_id);
        //f.setUser(userRepository.getUserById(user_id));
        f.setCourse_id(course_id);
        favoriteRepository.save(f);
        favoriteRepository.flush();
        return f;
    }

    @Override
    public Favorite delFavorite(int user_id, int course_id)
    {
        List<Favorite> list = favoriteRepository.getFavoritesByUser(user_id, course_id);
        Iterator<Favorite> iter = list.iterator();
        if(!iter.hasNext()) {
            Favorite f = new Favorite();
            f.setFavorite_id(-1);
            return f;
        }
        Favorite f = iter.next();
        favoriteRepository.delete(f);
        favoriteRepository.flush();
        return f;
    }

    @Override
    public List<Course> getUserFavorite(int user_id) {
        List<Favorite> list = favoriteRepository.getFavoritesByUserId(user_id );
        Iterator<Favorite> iter = list.iterator();
        if(!iter.hasNext()) {
            return new ArrayList<>();
        }
        List<Course> rt = new ArrayList<>();
        for (Favorite favorite: list) {
            rt.add(courseRepository.getCourseByLikeId(favorite.getCourse_id()));
        }
        return rt;

    }

    @Override
    public User_exercise addNewUserExercise(int user_id, int exercise_id, int chosen_time)
    {
        User_exercise u = new User_exercise();
        u.setExercise_id(exercise_id);
        u.setUser_id(user_id);
        u.setChosen_time(chosen_time);
        u.setUse_time(0); //新创建的exercise默认没有花费时间
        u.setFinish(0); //新创建的exercise默认没有结束
        userExerciseRepository.save(u);
        userExerciseRepository.flush();
        return u;
    }

    @Override
    public User_exercise endUserExercise(int user_id, int exercise_id, int use_time)
    {
        List<User_exercise> list =
                userExerciseRepository.getUnFinishedExerciseByInfo(user_id, exercise_id);
        Iterator<User_exercise> iter = list.iterator();
        if(!iter.hasNext()) {
            User_exercise u = new User_exercise();
            u.setUser_exercise_id(-1);
            return u;
        }
        User_exercise u = iter.next();
        u.setFinish(1);
        u.setUse_time(use_time);
        userExerciseRepository.save(u);
        userExerciseRepository.flush();
        return u;
    }

    @Override
    public int checkPhone(String phone){
        User user=userRepository.getUserByPhone(phone);
        if(user == null)return 1;
        else return 0;
    }

    @Override
    public User getUserByPhone(String phone){
        return userRepository.getUserInfoByPhone(phone);
    }

    /*
    @Override
    public double pearson_dis(List<Course> rating1, List<Course> rating2)
    {
        int n = rating1.size();
        if(n == 0) return 0.0;
        int n1 = rating2.size();
        if(n1 == 0) return 0.0;
        List<Integer> rating1ScoreCollect = new ArrayList<>();
        List<Integer> rating2ScoreCollect = new ArrayList<>();
        for(Course c1 : rating1) {
            List<Target_like> likes1 = likeRepositoery.getLikeNumByTypeId(1, c1.getCourse_id());
            rating1ScoreCollect.add(likes1.size() + 2);
        } //以每个课程被点赞的数量作为评分依据
        for(Course c2 : rating2) {
            List<Target_like> likes2 = likeRepositoery.getLikeNumByTypeId(1, c2.getCourse_id());
            rating2ScoreCollect.add(likes2.size() + 2);
        }
        double Ex= rating1ScoreCollect.stream().mapToDouble(x->x).sum() / n;//计算X的平均值
        double Ey= rating2ScoreCollect.stream().mapToDouble(y->y).sum() / n1;//计算Y的平均值

     */
        /*double Ex2=rating1ScoreCollect.stream().mapToDouble(x->Math.pow(x,2)).sum();
        double Ey2=rating2ScoreCollect.stream().mapToDouble(y->Math.pow(y,2)).sum();
        //double Exy= IntStream.range(0,n).mapToDouble(i->rating1ScoreCollect.get(i)*rating2ScoreCollect.get(i)).sum();
        double Exy = 0.0;
        for(int i = 0; i < rating1.size(); ++i) {
            for(int j = 0; j < rating2.size(); ++j) {
                Exy += (rating1ScoreCollect.get(i) * rating2ScoreCollect.get(j));
            }
        }
        double numerator=Exy-Ex*Ey/n;
        double denominator=Math.sqrt((Ex2-Math.pow(Ex,2)/n)*(Ey2-Math.pow(Ey,2)/n));
        if (denominator==0) return 0.0;
        return numerator/denominator;*/
    /*
    double sum1 = 0.0;
        for (Integer value : rating1ScoreCollect) {
            for (Integer integer : rating2ScoreCollect) {
                sum1 += ((value - Ex) * (integer - Ey));
            }
        }
        double sum2 = 0.0;
        for (Integer value : rating1ScoreCollect) {
            sum2 += Math.pow((value - Ex), 2);
        }
        double sum3 = 0.0;
        for (Integer value : rating2ScoreCollect) {
            sum3 += Math.pow((value - Ey), 2);
        }
        double res1 = Math.sqrt(sum2 * sum3);
        return sum1 / res1;
    }*/

    /*@Override
    public List<Course> getUserCoursesByLikes(int userId)
    {
        List<Target_like> likes = likeRepositoery.getLikesByUser(userId);
        List<Course> ans = new ArrayList<>();
        for(Target_like like : likes) {
            ans.add(courseRepository.getCourseByLikeId(like.getTarget_id()));
        }
        return ans;
    }

    @Override
    public List<User> getRandomPartUser(int userId, List<User> users)
    {
        List<User> ans = new ArrayList<>();
        for(int i = 0; i < 5; ++i) {
            int randomPos = (int)(Math.random() * (users.size() - 1));
            //System.out.println("randomPos=" + randomPos);
            User u = users.get(randomPos);
            if(!ans.contains(u)) ans.add(u);
        }
        if(ans.size() < 5) {
            int cur = ans.size();
            for(int i = 0; i < 5; ++i) {
                if(cur == 5) break;
                User u = users.get(i);
                if(!ans.contains(u)) {
                    cur++;
                    ans.add(u);
                }
            }
        }
        return ans;
    }

    @Override
    public boolean checkInTheCourseList(int userId, int courseId)
    {
        List<Course> courses = getUserCoursesByLikes(userId);
        for(Course c : courses) {
            if(c.getCourse_id() == courseId) return true;
        }
        return false;
    }

    @Override
    public Map<Double, Integer> computeNearestNeighbor(int userId, List<User> users)
    {
        Map<Double, Integer> distances = new TreeMap<>();
        User u1 = userRepository.getUserById(userId);
        List<User> randomUsers = getRandomPartUser(userId, users);
        //for(User uu : randomUsers) System.out.println("userId=" + uu.getUser_id());
        for (User u2 : randomUsers) {
            if (u2.getUser_id() != u1.getUser_id()) {
                List<Course> list1 = getUserCoursesByLikes(u2.getUser_id());
                List<Course> list2 = getUserCoursesByLikes(u1.getUser_id());
                double distance = pearson_dis(list1, list2);
                distances.put(distance, u2.getUser_id());
            }
        }
        System.out.println("该用户与其他用户的皮尔森相关系数 -> " + distances);
        return distances;
    }

    @Override
    public List<Course> recommend(int userId, List<User> users)
    {
        //找到最近邻
        Map<Double, Integer> distances = computeNearestNeighbor(userId, users);
        Integer nearest = distances.values().iterator().next();
        System.out.println("最近邻 -> " + nearest);
        //找到最近邻like过但是当前用户没有like过的课程信息
        User neighborRatings = new User();
        for (User user:users) {
            if (nearest == user.getUser_id()) {
                neighborRatings = user;
            }
        }
        //System.out.println("最近邻like的course: -> " + getUserCoursesByLikes(neighborRatings.getUser_id()));
        User userRatings = new User();
        for (User user:users) {
            if (userId == user.getUser_id()) {
                userRatings = user;
            }
        }
        //System.out.println("用户like的course: -> " + getUserCoursesByLikes(userRatings.getUser_id()));
        List<Course> recommended = new ArrayList<Course>();
        for (Course course : getUserCoursesByLikes(neighborRatings.getUser_id())) {
            if (!checkInTheCourseList(userRatings.getUser_id(), course.getCourse_id())) {
                recommended.add(course);
            }
        }
        if(recommended.size() > 5) {
            List<Course> res = new ArrayList<>();
            for(int i = 0; i < 5; ++i) res.add(recommended.get(i));
            return res;
        }
        if(recommended.size() == 5) return recommended;
        //Collections.sort(recommended);
        List<Course> all = courseRepository.findAll();
        //List<Course> all = courseRepository.findAll();
        for(int j = recommended.size(); j < 5; ++j) {
            int pos = (int)(Math.random() * (all.size() - 1));
            System.out.println("j=" + j + "时对应的随机出来的pos=" + pos);
            Course c = all.get(pos);
            if(!recommended.contains(c)) recommended.add(c);
        } //若不足5个，进行随机数模拟进行抽取
        if(recommended.size() < 5) {//考虑到随机数可能存在随机到相同结果的情况，若获取的数据仍然少于5个，则直接添加至5个
            int pos = recommended.size();
            for(int i = 0; i < 5; ++i) {
                if(pos == 5) break;
                Course c = all.get(i);
                if(!recommended.contains(c)) {
                    recommended.add(c);
                    pos++;
                }
            }
        }
        return recommended;
    }*/

    @Override
    //@Cacheable(value="userCache")
    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    @Override
    public User changeUserHeader(int userId, List<MultipartFile> images)
    {
        System.out.println("images=" + images);
        User user = userRepository.getUserById(userId);
        String path = "http://124.71.177.146:80/uploadfiles";
        for(int i = 0; i < images.size(); ++i) {
            MultipartFile file = images.get(i);
            String s = file.getOriginalFilename();
            System.out.println("original name=" + s);
            //为上传到服务器的文件取名，使用UUID防止文件名重复
            String type = s.substring(s.lastIndexOf("."));
            String filename= UUID.randomUUID().toString() + type;
            try{
                //使用Jersey客户端上传文件
                Client client = Client.create();
                WebResource webResource = client.resource(path +"/" + URLEncoder.encode(filename,"utf-8"));
                webResource.put(file.getBytes());
                System.out.println("上传成功");
                user.setHeader(path + "/" + filename);
                userRepository.save(user);
                userRepository.flush();
                System.out.println("图片路径==>" + path + filename);
            }catch(Exception ex){
                System.out.println("exception ex=" + ex);
                System.out.println("上传失败");
            }
        }
        return user;
    }
}
