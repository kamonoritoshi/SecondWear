package com.sw.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    public String saveFile(MultipartFile file) {
        // Code lưu file local hoặc cloud và trả về URL
        return "uploads/" + file.getOriginalFilename();
    }
}

