package com.sw.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDTO {
	@Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email là bắt buộc")
    private String email;

    @NotBlank(message = "Họ tên là bắt buộc")
    private String fullName;

    @NotBlank(message = "Số điện thoại là bắt buộc")
    @Pattern(regexp = "^[0-9]{9,11}$", message = "Số điện thoại không hợp lệ")
    private String phone;

    @NotBlank(message = "Thành phố là bắt buộc")
    private String city;

    @NotBlank(message = "Địa chỉ cụ thể là bắt buộc")
    private String address;

    @NotBlank(message = "Mật khẩu là bắt buộc")
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    private String password;

    @NotBlank(message = "Xác nhận mật khẩu là bắt buộc")
    private String confirmPassword;
}
