package com.example.sportapp_backend.service;
import com.example.sportapp_backend.entity.Plan;

import java.util.List;

public interface PlanService {
    List<Plan> getAllPlans();
    Plan getAPlan(int id);
    List<Plan> getPartPlan(int cur, int size);
}
