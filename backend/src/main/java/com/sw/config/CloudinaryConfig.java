package com.sw.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {
	
	@Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        // ✨ THÊM LOG ĐỂ KIỂM TRA
        System.out.println("--- Đang tải cấu hình Cloudinary ---");
        System.out.println("Cloud Name đọc được: [" + cloudName + "]");
        System.out.println("API Key đọc được: [" + apiKey + "]");
        System.out.println("API Secret đọc được: [" + apiSecret + "]");
        System.out.println("------------------------------------");

        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);

        if (cloudName == null || apiKey == null || apiSecret == null) {
            System.err.println("!!! LỖI: Một trong các giá trị cấu hình Cloudinary là null.");
            throw new IllegalStateException("Cấu hình Cloudinary bị thiếu!");
        }

        return new Cloudinary(config);
    }
}
