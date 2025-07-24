package com.sw.controller;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @GetMapping("/dashboard")
    public ResponseEntity<?> getSellerDashboard(@AuthenticationPrincipal CustomUserDetails user) {
        Long sellerId = user.getAccount().getAccountId();
        List<Order> orders = orderService.getOrdersBySeller(sellerId);

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        LocalDate startOfMonth = today.withDayOfMonth(1);

        double totalRevenue = 0;
        double todayRevenue = 0;
        double thisWeekRevenue = 0;
        double thisMonthRevenue = 0;
        int totalOrders = 0;

        for (Order order : orders) {
            if (!"COMPLETED".equalsIgnoreCase(order.getStatus())) continue;

            double amount = order.getTotalAmount().doubleValue();
            LocalDate orderDate = order.getOrderDate().toLocalDate(); // Đảm bảo có hàm này

            totalRevenue += amount;
            totalOrders++;

            if (orderDate.equals(today)) todayRevenue += amount;
            if (!orderDate.isBefore(startOfWeek)) thisWeekRevenue += amount;
            if (!orderDate.isBefore(startOfMonth)) thisMonthRevenue += amount;
        }

        Map<String, Object> data = new HashMap<>();
        data.put("totalOrders", totalOrders);
        data.put("totalRevenue", totalRevenue);
        data.put("todayRevenue", todayRevenue);
        data.put("thisWeekRevenue", thisWeekRevenue);
        data.put("thisMonthRevenue", thisMonthRevenue);

        return ResponseEntity.ok(data);
    }

}
