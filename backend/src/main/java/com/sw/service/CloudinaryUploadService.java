package com.sw.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryUploadService {
	@Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) {
        try {
            // Upload file lên Cloudinary và trả về một Map chứa thông tin file đã upload
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            
            // Lấy URL an toàn của file ảnh từ kết quả trả về
            // Cloudinary sẽ trả về một key là "secure_url"
            return uploadResult.get("secure_url").toString();
            
        } catch (IOException e) {
            // Ném ra một RuntimeException nếu có lỗi xảy ra
            throw new RuntimeException("Không thể upload file, vui lòng thử lại.", e);
        }
    }
}
