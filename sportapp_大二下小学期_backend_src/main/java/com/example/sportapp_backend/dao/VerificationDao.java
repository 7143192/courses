package com.example.sportapp_backend.dao;

public interface VerificationDao {
    public void newCode(String phone, String code);
    public boolean checkCode(String phone, String code);
}
