package com.sw.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sw.dao.AccountRepository;
import com.sw.dao.RoleRepository;
import com.sw.dao.UserRepository;
import com.sw.dto.AuthRequest;
import com.sw.dto.AuthResponse;
import com.sw.entity.Account;
import com.sw.entity.Role;
import com.sw.entity.User;
import com.sw.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
    	System.out.println("⏺ Email: " + request.getEmail());
    	System.out.println("⏺ Role: " + request.getRoleName());
    	
    	Account acc = accountRepository.findByEmailAndRole(
    	        request.getEmail(), request.getRoleName()
    	    ).orElseThrow(() -> new RuntimeException("Tài khoản hoặc vai trò không đúng"));

	    // Kiểm tra password
	    if (!passwordEncoder.matches(request.getPassword(), acc.getPassword())) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Mật khẩu không đúng"));
	    }
        
        // ⏱ Token duration tùy thuộc vào rememberMe
        long expiration = request.isRememberMe() ? 604800000 : 1800000; // 7 ngày hoặc 30 phút

        String token = jwtUtil.generateToken(request.getEmail(), expiration);
        return ResponseEntity.ok(new AuthResponse(token));
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        if (accountRepository.findByUser_Email(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        // 1. Tạo user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName("New User"); // có thể nhận thêm name sau
        user.setPhone("");
        user.setAddress("");
        user = userRepository.save(user);

        // 2. Gán role mặc định là "customer"
        Role role = roleRepository.findByRoleName("customer")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role 'customer'"));

        // 3. Tạo account
        Account account = new Account();
        account.setUser(user);
        account.setRole(role);
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setStatus("active");

        accountRepository.save(account);

        return ResponseEntity.ok("Đăng ký thành công");
    }
}
