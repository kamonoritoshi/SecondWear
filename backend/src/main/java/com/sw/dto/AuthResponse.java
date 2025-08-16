package com.sw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
	private String token;
	private String name;
	private String email;
	
	public AuthResponse(String token) {
        this.token = token;
    }
}
