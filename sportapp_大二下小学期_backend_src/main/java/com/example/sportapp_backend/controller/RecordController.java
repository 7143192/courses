package com.example.sportapp_backend.controller;

import com.example.sportapp_backend.entity.InfluxRecord;
import com.example.sportapp_backend.entity.Record;
import com.example.sportapp_backend.repository.RecordRepository;
import com.example.sportapp_backend.service.RecordService;
import javafx.util.Pair;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
public class RecordController {

    @Autowired
    private InfluxDB influxDB;

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private RecordService recordService;


    @RequestMapping("/insertRecord")
    public int insertRecord(
            @RequestBody Record record
            ) {
        return recordService.insertRecord(record);
    }

    @RequestMapping("/getUserRecords")
    public @ResponseBody
    List<Record> getUserRecords(@RequestParam("user_id") int user_id) {
        return recordService.getUserRecords(user_id);
    }

    @RequestMapping("/getMaxId")
    public @ResponseBody int getMaxId()
    {
        return recordService.getMaxId();
    }

    @RequestMapping("/getPartUserRecords")
    public @ResponseBody
    List<Record> getPartUserRecords(@RequestParam("user_id") int user_id,
                                    @RequestParam("cur") int cur,
                                    @RequestParam("size") int size)
    {
        return recordService.getPartUserRecords(user_id, cur, size);
    }

    @RequestMapping("/getSportSumInfo")
    public @ResponseBody
    Pair<Integer, Integer> getSportSumInfo(@RequestParam("id") int id) {
        //Integer key = recordRepository.getLastRecord(id);
        List<Record> records = recordRepository.getRecordByUserId(id);
        Integer key = records.size();
        Integer value = recordRepository.getTotalTime(id);
        int ans = 0;
        if(value == null) ans = 0;
        else ans = value;
        Pair<Integer, Integer> p = new Pair<>(key, ans);
        return p;
    }
}
