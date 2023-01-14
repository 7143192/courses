package com.example.bookstorebackend2.serviceimpl;
import com.example.bookstorebackend2.dao.UserDao;
import com.example.bookstorebackend2.service.TimeCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
@SessionScope
public class TimeCountServiceImpl implements TimeCountService {
    private static long startTime;
    @Autowired
    private UserDao userDao;

    @Override
    public long setStartTime() {
        //userDao.setStartTime();
        startTime = System.currentTimeMillis();
        return startTime;
    }

    @Override
    public long setEndTime() {
        long endTime = System.currentTimeMillis();
        return (endTime - startTime);
    }
}
