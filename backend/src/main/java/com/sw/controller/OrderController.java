package com.sw.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.OrderRepository;
import com.sw.dto.OrderWithPaymentDTO;
import com.sw.entity.Account;
import com.sw.entity.Order;
import com.sw.security.CustomUserDetails;
import com.sw.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderRepository orderRepository;

	@GetMapping
	public List<Order> getAllOrders() {
		return orderService.getAllOrders();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
		Order order = orderService.getOrderById(id);
		if (order == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(order);
	}

	@PostMapping
	public ResponseEntity<Order> createOrder(@RequestBody Order order,
			@AuthenticationPrincipal CustomUserDetails userDetails) {
		order.setAccount(userDetails.getAccount()); // ✅ gán user hiện tại
		return ResponseEntity.ok(orderService.createOrder(order));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
		Order updated = orderService.updateOrder(id, order);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
		orderService.deleteOrder(id);
		return ResponseEntity.noContent().build();
	}

	// Lấy đơn hàng theo tài khoản
	@GetMapping("/me")
    public List<OrderWithPaymentDTO> getMyOrders(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long accountId = userDetails.getAccount().getAccountId();
        return orderService.getOrdersByAccount(accountId);
    }

	// Lấy đơn hàng theo trạng thái
	// http://localhost:8080/status?status=Hoàn thành
	@GetMapping("/status")
	public List<Order> getOrdersByStatus(@RequestParam String status) {
		return orderService.getOrdersByStatus(status);
	}

	// Lấy đơn hàng theo tài khoản và trạng thái
	// http://localhost:8080/accounts/54/status?status=Đang xử lý
	@GetMapping("/accounts/{accountId}/status")
	public List<Order> getOrdersByAccountAndStatus(@PathVariable Long accountId, @RequestParam String status) {
		return orderService.getOrdersByAccountAndStatus(accountId, status);
	}

	// Lấy tất cả đơn hàng mới nhất trước
	@GetMapping("/sorted/latest")
	public List<Order> getAllOrdersSortedByDateDesc() {
		return orderService.getOrdersSortedByDateDesc();
	}

	@GetMapping("/processing")
	public ResponseEntity<?> getProcessingOrders(@AuthenticationPrincipal CustomUserDetails userDetails) {
		Account account = userDetails.getAccount();
		System.out.println("[OrderController] → Processing orders for account ID: " + account.getAccountId());
		List<Order> orders = orderRepository.findByAccountAndStatus(account, "Đang xử lý");
		System.out.println("[OrderController] → Found " + orders.size() + " orders.");
		for (Order o : orders) {
			System.out.println("→ Order: ID=" + o.getOrderId() + ", status=" + o.getStatus());
		}

		List<Map<String, Object>> result = orders.stream().map(order -> {
			Map<String, Object> map = new HashMap<>();
			map.put("orderId", order.getOrderId());
			map.put("totalAmount", order.getTotalAmount());
			return map;
		}).collect(Collectors.toList());

		return ResponseEntity.ok(result);
	}
}
