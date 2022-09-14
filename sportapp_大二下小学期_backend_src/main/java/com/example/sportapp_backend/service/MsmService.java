package com.example.sportapp_backend.service;

public interface MsmService {
    boolean send(String phone);
    boolean checkCode(String phone, String code);
}
