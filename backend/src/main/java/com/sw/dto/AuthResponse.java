package com.sw.dto;

import lombok.AllArgsConstructor;
import com.sw.entity.Account;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
	private String token;
	private String email;
	private String name;
	private String role; // ✅ Thêm vai trò
    private String sellerStatus; // ✅ Thêm trạng thái người bán
	
    public AuthResponse(String token, String email, String name, String role) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public AuthResponse(String message) {
        this.token = message;
    }
}
