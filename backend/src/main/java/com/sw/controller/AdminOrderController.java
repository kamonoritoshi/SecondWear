package com.sw.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.OrderRepository;
import com.sw.dto.AdminOrderResponse;
import com.sw.entity.Order;
import com.sw.service.OrderService;

@RestController
public class AdminOrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderRepository orderRepository;
	
	// Cập nhật trạng thái đơn hàng
	// http://localhost:8080/54/status?status=Đang xử lý
	@PutMapping("/{id}/status")
	public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
		Order updatedOrder = orderService.updateOrderStatus(id, status);
		if (updatedOrder == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(updatedOrder);
	}
	
	@GetMapping("/api/admin/orders/recent")
	public ResponseEntity<List<AdminOrderResponse>> getRecentOrders() {
	    List<Order> recentOrders = orderRepository.findTop10ByOrderByOrderDateDesc();
	    
	    List<AdminOrderResponse> response = recentOrders.stream().map(order -> {
	        String customerName = order.getAccount() != null && order.getAccount().getUser() != null
	                ? order.getAccount().getUser().getName()
	                : "N/A";

	        return new AdminOrderResponse(
	                order.getOrderId(),
	                order.getStatus(),
	                order.getOrderDate(),
	                order.getTotalAmount(),
	                customerName
	        );
	    }).collect(Collectors.toList());

	    return ResponseEntity.ok(response);
	}

}
