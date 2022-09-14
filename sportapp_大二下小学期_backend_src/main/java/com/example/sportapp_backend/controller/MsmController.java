package com.example.sportapp_backend.controller;

import com.example.sportapp_backend.service.MsmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MsmController {
    @Autowired
    private MsmService msmService;

    @RequestMapping("/sendMsm")
    public @ResponseBody
    boolean sendMsm(
            @RequestParam("phone") String phone
    ){
        return msmService.send(phone);
    }

    @RequestMapping("/checkCode")
    public @ResponseBody
    boolean checkCode(
            @RequestParam("phone") String phone,
            @RequestParam("code") String code
    ) {
        return msmService.checkCode(phone, code);
    }

}
