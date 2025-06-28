package com.sw.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PendingRegistration {
	private String email;
    private String fullName;
    private String phone;
    private String city;
    private String address;
    private String password; // bạn có thể mã hóa sau nếu cần
    private String verificationCode;
    private long createdAt; // thời gian tạo, dùng để hết hạn mã
}
