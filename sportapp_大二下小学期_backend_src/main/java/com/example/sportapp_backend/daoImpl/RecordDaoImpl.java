package com.example.sportapp_backend.daoImpl;

import com.example.sportapp_backend.dao.RecordDao;
import com.example.sportapp_backend.entity.InfluxRecord;
import com.example.sportapp_backend.entity.Record;
import com.example.sportapp_backend.entity.SingleRecord;
import com.example.sportapp_backend.repository.RecordRepository;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Point;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Repository
public class RecordDaoImpl implements RecordDao {

    @Autowired
    private InfluxDB influxDB;

    @Autowired
    private RecordRepository recordRepository;

    @Value("${spring.influx.database}")
    private String database;

    @Override
    public int insertRecord(Record record) {
        Record newRecord = new Record(
                record.getUser_id(),
                record.getStart_time(),
                record.getEnd_time(),
                record.getDuration(),
                record.getSpeed()
                ); // 这一部分是存在sql中的
        recordRepository.save(newRecord);

        String userId = record.getUser_id() + "";
        String recordId = newRecord.getRecord_id() + "";
        List<SingleRecord> path = record.getPath(); //这一部分是存在influxdb中的
        for (SingleRecord singleRecord : path) {
            InfluxRecord r = new InfluxRecord(
                    singleRecord.getTime(),
                    userId,
                    recordId,
                    singleRecord.getLat(),
                    singleRecord.getLng()
            );

            influxDB.write(Point.measurementByPOJO(InfluxRecord.class)
                    .time(r.getTime(), TimeUnit.MILLISECONDS)
                    .addFieldsFromPOJO(r)
                    .build());
        }
//        System.out.println(record.getPath());
        return 0;
    }

    @Override
    public List<Record> getUserRecords(int user_id) {
        List<Record> rt = recordRepository.getRecordByUserId(user_id);

        System.out.println(rt);
        for (Record r : rt) {
            String queryCmd = "SELECT time, lat, lng FROM "
                    + "records "
                    + "WHERE user_id='"
                    + user_id + "' AND id='"
                    + r.getRecord_id() + "'";  //注意这里的参数要用单引号括起来
            QueryResult queryResult = influxDB.query(new Query(queryCmd, database),
                    TimeUnit.MILLISECONDS);
//            System.out.println("原始结果为：" + queryResult);

            List<QueryResult.Result> results = queryResult.getResults();

            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> seriesList = result.getSeries();
            List<SingleRecord> singleRecords = new ArrayList<>();

            for (QueryResult.Series series : seriesList) {
                assert series != null;
//                System.out.println("结果数量为：" + (series.getValues() == null ?
//                        0 : series.getValues().size()));
//                System.out.println("colums ==>> " + series.getColumns());
//                System.out.println("tags ==>> " + series.getTags());
//                System.out.println("name ==>> " + series.getName());
//                System.out.println("values ==>> " + series.getValues());

                series.getValues().forEach(valueData -> {
                    SingleRecord singleRecord = new SingleRecord();
                    // 直接查询出来的是科学计数法，需要转换为Long类型的数据
                    BigDecimal decimalTime = new BigDecimal(valueData.get(0).toString());
                    singleRecord.setTime(decimalTime.longValue());
                    singleRecord.setLat(Float.parseFloat(valueData.get(1).toString()));
                    singleRecord.setLng(Float.parseFloat(valueData.get(2).toString()));
                    singleRecords.add(singleRecord);
                });
            }
            r.setPath(singleRecords);

        }
        return rt;
    }

    @Override
    public int getMaxId()
    {
        List<Record> list = recordRepository.findAll();
        if(list.size() == 0) {
            return 1;
        }
        int max = 1;
        for(Record r : list) {
            if(r.getRecord_id() > max) max = r.getRecord_id();
        }
        max++;
        return max;
    }

    @Override
    public List<Record> getPartUserRecords(int user_id, int cur, int size)
    {
        List<Record> rt = recordRepository.getRecordByUserId(user_id);
        List<Record> ans = new ArrayList<>();
        int len = rt.size();//获取所有记录的个数信息
        int pos = 0;
        int num = 0;
        for (Record r : rt) {
            if(pos < cur) {
                pos++;
                continue;
            }
            if(pos == len || num == size) break;
            String queryCmd = "SELECT time, lat, lng FROM "
                    + "records "
                    + "WHERE user_id='"
                    + user_id + "' AND id='"
                    + r.getRecord_id() + "'";  //注意这里的参数要用单引号括起来
            QueryResult queryResult = influxDB.query(new Query(queryCmd, database),
                    TimeUnit.MILLISECONDS);
            List<QueryResult.Result> results = queryResult.getResults();
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> seriesList = result.getSeries();
            List<SingleRecord> singleRecords = new ArrayList<>();
            for (QueryResult.Series series : seriesList) {
                assert series != null;
                series.getValues().forEach(valueData -> {
                    SingleRecord singleRecord = new SingleRecord();
                    // 直接查询出来的是科学计数法，需要转换为Long类型的数据
                    BigDecimal decimalTime = new BigDecimal(valueData.get(0).toString());
                    singleRecord.setTime(decimalTime.longValue());
                    singleRecord.setLat(Float.parseFloat(valueData.get(1).toString()));
                    singleRecord.setLng(Float.parseFloat(valueData.get(2).toString()));
                    singleRecords.add(singleRecord);
                });
            }
            r.setPath(singleRecords);
            pos++;
            ans.add(r);
            num++;
        }
        return ans;
    }

}
