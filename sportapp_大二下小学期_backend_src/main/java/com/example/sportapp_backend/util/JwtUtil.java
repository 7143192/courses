package com.example.sportapp_backend.util;


import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Map;

public class JwtUtil {

    private static final String SIGN = "hello";
    public static String generateToken(Map<String, String> map) {

        Calendar instance = Calendar.getInstance();
        // 有效期为七天
        instance.add(Calendar.DATE, 7);

        JWTCreator.Builder builder = JWT.create();
        map.forEach(builder::withClaim);

        return builder.withExpiresAt(instance.getTime())
                .sign(Algorithm.HMAC256(SIGN));
    }

    public static DecodedJWT verify(String token) {
        return JWT.require(Algorithm.HMAC256(SIGN)).build().verify(token);
    }
}
