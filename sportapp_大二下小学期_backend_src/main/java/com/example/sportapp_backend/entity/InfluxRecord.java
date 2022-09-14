package com.example.sportapp_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.influxdb.annotation.Column;
import org.influxdb.annotation.Measurement;

// 这个实体类是往influxdb里面插入的时候用的
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Measurement(name = "records")
public class InfluxRecord {
    // Column中的name为measurement中的列名
    // 此外,需要注意InfluxDB中时间戳均是以UTC时保存,在保存以及提取过程中需要注意时区转换
    @Column(name = "time")
    private Long time;
    // 注解中添加tag = true,表示当前字段内容为tag内容
    // tag 必须为String类型
    @Column(name = "user_id", tag = true)   // 用户id
    private String user_id;
    @Column(name = "id", tag = true)    // 该用户第几次跑步
    private String id;
    @Column(name = "lat")
    private Float lat;
    @Column(name = "lng")
    private Float lng;
}
