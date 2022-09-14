package com.example.sportapp_backend.entity;

import lombok.Data;


// 这个类就是用来前端向后端传参数的，不存在sql中
@Data
public class SingleRecord {
    private Long time;

    private Float lat;

    private Float lng;
}
