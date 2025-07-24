package com.sw.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.OrderRepository;
import com.sw.dto.admin.AdminStatisticsResponse;
import com.sw.dto.admin.OrderRateDTO;
import com.sw.dto.admin.RecentOrderDTO;
import com.sw.dto.admin.RevenueByMonthDTO;
import com.sw.entity.Account;
import com.sw.entity.Order;
import com.sw.service.AccountService;
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

	// Dashboard

	@GetMapping("/statistics")
	public AdminStatisticsResponse getStatistics() {
		return statisticsService.getAdminStatistics();
	}

	@GetMapping("/revenue/monthly")
	public List<RevenueByMonthDTO> getRevenueByMonth() {
		return orderService.getMonthlyRevenue();
	}

	@GetMapping("/orders/rate")
	public List<OrderRateDTO> getOrderRates() {
		return orderService.getOrderStatusRate();
	}

	@GetMapping("/orders/recent")
	public List<RecentOrderDTO> getRecentOrders() {
		List<Order> orders = orderRepository.findTop10ByOrderByOrderDateDesc();
		return orders.stream().map(order -> {
			RecentOrderDTO dto = new RecentOrderDTO();
			dto.setOrderId(order.getOrderId());
			dto.setCustomerName(order.getAccount().getUser().getName()); // hoặc .getUsername()
			dto.setStatus(order.getStatus());
			dto.setOrderDate(order.getOrderDate());
			dto.setTotalAmount(order.getTotalAmount());
			return dto;
		}).collect(Collectors.toList());
	}

	// Account

	// Lấy danh sách tài khoản (có lọc)
	@GetMapping("/accounts")
	public Page<Account> getAccounts(@RequestParam(required = false) String role,
			@RequestParam(required = false) String status, @RequestParam(required = false) String keyword,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
		return accountService.getAccountsFiltered(role, status, keyword, page, size);
	}

	// Vô hiệu hóa tài khoản
	@PutMapping("/accounts/{id}/disable")
	public ResponseEntity<?> disableAccount(@PathVariable Long id) {
		accountService.updateAccountStatus(id, "inactive");
		return ResponseEntity.ok().build();
	}

	// Khôi phục tài khoản
	@PutMapping("/accounts/{id}/enable")
	public ResponseEntity<?> enableAccount(@PathVariable Long id) {
		accountService.updateAccountStatus(id, "active");
		return ResponseEntity.ok().build();
	}

	// Đặt lại mật khẩu
	@PutMapping("/accounts/{id}/reset-password")
	public ResponseEntity<?> resetPassword(@PathVariable Long id) {
		accountService.resetPassword(id);
		return ResponseEntity.ok("Đặt lại mật khẩu thành công.");
	}
}
