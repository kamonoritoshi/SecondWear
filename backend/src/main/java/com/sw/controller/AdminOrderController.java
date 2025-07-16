package com.sw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.entity.Order;
import com.sw.service.OrderService;

@RestController
public class AdminOrderController {
	@Autowired
	private OrderService orderService;
	
	// Cập nhật trạng thái đơn hàng
	// http://localhost:8080/54/status?status=Đang xử lý
	@PutMapping("/{id}/status")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
		Order updatedOrder = orderService.updateOrderStatus(id, status);
		if (updatedOrder == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(updatedOrder);
	}
}
