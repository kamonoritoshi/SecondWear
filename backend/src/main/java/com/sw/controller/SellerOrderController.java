package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.entity.Order;
import com.sw.entity.OrderItem;
import com.sw.security.CustomUserDetails;
import com.sw.service.OrderService;

@RestController
@RequestMapping("/api/seller/orders")
public class SellerOrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping
    public ResponseEntity<List<Order>> getOrders(@AuthenticationPrincipal CustomUserDetails user) {
        Long sellerId = user.getAccount().getAccountId();
        List<Order> orders = orderService.getOrdersBySeller(sellerId);
        return ResponseEntity.ok(orders);
    }

    // ✅ Xem chi tiết 1 đơn hàng
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetail(@PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    // ✅ Cập nhật trạng thái 1 sản phẩm trong đơn hàng
    @PutMapping("/{orderId}/items/{itemId}/status")
    public ResponseEntity<?> updateOrderItemStatus(
            @PathVariable Long orderId,
            @PathVariable Long itemId,
            @RequestBody String newStatus
    ) {
        Order order = orderService.getOrderById(orderId);
        if (order == null) return ResponseEntity.notFound().build();

        OrderItem item = order.getItems().stream()
                .filter(i -> i.getOrderItemId().equals(itemId))
                .findFirst()
                .orElse(null);

        if (item == null) return ResponseEntity.notFound().build();

        item.setStatus(newStatus);
        orderService.save(order); // cần viết thêm `save` trong service

        return ResponseEntity.ok("Đã cập nhật trạng thái");
    }
}
