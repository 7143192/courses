package com.example.sportapp_backend.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public interface FileTypeChangeService {
    MultipartFile urlToMultipartFile(String url, String fileName);
    File inputStreamToFile(InputStream ins, String fileName) throws IOException;
    CommonsMultipartFile fileToMultipartFile(File file);
}
