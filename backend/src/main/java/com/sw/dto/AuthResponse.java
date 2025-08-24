package com.sw.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponse {
    private Long accountId;     // 👈 thêm accountId
    private String token;
    private String email;
    private String name;
    private String role; 
    private String sellerStatus;
    private String avatarUrl;

    // Constructor đầy đủ
    public AuthResponse(Long accountId, String token, String email, String name, String role, String sellerStatus, String avatarUrl) {
        this.accountId = accountId;
        this.token = token;
        this.email = email;
        this.name = name;
        this.role = role;
        this.sellerStatus = sellerStatus;
        this.avatarUrl = avatarUrl;
    }

    // Constructor trả về token hoặc message lỗi
    public AuthResponse(String token) {
        this.token = token;
    }
}
