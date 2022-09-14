package com.example.sportapp_backend.daoImpl;
import com.example.sportapp_backend.dao.PlanDao;
import com.example.sportapp_backend.entity.Exercise;
import com.example.sportapp_backend.entity.Plan;
import com.example.sportapp_backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Repository
public class PlanDaoImpl implements PlanDao{
    @Autowired
    PlanRepository planRepository;

    @Override
    public List<Plan> getAllPlans()
    {
        return planRepository.getAllPlans();
    }

    @Override
    public Plan getAPlan(int id)
    {
        List<Plan> got = planRepository.getAPlan(id);
        Iterator<Plan> iter = got.iterator();
        if(!iter.hasNext()) {
            //没有找到
            Plan p = new Plan();
            p.setPlan_id(-1);
            return p;
        }
        return iter.next(); //考虑了plan的id的唯一性(主键)
    }

    @Override
    public List<Plan> getPartPlan(int cur, int size)
    {
        List<Plan> all = getAllPlans();
        int len = all.size(); //获取所有跟练课程的数目
        List<Plan> ans = new ArrayList<>();
        int pos = 0;
        int num = 0;
        for(Plan e : all) {
            if(pos < cur){
                pos++;
                continue;
            }
            if(pos == len || num == size) break;
            pos++;
            ans.add(e);
            num++;
        }
        System.out.println("ans=" + ans);
        return ans;
    }
}
