package com.example.sportapp_backend.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class JWTConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors (InterceptorRegistry registry) {
        registry.addInterceptor(new JWTInterceptor())
                .addPathPatterns("/*")
                .excludePathPatterns("/checkUser")
                .excludePathPatterns("/login")
                .excludePathPatterns("/uploadfiles/*")
                .excludePathPatterns("/checkPhone")
                .excludePathPatterns("/sendMsm")
                .excludePathPatterns("/getUserByPhone")
                .excludePathPatterns("/checkCode")
                .excludePathPatterns("/getUserByPhone")
                .excludePathPatterns("/addUser");
    }
}


