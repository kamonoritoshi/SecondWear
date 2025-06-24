package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.OrderRepository;
import com.sw.entity.Account;
import com.sw.entity.Order;

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
        return oDAO.save(order);
    }

    // Cập nhật đơn hàng
    public Order updateOrder(Long id, Order updatedOrder) {
        Order existing = oDAO.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setAccount(updatedOrder.getAccount());
        existing.setProduct(updatedOrder.getProduct());
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
