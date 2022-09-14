package com.example.sportapp_backend.serviceImpl;
import com.example.sportapp_backend.dao.PlanDao;
import com.example.sportapp_backend.entity.Plan;
import com.example.sportapp_backend.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.util.List;

@Service
public class PlanServiceImpl implements PlanService{
    @Autowired
    PlanDao planDao;

    @Override
    public List<Plan> getAllPlans()
    {
        return planDao.getAllPlans();
    }

    @Override
    public Plan getAPlan(int id)
    {
        return planDao.getAPlan(id);
    }

    @Override
    //@Cacheable(value="planCache", key="#cur")
    public List<Plan> getPartPlan(int cur, int size)
    {
        return planDao.getPartPlan(cur, size);
    }
}
