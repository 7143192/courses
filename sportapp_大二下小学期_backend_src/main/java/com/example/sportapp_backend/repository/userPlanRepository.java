package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.userPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface userPlanRepository extends JpaRepository<userPlan, Integer>{
    @Query("from userPlan where user_id = :userId and plan_id = :planId and finish = 0")
    List<userPlan> getDelPlan(@Param("userId") int userId,
                              @Param("planId") int planId);
}
