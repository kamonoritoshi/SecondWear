package com.sw.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
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
import com.sw.service.GoogleVerifier;
import com.sw.service.PendingRegistrationService;
import com.sw.util.CodeGenerator;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
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
	    Account acc = accountRepository.findByEmailAndRole(request.getEmail(), request.getRoleName())
	            .orElseThrow(() -> new RuntimeException("Tài khoản hoặc vai trò không đúng"));

	    if (!passwordEncoder.matches(request.getPassword(), acc.getPassword())) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(new AuthResponse("Mật khẩu không đúng"));
	    }

	    long expiration = request.isRememberMe() ? 604800000L : 1800000L;
	    String token = jwtUtil.generateToken(request.getEmail(), request.getRoleName().toLowerCase(), expiration);

	    return ResponseEntity.ok(new AuthResponse(
	            acc.getAccountId(),             // 👈 gửi luôn accountId
	            token,
	            acc.getUser().getEmail(),
	            acc.getUser().getName(),
	            acc.getRole().getRoleName(),
	            acc.getSellerStatus().toString(),
	            acc.getAvatarUrl()
	    ));
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

		PendingRegistration pending = new PendingRegistration(request.getEmail(), request.getFullName(),
				request.getPhone(), request.getCity(), request.getAddress(), request.getPassword(),
				request.getRoleName(), // THÊM roleName từ request
				code, System.currentTimeMillis());

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

		// 🔍 Lấy role theo roleName trong pending
		Role role = roleRepository.findByRoleName(pending.getRoleName())
				.orElseThrow(() -> new RuntimeException("Không tìm thấy role '" + pending.getRoleName() + "'"));

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

	@PostMapping("/google-login")
	public ResponseEntity<AuthResponse> googleLogin(@RequestBody Map<String, String> payload) {
	    String credential = payload.get("credential");
	    // roleName từ frontend chỉ được dùng khi tạo tài khoản mới
	    String roleNameForNewUser = payload.getOrDefault("roleName", "customer");
	    boolean rememberMe = Boolean.parseBoolean(payload.getOrDefault("rememberMe", "false"));

	    try {
	        GoogleIdToken.Payload googlePayload = GoogleVerifier.verify(credential);
	        if (googlePayload == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                    .body(new AuthResponse("Token Google không hợp lệ"));
	        }

	        String email = googlePayload.getEmail();
	        String name = (String) googlePayload.get("name");

	        // ✅ LOGIC MỚI: Ưu tiên tìm tài khoản đã tồn tại, bất kể vai trò
	        // Tìm theo thứ tự ưu tiên: admin -> seller -> customer
	        Optional<Account> existingAccountOpt = accountRepository.findByUser_EmailAndRole_RoleName(email, "admin")
	            .or(() -> accountRepository.findByUser_EmailAndRole_RoleName(email, "seller"))
	            .or(() -> accountRepository.findByUser_EmailAndRole_RoleName(email, "customer"));

	        Account acc;
	        if (existingAccountOpt.isPresent()) {
	            // ✅ Nếu người dùng đã tồn tại -> sử dụng tài khoản đó và bỏ qua roleName từ frontend
	            acc = existingAccountOpt.get();
	        } else {
	            // ✅ Nếu người dùng chưa tồn tại -> tạo User và Account mới với vai trò từ frontend
	            User user = userRepository.findByEmail(email).orElseGet(() -> {
	                User newUser = new User();
	                newUser.setEmail(email);
	                newUser.setName(name);
	                return userRepository.save(newUser);
	            });

	            Role role = roleRepository.findByRoleName(roleNameForNewUser)
	                    .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò: " + roleNameForNewUser));

	            acc = new Account();
	            acc.setUser(user);
	            acc.setRole(role);
	            acc.setPassword(passwordEncoder.encode("GOOGLE_USER"));
	            acc.setStatus("active");
	            if ("seller".equalsIgnoreCase(roleNameForNewUser)) {
	                acc.setSellerStatus(Account.SellerStatus.APPROVED);
	            }
	            accountRepository.save(acc);
	        }

	        long expiration = rememberMe ? 604800000L : 1800000L;
	        // Sử dụng vai trò thực tế của tài khoản để tạo token, không dùng roleName từ frontend
	        String token = jwtUtil.generateToken(email, acc.getRole().getRoleName(), expiration);

	        return ResponseEntity.ok(new AuthResponse(
		            acc.getAccountId(),             // 👈 gửi luôn accountId
		            token,
		            acc.getUser().getEmail(),
		            acc.getUser().getName(),
		            acc.getRole().getRoleName(),
		            acc.getSellerStatus().toString(),
		            acc.getAvatarUrl()
		    ));

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(new AuthResponse("Đăng nhập bằng Google thất bại: " + e.getMessage()));
	    }
	}
}
