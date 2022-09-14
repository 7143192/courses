package com.example.sportapp_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
@CrossOrigin
public class SportappBackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(SportappBackEndApplication.class, args);
    }

}
