package com.example.sportapp_backend.dao;
import com.example.sportapp_backend.entity.Plan;

import java.util.List;

public interface PlanDao {
    List<Plan> getAllPlans();
    Plan getAPlan(int id);
    List<Plan> getPartPlan(int cur, int size);
}
