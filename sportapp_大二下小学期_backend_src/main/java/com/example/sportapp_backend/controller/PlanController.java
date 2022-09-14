package com.example.sportapp_backend.controller;
import com.example.sportapp_backend.entity.Plan;
import com.example.sportapp_backend.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlanController {
    @Autowired
    PlanService planService;

    @RequestMapping("/getAllPlans")
    public @ResponseBody
    List<Plan> getAllPlans()
    {
        return planService.getAllPlans();
    }

    @RequestMapping("/getAPlan") //通过plan_id来获取一个plan
    public @ResponseBody Plan getAPlan(@RequestParam("planId") int planId)
    {
        return planService.getAPlan(planId);
    }

    @RequestMapping("/getPartPlan")
    public @ResponseBody List<Plan> getPartPlan(@RequestParam("cur") int cur,
                                                @RequestParam("size") int size)
    {
        return planService.getPartPlan(cur, size);
    }
}
