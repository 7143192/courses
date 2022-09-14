package com.example.sportapp_backend.entity;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class FileUploading {

    public List<String> photoUpload( List<BASE64DecodedMultipartFile> files, HttpServletRequest request) throws IOException {
        List<String> list = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            for (BASE64DecodedMultipartFile multipartFile : files) {
                BASE64DecodedMultipartFile file = multipartFile;
                list = saveFile(file, list, request);
            }
        } else {
            System.out.println("未找到相对应的图片");
            return null;
        }
        return list;
    }

    private List<String> saveFile(BASE64DecodedMultipartFile file, List<String> list, HttpServletRequest request) {
        // 判断文件是否为空
        if (!file.isEmpty()) {
            try {
                // 保存的文件路径(如果用的是Tomcat服务器，文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\upload\\文件夹中
                // )
                String filePath = request.getSession().getServletContext()
                        .getRealPath("/")
                        + "upload/" + file.getOriginalFilename();
                list.add(file.getOriginalFilename());
                System.out.println(filePath);
                File saveDir = new File(filePath);
                if (!saveDir.getParentFile().exists())
                    saveDir.getParentFile().mkdirs();

                // 转存文件
                file.transferTo(saveDir);
                return list;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return list;
    }

    public List<String> phtoUpload(BASE64DecodedMultipartFile base64DecodedMultipartFile, HttpServletRequest request)throws IllegalStateException, IOException {
        List<String> list = new ArrayList<>();
        if (base64DecodedMultipartFile != null && !base64DecodedMultipartFile.isEmpty()) {
            list = saveFileBase64(base64DecodedMultipartFile, list, request);

        } else {
            System.out.println("未找到相对应的图片");
            return null;
        }
        return list;
    }

    private List<String> saveFileBase64(BASE64DecodedMultipartFile file, List<String> list, HttpServletRequest request)throws IllegalStateException, IOException  {

        if (file != null) {// 判断上传的文件是否为空
            String path = null;// 文件路径
            String type = null;// 文件类型
            String url = "";
            String fileName = file.getOriginalFilename();// 文件原名称
            System.out.println("上传的文件原名称:" + fileName);
            // 判断文件类型
            type = fileName.indexOf(".") != -1 ? fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length()) : null;
            if (type != null) {// 判断文件类型是否为空
                if ("JPEG".equals(type.toUpperCase()) || "GIF".equals(type.toUpperCase()) || "PNG".equals(type.toUpperCase()) || "JPG".equals(type.toUpperCase())) {
                    String returnUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()+"/upload";//存储路径
                    // 项目在容器中实际发布运行的根路径
                    String realPath = request.getSession().getServletContext()
                            .getRealPath("/upload/");
                    // 自定义的文件名称
                    String trueFileName = new Date().getTime()+"_"+file.getOriginalFilename();
                    // 设置存放图片文件的路径
                    path = realPath + trueFileName;
                    System.out.println("存放图片文件的路径:" + path);
                    File saveDir = new File(path);
                    if (!saveDir.getParentFile().exists())
                        saveDir.getParentFile().mkdirs();
                    // 转存文件到指定的路径
                    file.transferTo(saveDir);
                    //url = returnUrl +"/"+trueFileName;
                    url="http://124.71.177.146:8080/upload/"+trueFileName;
                    list.add(url);
                    System.out.println("文件成功上传到指定目录下");
                } else {
                    System.out.println("不是我们想要的文件类型,请按要求重新上传");
                    return null;
                }
            } else {
                System.out.println("文件类型为空");
                return null;
            }
        } else {
            System.out.println("没有找到相对应的文件");
            return null;
        }
        return list;
    }
}
