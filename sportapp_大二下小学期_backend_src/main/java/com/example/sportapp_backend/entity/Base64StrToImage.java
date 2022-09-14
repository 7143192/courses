package com.example.sportapp_backend.entity;

import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import java.io.File;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.logging.Logger;

public class Base64StrToImage {

    Logger logger = (Logger) LoggerFactory.getLogger(Base64StrToImage.class);
    public  static MultipartFile base64MutipartFile(String imgStr){
        /*try {
            String [] baseStr = imgStr.split(",");
            System.out.println("baseStr=" + Arrays.toString(baseStr));
            BASE64Decoder base64Decoder = new BASE64Decoder();
            byte[] b =  new byte[0];
            b = base64Decoder.decodeBuffer(baseStr[1]);
            for(int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {
                    b[i] += 256;
                }
            }
            return  new BASE64DecodedMultipartFile(b,baseStr[0]) ;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }*/
        return null;
    }
}
