package com.sw.controller;

import com.sw.entity.Order;
import com.sw.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Lấy tất cả đơn hàng
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Lấy đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    // Tạo đơn hàng mới
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    // Cập nhật đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        Order updated = orderService.updateOrder(id, order);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // Xoá đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    // Lấy đơn hàng theo tài khoản
    @GetMapping("/account/{accountId}")
    public List<Order> getOrdersByAccount(@PathVariable Long accountId) {
        return orderService.getOrdersByAccount(accountId);
    }

    // Lấy đơn hàng theo trạng thái
    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable String status) {
        return orderService.getOrdersByStatus(status);
    }

    // Lấy đơn hàng theo tài khoản và trạng thái
    @GetMapping("/account/{accountId}/status/{status}")
    public List<Order> getOrdersByAccountAndStatus(@PathVariable Long accountId, @PathVariable String status) {
        return orderService.getOrdersByAccountAndStatus(accountId, status);
    }

    // Lấy tất cả đơn hàng mới nhất trước
    @GetMapping("/sorted/latest")
    public List<Order> getAllOrdersSortedByDateDesc() {
        return orderService.getOrdersSortedByDateDesc();
    }
}
