package com.example.sportapp_backend.repository;

import com.example.sportapp_backend.entity.Course;
import com.example.sportapp_backend.entity.Moment;
import com.example.sportapp_backend.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Integer> {
    @Query("from Record where user_id = :user_id")
    List<Record> getRecordByUserId(@Param("user_id") int user_id);
    @Query(value = "select sum(duration) from records where user_id = :id", nativeQuery = true)
    Integer getTotalTime(@Param("id") int id);
}
