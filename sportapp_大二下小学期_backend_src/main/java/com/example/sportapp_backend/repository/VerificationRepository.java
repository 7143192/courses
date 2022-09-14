package com.example.sportapp_backend.repository;

import com.example.sportapp_backend.entity.Verification_code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface VerificationRepository extends JpaRepository<Verification_code, Integer> {
    @Query("from Verification_code where phone = :phone and code = :code")
    Verification_code checkCode(String phone, String code);

    @Modifying
    @Transactional
    @Query("delete from Verification_code where phone = :phone and code = :code")
    void deleteCode(String phone, String code);
}
