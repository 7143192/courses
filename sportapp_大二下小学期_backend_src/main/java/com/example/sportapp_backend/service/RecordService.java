package com.example.sportapp_backend.service;

import com.example.sportapp_backend.entity.Record;

import java.util.List;

public interface RecordService {
    int insertRecord(Record record);
    List<Record> getUserRecords(int user_id);
    int getMaxId();
    List<Record> getPartUserRecords(int user_id, int cur, int size);
}
