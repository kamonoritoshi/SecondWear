package com.sw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
	private String token;
	private String name;
	private Long accountId;
	private String roleName;
	
	public AuthResponse(String token) {
        this.token = token;
    }
}
