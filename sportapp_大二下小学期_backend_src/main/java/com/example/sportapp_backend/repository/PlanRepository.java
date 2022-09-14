package com.example.sportapp_backend.repository;
import com.example.sportapp_backend.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface PlanRepository extends JpaRepository<Plan, Integer>{
    @Query("select p from Plan p")
    List<Plan> getAllPlans();

    @Query("from Plan where plan_id = :id")
    List<Plan> getAPlan(@Param("id") int id);
}
