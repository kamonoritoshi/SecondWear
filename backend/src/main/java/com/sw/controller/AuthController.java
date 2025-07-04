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
import com.sw.dto.RegisterRequestDTO;
import com.sw.dto.VerifyRequest;
import com.sw.entity.Account;
import com.sw.entity.Role;
import com.sw.entity.User;
import com.sw.model.PendingRegistration;
import com.sw.security.JwtUtil;
import com.sw.service.EmailService;
import com.sw.service.PendingRegistrationService;
import com.sw.util.CodeGenerator;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final PendingRegistrationService registrationService;
    private final EmailService emailService;
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

        String input = request.getEmail() + "|" + request.getRoleName();
        String token = jwtUtil.generateToken(input, expiration);
        System.out.println("Trả về name: " + acc.getUser().getName());
        return ResponseEntity.ok(new AuthResponse(token, acc.getUser().getName()));
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterRequestDTO request) {
        if (accountRepository.findByUser_Email(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        if (registrationService.exists(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email đã được gửi mã xác nhận. Vui lòng kiểm tra hộp thư.");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Mật khẩu và xác nhận không khớp.");
        }

        String code = CodeGenerator.generateVerificationCode();
        emailService.sendVerificationCode(request.getEmail(), code);

        PendingRegistration pending = new PendingRegistration(
                request.getEmail(),
                request.getFullName(),
                request.getPhone(),
                request.getCity(),
                request.getAddress(),
                request.getPassword(),
                code,
                System.currentTimeMillis()
        );

        registrationService.save(pending);
        return ResponseEntity.ok("Đã gửi mã xác nhận đến email.");
    }
    
    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody VerifyRequest request) {
        PendingRegistration pending = registrationService.get(request.getEmail());
        if (pending == null) {
            return ResponseEntity.badRequest().body("Email chưa đăng ký hoặc mã đã hết hạn.");
        }

        if (!pending.getVerificationCode().equalsIgnoreCase(request.getCode())) {
            return ResponseEntity.badRequest().body("Mã xác nhận không đúng.");
        }

        // Tạo User
        User user = new User();
        user.setEmail(pending.getEmail());
        user.setName(pending.getFullName());
        user.setPhone(pending.getPhone());
        user.setAddress(pending.getAddress() + ", " + pending.getCity());
        user = userRepository.save(user);

        // Gán role "customer"
        Role role = roleRepository.findByRoleName("customer")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role 'customer'"));

        // Tạo Account
        Account account = new Account();
        account.setUser(user);
        account.setRole(role);
        account.setPassword(passwordEncoder.encode(pending.getPassword()));
        account.setStatus("active");
        accountRepository.save(account);

        // Xóa pending
        registrationService.remove(request.getEmail());

        return ResponseEntity.ok("Đăng ký thành công");
    }
}
