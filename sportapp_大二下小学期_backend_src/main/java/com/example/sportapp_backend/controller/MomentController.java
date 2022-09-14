package com.example.sportapp_backend.controller;

import com.alibaba.fastjson.JSON;
import com.example.sportapp_backend.entity.FileUploading;
import com.example.sportapp_backend.entity.Moment;
import com.example.sportapp_backend.service.FileTypeChangeService;
import com.example.sportapp_backend.service.MomentService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.example.sportapp_backend.entity.BASE64DecodedMultipartFile;
import com.example.sportapp_backend.entity.Base64StrToImage;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class MomentController {
    @Autowired
    MomentService momentService;

    @Autowired
    FileTypeChangeService fileTypeChangeService;

    @RequestMapping("/getAllMoments")
    public @ResponseBody
    List<Moment> getAllMoments(){return momentService.getAllMoments();}

    @RequestMapping("/getUserMoments")
    public @ResponseBody
    List<Moment> getUserMoments(@RequestParam("userId") int user_id)
    {
        return momentService.getUserMoments(user_id);
    }

    @RequestMapping("/getFollowMoments")
    public @ResponseBody
    List<Moment> getFollowMoments(@RequestParam("userId") int user_id)
    {
        return momentService.getFollowMoments(user_id);
    }

    @RequestMapping("/delMoment")
    public @ResponseBody Moment delMoment(@RequestParam("momentId") int moment_id)
    {
        return momentService.delMoment(moment_id);
    }

    @RequestMapping("/addMoment")
    public @ResponseBody
    Moment addMoment(@RequestParam("userId") int user_id,@RequestParam("content") String content)
    {
        return momentService.addMoment(user_id,content);
    }

    @RequestMapping("/getPartAllMoment")
    public @ResponseBody List<Moment> getPartAllMoment(@RequestParam("cur") int cur,
                                                       @RequestParam("size") int size)
    {
        return momentService.getPartAllMoment(cur, size);
    }

    @RequestMapping("/getPartUserMoments")
    public @ResponseBody
    List<Moment> getPartUserMoments(@RequestParam("userId") int userId,
                                    @RequestParam("cur") int cur,
                                    @RequestParam("size") int size)
    {
        return momentService.getPartUserMoments(userId, cur, size);
    }

    @RequestMapping(value = "/addMomentAndImages", consumes = {"multipart/form-data"})
    public @ResponseBody
    Moment addMomentAndImages(@RequestParam("userId") int user_id,
                              @RequestParam("content") String content,
                              //String imageUri,
                              //String imageName,
                              String base64)
    {
        /*System.out.println("input image uri=" + imageUri);
        System.out.println("input image name=" + imageName);
        String[] uri = imageUri.split(",");
        String[] name = imageName.split(",");
        List<MultipartFile> images = new ArrayList<>();
        for(int i = 0; i < uri.length; ++i) {
            MultipartFile tmpFile = fileTypeChangeService.urlToMultipartFile(uri[i], name[i]);
            images.add(tmpFile);
        }//将uri转化为对应的MultiPartFile*/
        System.out.println("string base64=" + base64);
        JSONArray json = JSONArray.fromObject(base64);
        List<MultipartFile> images = new ArrayList<>();
        for (int i= 0; i < json.size(); i++) {
            JSONObject jsonOne = json.getJSONObject(i);
            //String name = jsonOne.getString("name");
            String got_base64 = jsonOne.getString("base64");
            //System.out.println("name=" + name + ",base64=" + got_base64);
            final String[] base64Array = got_base64.split(",");
            String dataUir, data;
            if (base64Array.length > 1) {
                dataUir = base64Array[0];
                data = base64Array[1];
            } else {
                //根据你base64代表的具体文件构建
                dataUir = "data:image/jpg;base64";
                data = base64Array[0];
            }
            MultipartFile multipartFile = new BASE64DecodedMultipartFile(data, dataUir);
            images.add(multipartFile);
        }
        //MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        //List<MultipartFile> images = multipartHttpServletRequest.getFiles("imageUri");//获取附件
        return momentService.addMomentAndImages(user_id, content, images);
    }

    @RequestMapping(value = "/addMomentAndImagesTest", consumes = {"multipart/form-data"})
    public @ResponseBody
    Moment addMomentAndImagesTest(List<MultipartFile> image)
    {
        return momentService.addMomentAndImages(1, "动态发布测试!", image);
    }

    @RequestMapping ("/fileUploading")
    public Moment uploadImg(@RequestParam("userId") int user_id,
                            @RequestParam("content") String content,
                            String image,
                            HttpServletRequest request)  {
        return null;
    }

    @RequestMapping("/testGetLastMoment")
    public @ResponseBody Moment getLastMoment() {
        return momentService.getLastMoment();
    }
}




