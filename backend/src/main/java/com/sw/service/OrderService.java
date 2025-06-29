package com.sw.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.OrderRepository;
import com.sw.entity.Account;
import com.sw.entity.Order;
import com.sw.entity.OrderItem;

@Service
public class OrderService {

    @Autowired
    private OrderRepository oDAO;
    
    @Autowired
    private AccountService accountService;

    // Lấy tất cả đơn hàng
    public List<Order> getAllOrders() {
        return oDAO.findAll();
    }

    // Lấy đơn hàng theo ID
    public Order getOrderById(Long id) {
        return oDAO.findById(id).orElse(null);
    }

    // Tạo đơn hàng mới
    public Order createOrder(Order order) {
    	// Gắn lại quan hệ cho từng item
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);

            if (item.getProduct() != null && item.getQuantity() != null) {
                BigDecimal price = item.getProduct().getPrice();
                item.setPrice(price); // gắn giá sản phẩm tại thời điểm đặt
                total = total.add(price.multiply(BigDecimal.valueOf(item.getQuantity())));
            }
        }

        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(total);
        order.setStatus(order.getStatus() == null ? "pending" : order.getStatus());

        return oDAO.save(order); // Cascade sẽ tự lưu OrderItem
    }

    // Cập nhật đơn hàng
    public Order updateOrder(Long id, Order updatedOrder) {
        Order existing = oDAO.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setAccount(updatedOrder.getAccount());
        existing.setStatus(updatedOrder.getStatus());
        existing.setTotalAmount(updatedOrder.getTotalAmount());

        return oDAO.save(existing);
    }

    // Xoá đơn hàng
    public void deleteOrder(Long id) {
        oDAO.deleteById(id);
    }

    // Lấy đơn hàng theo accountId
    public List<Order> getOrdersByAccount(Long accountId) {
        Account acc = accountService.getAccountById(accountId); // lấy thật từ DB
        if (acc == null) return List.of();
        return oDAO.findByAccount(acc);
    }

    // Lấy đơn hàng theo status (chuỗi)
    public List<Order> getOrdersByStatus(String status) {
        return oDAO.findByStatus(status);
    }

    // Lấy đơn hàng theo account + status
    public List<Order> getOrdersByAccountAndStatus(Long accountId, String status) {
        Account acc = new Account();
        acc.setAccountId(accountId);
        return oDAO.findByAccountAndStatus(acc, status);
    }

    // Lấy tất cả đơn hàng, mới nhất trước
    public List<Order> getOrdersSortedByDateDesc() {
        return oDAO.findAllByOrderByOrderDateDesc();
    }
}
