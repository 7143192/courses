package com.example.sportapp_backend.repository;

import com.example.sportapp_backend.entity.Moment;
import com.example.sportapp_backend.entity.MomentImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
public interface MomentImageRepository extends JpaRepository<MomentImage, Integer> {
    @Query("from MomentImage where moment_id = :id")
    List<MomentImage> getMomentImagesById(@Param("id") int id);
}
