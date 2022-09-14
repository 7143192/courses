package com.example.sportapp_backend.serviceImpl;

import com.example.sportapp_backend.dao.RecordDao;
import com.example.sportapp_backend.entity.Record;
import com.example.sportapp_backend.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordServiceImpl implements RecordService {

    @Autowired
    private RecordDao recordDao;

    @Override
    //@CacheEvict(value="recordCache", key="#record.user_id")
    public int insertRecord(Record record) {
        return recordDao.insertRecord(record);
    }

    @Override
    //@Cacheable(value="recordCache", key="#user_id")
    public List<Record> getUserRecords(int user_id) {
        return recordDao.getUserRecords(user_id);
    }

    @Override
    public int getMaxId()
    {
        return recordDao.getMaxId();
    }

    @Override
    //@Cacheable(value="recordCache", key="#user_id")
    public List<Record> getPartUserRecords(int user_id, int cur, int size)
    {
        return recordDao.getPartUserRecords(user_id, cur, size);
    }
}
