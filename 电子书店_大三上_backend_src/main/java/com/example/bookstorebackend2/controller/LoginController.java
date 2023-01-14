package com.example.bookstorebackend2.controller;
import com.example.bookstorebackend2.constant.Constant;
import com.example.bookstorebackend2.entity.User;
import com.example.bookstorebackend2.repository.UserRepository;
import com.example.bookstorebackend2.service.TimeCountService;
import com.example.bookstorebackend2.service.UserService;
import com.example.bookstorebackend2.utils.Msg;
import com.example.bookstorebackend2.utils.MsgCode;
import com.example.bookstorebackend2.utils.MsgUtil;
import com.example.bookstorebackend2.utils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private TimeCountService timeCountService;

    @RequestMapping("/login")
    public Msg login(@RequestParam("username") String username,
                     @RequestParam("password") String password) {
        //String username = params.get(Constant.USERNAME);
        //String password = params.get(Constant.PASSWORD);
        User auth = userService.checkUser(username, password);
        if(auth != null){
            JSONObject obj = new JSONObject();
            obj.put(Constant.USER_ID, auth.getUserId());
            obj.put(Constant.USERNAME, auth.getUsername());
            obj.put(Constant.PASSWORD, auth.getPassword());
            obj.put(Constant.EMAIL, auth.getEmail());
            obj.put(Constant.USER_TYPE, auth.getType());
            obj.put(Constant.SEX, auth.getSex());
            SessionUtil.setSession(obj);
            JSONObject data = JSONObject.fromObject(auth);
            //data.remove(Constant.PASSWORD);
            System.out.println(timeCountService);
            long start = timeCountService.setStartTime();//记录会话开始时间
            System.out.println("startTime = " + start);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
        }
    }

    @RequestMapping("/logout")
    public Msg logout(){
        //要注意这里的setEndTime要在removeSession之前去执行，
        //因为timeService也是一个session，所以若先removeSession则会出现将timeService也清除
        //这会导致之前存储在session中的startTime也会丢失，从而使得之后进行的
        //EndTime函数获得的EndTime并没有对应的startTime从而出错
        long data = timeCountService.setEndTime();
        JSONObject obj = new JSONObject();
        obj.put(Constant.LAST_TIME, data);
        Boolean status = SessionUtil.removeSession();
        //timeCountService.setEndTime();//记录会话结束时间
        if(status){
            /*long data = timeCountService.setEndTime();
            JSONObject obj = new JSONObject();
            obj.put(Constant.LAST_TIME, data);*/
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGOUT_SUCCESS_MSG, obj);
        }
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.LOGOUT_ERR_MSG);
    }

    @RequestMapping("/checkSession")
    public Msg checkSession(){
        JSONObject auth = SessionUtil.getAuth();
        if(auth == null){
            return MsgUtil.makeMsg(MsgCode.NOT_LOGGED_IN_ERROR);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }
}

