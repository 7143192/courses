//package com.example.bookstorebackend2.interceptor;
//
//import com.mongodb.MongoClient;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.mongodb.core.MongoTemplate;
//
//@Configuration
//public class MongoConfig {
//
//    @Bean
//    public MongoClient mongoClient() {
//        return new MongoClient("localhost", 27017);
//    }
//
//    @Bean
//    public MongoTemplate mongoTemplate() {
//        return new MongoTemplate(mongoClient(), "test");
//    }
//
//
//}
