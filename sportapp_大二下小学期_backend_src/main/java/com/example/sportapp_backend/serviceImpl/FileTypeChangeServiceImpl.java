package com.example.sportapp_backend.serviceImpl;

import com.example.sportapp_backend.service.FileTypeChangeService;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import sun.net.www.protocol.file.FileURLConnection;

import java.io.*;
import java.net.URL;

@Service
public class FileTypeChangeServiceImpl implements FileTypeChangeService {
    @Override
    public MultipartFile urlToMultipartFile(String url, String fileName) {
        //logger.info("开始 url 转换 MultipartFile，url={} ,fileName={}",url,fileName);
        System.out.println("开始进行url与MultiPartFile的转换!");
        File file = null;
        MultipartFile multipartFile = null;
        try {
            FileURLConnection httpUrl = (FileURLConnection) new URL(url).openConnection();
            httpUrl.connect();
            System.out.println("成功建立httpUrl连接"+httpUrl.toString());
            file = inputStreamToFile(httpUrl.getInputStream(),fileName);
            multipartFile = fileToMultipartFile(file);
            System.out.println("完成url与MultiPartFile的转换!");
            //httpUrl.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("url与MultiPartFile的转换出错!");
        }
        //System.out.println("完成url与MultiPartFile的转换!");
        return multipartFile;
    }

    @Override
    public File inputStreamToFile(InputStream ins, String fileName) throws IOException {
        System.out.println("开始将InputStream转化为file!");
        File file = new File(System.getProperty("java.io.tmpdir") + File.separator + fileName);
        OutputStream os = new FileOutputStream(file);
        int bytesRead;
        int len = 8192;
        byte[] buffer = new byte[len];
        while ((bytesRead = ins.read(buffer, 0, len)) != -1) {
            os.write(buffer, 0, bytesRead);
        }
        os.close();
        ins.close();
        System.out.println("完成了InputStream与file的转换!");
        return file;
    }

    @Override
    public CommonsMultipartFile fileToMultipartFile(File file) {
        System.out.println("fileToMultipartFile文件转换中!");
        FileItemFactory factory = new DiskFileItemFactory(16, null);
        FileItem item=factory.createItem(file.getName(),"text/plain",true,file.getName());
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        try {
            FileInputStream fis = new FileInputStream(file);
            OutputStream os = item.getOutputStream();
            while ((bytesRead = fis.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new CommonsMultipartFile((org.apache.commons.fileupload.FileItem) item);
    }
}
