package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.AccountRepository;
import com.sw.dao.RoleRepository;
import com.sw.dto.AuthResponse;
import com.sw.entity.Account;
import com.sw.entity.Role;
import com.sw.security.CustomUserDetails;
import com.sw.security.JwtUtil;
import com.sw.service.AccountService;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
	@Autowired
	private AccountService accountService;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private JwtUtil jwtUtil;

	@GetMapping
	public List<Account> getAllAccounts() {
		return accountService.getAllAccounts();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
		Account account = accountService.getAccountById(id);
		if (account == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(account);
	}

	@PostMapping
	public ResponseEntity<Account> createAccount(@RequestBody Account account) {
		return ResponseEntity.ok(accountService.createAccount(account));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {
		Account updated = accountService.updateAccount(id, account);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
		accountService.deleteAccount(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/me")
	public ResponseEntity<Account> getMyAccount(Authentication authentication) {
		String subject = authentication.getName(); // Lấy subject, ví dụ: "luu05826@gmail.com|admin"

		if (subject == null || !subject.contains("|")) {
			throw new RuntimeException("Định dạng thông tin xác thực không hợp lệ.");
		}

		// Tách email và role từ subject
		String[] parts = subject.split("\\|");
		String email = parts[0];
		String role = parts[1];

		// Dùng email và role đã tách để tìm tài khoản chính xác
		Account account = accountRepository.findByUser_EmailAndRole_RoleName(email, role).orElseThrow(
				() -> new RuntimeException("Không tìm thấy tài khoản người dùng với thông tin đã xác thực."));

		return ResponseEntity.ok(account);
	}

	@PostMapping("/request-seller")
	public ResponseEntity<?> requestSellerRole(Authentication authentication) {
		// Lấy thông tin email và role từ subject đã được xác thực
		String subject = authentication.getName();
		if (subject == null || !subject.contains("|")) {
			throw new RuntimeException("Định dạng thông tin xác thực không hợp lệ.");
		}
		String[] parts = subject.split("\\|");
		String email = parts[0];

		// Tìm tài khoản với vai trò 'customer'
		Account account = accountRepository.findByUser_EmailAndRole_RoleName(email, "customer")
				.orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản khách hàng để gửi yêu cầu."));

		if (account.getSellerStatus() == Account.SellerStatus.PENDING) {
			return ResponseEntity.badRequest().body("Yêu cầu của bạn đã đang được xử lý.");
		}
		if (account.getSellerStatus() == Account.SellerStatus.APPROVED) {
			return ResponseEntity.badRequest().body("Bạn đã là người bán rồi.");
		}

		// ✅ LOGIC MỚI: Chỉ cập nhật trạng thái, KHÔNG thay đổi vai trò
		account.setSellerStatus(Account.SellerStatus.PENDING);
		account.setRejectReason(null); // Xóa lý do từ chối cũ nếu có

		accountRepository.save(account);

		// ✅ THAY ĐỔI: Trả về thông báo thành công, KHÔNG trả về token mới
		return ResponseEntity.ok("Yêu cầu trở thành người bán đã được gửi thành công và đang chờ duyệt.");
	}
}
