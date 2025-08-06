package com.sw.controller;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.AccountRepository;
import com.sw.dao.OrderRepository;
import com.sw.dto.admin.AdminStatisticsResponse;
import com.sw.dto.admin.CustomerResponse;
import com.sw.dto.admin.OrderAdminDTO;
import com.sw.dto.admin.OrderRateDTO;
import com.sw.dto.admin.RecentOrderDTO;
import com.sw.dto.admin.RevenueByMonthDTO;
import com.sw.dto.admin.SellerInfoDTO;
import com.sw.dto.admin.SellerRequestDTO;
import com.sw.dto.admin.TopProductDTO;
import com.sw.entity.Account;
import com.sw.entity.Order;
import com.sw.service.AccountService;
import com.sw.service.AdminSellerService;
import com.sw.service.AdminStatisticsService;
import com.sw.service.OrderService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private AdminStatisticsService statisticsService;

	@Autowired
	private OrderService orderService;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private AccountService accountService;

	@Autowired
	private AccountRepository accountRepository; // ✅ Thêm nếu cần dùng
	
	@Autowired
	private AdminSellerService adminSellerService;

	// Dashboard
	@GetMapping("/statistics")
	public AdminStatisticsResponse getStatistics() {
		return statisticsService.getAdminStatistics();
	}

	@GetMapping("/revenue/monthly")
	public List<RevenueByMonthDTO> getRevenueByMonth() {
		return orderService.getMonthlyRevenue();
	}

	@GetMapping("/statistics/top-products")
	public List<TopProductDTO> getTopSellingProducts() {
		return orderService.getTopSellingProducts();
	}

	@GetMapping("/orders/rate")
	public List<OrderRateDTO> getOrderRates() {
		return orderService.getOrderStatusRate();
	}

	@GetMapping("/orders/recent")
	public List<RecentOrderDTO> getRecentOrders() {
		List<Order> orders = orderRepository.findTop5ByOrderByOrderDateDesc();
		return orders.stream().map(order -> {
			RecentOrderDTO dto = new RecentOrderDTO();
			dto.setOrderId(order.getOrderId());
			dto.setCustomerName(order.getAccount().getUser().getName());
			dto.setStatus(order.getStatus());
			dto.setOrderDate(order.getOrderDate());
			dto.setTotalAmount(order.getTotalAmount());
			return dto;
		}).collect(Collectors.toList());
	}

	// Account - Tùy chọn: giữ lại hoặc xóa nếu không cần
	@GetMapping("/accounts/all")
	public List<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	@GetMapping("/accounts")
	public Page<Account> getAccounts(@RequestParam(required = false) String role,
			@RequestParam(required = false) String status, @RequestParam(required = false) String keyword,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
		return accountService.getAccountsFiltered(role, status, keyword, page, size);
	}

	@PutMapping("/accounts/{id}/disable")
	public ResponseEntity<?> disableAccount(@PathVariable Long id) {
		accountService.updateAccountStatus(id, "inactive");
		return ResponseEntity.ok().build();
	}

	@PutMapping("/accounts/{id}/enable")
	public ResponseEntity<?> enableAccount(@PathVariable Long id) {
		accountService.updateAccountStatus(id, "active");
		return ResponseEntity.ok().build();
	}

	@PutMapping("/accounts/{id}/reset-password")
	public ResponseEntity<?> resetPassword(@PathVariable Long id) {
		accountService.resetPassword(id);
		return ResponseEntity.ok("Đặt lại mật khẩu thành công.");
	}

	// Order

	@GetMapping("/orders")
	public ResponseEntity<List<OrderAdminDTO>> getAllOrders() {
		List<Order> orders = orderRepository.findAll();

		List<OrderAdminDTO> dtos = orders.stream().map(order -> {
			String customerName = order.getAccount() != null ? order.getAccount().getUser().getName() : "Ẩn danh";

			// Lấy danh sách tên người bán từ từng item
			String sellerNames = order.getItems().stream()
					.map(item -> item.getProduct().getAccount().getUser().getName()).filter(Objects::nonNull).distinct()
					.collect(Collectors.joining(", "));

			// ✅ Lấy trạng thái thanh toán từ bảng Payment
			String paymentStatus = order.getPayment() != null ? order.getPayment().getStatus() : "Chưa thanh toán";

			return new OrderAdminDTO(order.getOrderId(), customerName, sellerNames, order.getOrderDate(),
					order.getTotalAmount(), order.getStatus(), paymentStatus);
		}).collect(Collectors.toList());

		return ResponseEntity.ok(dtos);
	}

	// --- Seller Registration Request APIs ---

	@GetMapping("/seller-requests")
	public List<SellerRequestDTO> getPendingSellerRequests() {
		return accountRepository.findBySellerStatus(Account.SellerStatus.PENDING).stream().map(SellerRequestDTO::from)
				.collect(Collectors.toList());
	}

	@PutMapping("/seller-requests/{id}/approve")
	public ResponseEntity<?> approveSellerRequest(@PathVariable Long id) {
		Account account = accountRepository.findById(id).orElseThrow();
		account.setSellerStatus(Account.SellerStatus.APPROVED);
		account.setRejectReason(null);
		accountRepository.save(account);
		return ResponseEntity.ok("Phê duyệt thành công.");
	}

	@PutMapping("/seller-requests/{id}/reject")
	public ResponseEntity<?> rejectSellerRequest(@PathVariable Long id, @RequestParam String reason) {
		if (reason == null || reason.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Vui lòng nhập lý do từ chối.");
		}
		Account account = accountRepository.findById(id).orElseThrow();
		account.setSellerStatus(Account.SellerStatus.REJECTED);
		account.setRejectReason(reason);
		accountRepository.save(account);
		return ResponseEntity.ok("Từ chối thành công.");
	}

	// --- Seller Management APIs ---

	@GetMapping("/sellers")
	public List<SellerInfoDTO> getAllSellers() {
		return adminSellerService.getAllApprovedSellers();
	}

	@PostMapping("/sellers/{id}/suspend")
	public ResponseEntity<?> suspendSeller(@PathVariable Long id) {
		adminSellerService.suspendSeller(id);
		return ResponseEntity.ok("Đã tạm ngưng người bán.");
	}

	@PostMapping("/sellers/{id}/restore")
	public ResponseEntity<?> restoreSeller(@PathVariable Long id) {
		adminSellerService.restoreSeller(id);
		return ResponseEntity.ok("Đã khôi phục người bán.");
	}
	
	@GetMapping("/customers")
	public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
	    List<CustomerResponse> customers = accountService.getAllCustomers();
	    return ResponseEntity.ok(customers);
	}

	@PutMapping("/customers/{id}/disable")
	public ResponseEntity<?> disableCustomer(@PathVariable Long id) {
	    accountService.updateAccountStatus(id, "INACTIVE");
	    return ResponseEntity.ok("Đã tạm ngưng tài khoản khách hàng.");
	}

	@PutMapping("/customers/{id}/enable")
	public ResponseEntity<?> enableCustomer(@PathVariable Long id) {
	    accountService.updateAccountStatus(id, "ACTIVE");
	    return ResponseEntity.ok("Đã khôi phục tài khoản khách hàng.");
	}
}
