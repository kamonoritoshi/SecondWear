package com.sw.controller;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.OrderRepository;
import com.sw.dto.admin.RecentOrderDTO;
import com.sw.entity.Order;
import com.sw.entity.OrderItem;
import com.sw.security.CustomUserDetails;
import com.sw.service.OrderService;

@RestController
@RequestMapping("/api/seller/orders")
public class SellerOrderController {
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderRepository orderRepository;

	@GetMapping
	public ResponseEntity<?> getOrders(@AuthenticationPrincipal CustomUserDetails user) {
	    try {
	        Long sellerId = user.getAccount().getAccountId();
	        List<Order> orders = orderService.getOrdersBySeller(sellerId);

	        List<Map<String, Object>> result = orders.stream().map(order -> {
	            Map<String, Object> map = new HashMap<>();
	            map.put("orderId", order.getOrderId());
	            map.put("status", order.getStatus());
	            map.put("orderDate", order.getOrderDate());
	            map.put("totalAmount", order.getTotalAmount());
	            return map;
	        }).collect(Collectors.toList());

	        return ResponseEntity.ok(result);
	    } catch (Exception e) {
	        e.printStackTrace(); // ✅ In ra lỗi thật sự
	        return ResponseEntity.status(500).body("Lỗi Server: " + e.getMessage());
	    }
	}


	// ✅ Xem chi tiết 1 đơn hàng
	@GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderDetail(@PathVariable Long orderId) {
		Order order = orderService.getOrderById(orderId);
		return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
	}
	
	@PutMapping("/{orderId}/status")
	public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> body) {
	    String newStatus = body.get("status");
	    Order updated = orderService.updateOrderStatus(orderId, newStatus);
	    return updated != null ? ResponseEntity.ok("Đã cập nhật trạng thái") : ResponseEntity.notFound().build();
	}


	// ✅ Cập nhật trạng thái 1 sản phẩm trong đơn hàng
	@PutMapping("/{orderId}/items/{itemId}/status")
	public ResponseEntity<?> updateOrderItemStatus(@PathVariable Long orderId, @PathVariable Long itemId,
			@RequestBody String newStatus) {
		Order order = orderService.getOrderById(orderId);
		if (order == null)
			return ResponseEntity.notFound().build();

		OrderItem item = order.getItems().stream().filter(i -> i.getOrderItemId().equals(itemId)).findFirst()
				.orElse(null);

		if (item == null)
			return ResponseEntity.notFound().build();

		item.setStatus(newStatus);
		orderService.save(order); // cần viết thêm `save` trong service

		return ResponseEntity.ok("Đã cập nhật trạng thái");
	}

	@GetMapping("/dashboard")
	public ResponseEntity<?> getSellerDashboard(@AuthenticationPrincipal CustomUserDetails user) {
		Long sellerId = user.getAccount().getAccountId();
		List<Order> orders = orderService.getOrdersBySeller(sellerId);

		LocalDate today = LocalDate.now();
		LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
		LocalDate startOfMonth = today.withDayOfMonth(1);

		int totalOrders = orders.size(); // Tính tất cả đơn hàng của seller
		double totalRevenue = 0;
		double todayRevenue = 0;
		double thisWeekRevenue = 0;
		double thisMonthRevenue = 0;

		for (Order order : orders) {
			// Doanh thu chỉ tính nếu COMPLETED
			if ("Hoàn thành".equalsIgnoreCase(order.getStatus()) || "Đã giao".equalsIgnoreCase(order.getStatus())) {
				double amount = order.getTotalAmount().doubleValue();
				LocalDate orderDate = order.getOrderDate().toLocalDate();

				totalRevenue += amount;

				if (orderDate.equals(today))
					todayRevenue += amount;
				if (!orderDate.isBefore(startOfWeek))
					thisWeekRevenue += amount;
				if (!orderDate.isBefore(startOfMonth))
					thisMonthRevenue += amount;
			}
		}

		Map<String, Object> data = new HashMap<>();
		data.put("totalOrders", totalOrders);
		data.put("totalRevenue", totalRevenue);
		data.put("todayRevenue", todayRevenue);
		data.put("thisWeekRevenue", thisWeekRevenue);
		data.put("thisMonthRevenue", thisMonthRevenue);

		return ResponseEntity.ok(data);
	}
	
	  @GetMapping("/recent")
	  public ResponseEntity<?> getRecentOrders(@AuthenticationPrincipal CustomUserDetails user) {
	      Long sellerId = user.getAccount().getAccountId();
	      List<RecentOrderDTO> recentOrders = orderService.getRecentOrders(sellerId);
	      return ResponseEntity.ok(recentOrders);
	  }

	  @GetMapping("/revenue/monthly")
	    public ResponseEntity<?> getMonthlyRevenue(@AuthenticationPrincipal CustomUserDetails user) {
	        Long sellerId = user.getAccount().getAccountId();
	        List<Object[]> results = orderService.getMonthlyRevenueBySeller(sellerId);

	        List<Map<String, Object>> response = new ArrayList<>();
	        for (Object[] row : results) {
	            Map<String, Object> item = new HashMap<>();
	            item.put("month", row[0]);  // dạng "2025-07"
	            item.put("totalRevenue", row[1]);
	            response.add(item);
	        }

	        return ResponseEntity.ok(response);
	    }
	  @GetMapping("/revenue/weekly")
	  public ResponseEntity<?> getWeeklyRevenue(@AuthenticationPrincipal CustomUserDetails user) {
	      Long sellerId = user.getAccount().getAccountId();
	      List<Map<String, Object>> response = orderService.getWeeklyRevenue(sellerId);
	      return ResponseEntity.ok(response);
	  }
	  
	  @GetMapping("/rate")
	  public ResponseEntity<?> getOrderRates(@AuthenticationPrincipal CustomUserDetails user) {
	      Long sellerId = user.getAccount().getAccountId();
	      List<Map<String, Object>> rates = orderService.getOrderRates(sellerId);
	      return ResponseEntity.ok(rates);
	  }
}
