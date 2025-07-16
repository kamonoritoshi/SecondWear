package com.sw.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.OrderRepository;
import com.sw.dao.ProductRepository;
import com.sw.entity.Account;
import com.sw.entity.Order;
import com.sw.entity.OrderItem;
import com.sw.entity.Product;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private AccountService accountService;
    @Autowired
    private ProductRepository productRepository;

    // Lấy tất cả đơn hàng
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Lấy đơn hàng theo ID
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    // Tạo đơn hàng mới
    public Order createOrder(Order order) {
        List<OrderItem> items = order.getItems();

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItem item : items) {
            Long productId = item.getProduct().getProductId(); // yêu cầu gửi lên đúng productId
            Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + productId));

            item.setPrice(product.getPrice()); // Gán giá từ DB
            item.setOrder(order);              // Set back-reference
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        order.setItems(items);
        order.setTotalAmount(total);
        order.setStatus("Đang xử lý"); // mặc định

        return orderRepository.save(order);
    }

    // Cập nhật đơn hàng
    public Order updateOrder(Long id, Order updatedOrder) {
        Order existing = orderRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setAccount(updatedOrder.getAccount());
        existing.setStatus(updatedOrder.getStatus());
        existing.setTotalAmount(updatedOrder.getTotalAmount());

        return orderRepository.save(existing);
    }

    // Xoá đơn hàng
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    // Lấy đơn hàng theo accountId
    public List<Order> getOrdersByAccount(Long accountId) {
    	return orderRepository.findByAccount_AccountId(accountId);
    }

    // Lấy đơn hàng theo status (chuỗi)
    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    // Lấy đơn hàng theo account + status
    public List<Order> getOrdersByAccountAndStatus(Long accountId, String status) {
        Account acc = new Account();
        acc.setAccountId(accountId);
        return orderRepository.findByAccountAndStatus(acc, status);
    }

    // Lấy tất cả đơn hàng, mới nhất trước
    public List<Order> getOrdersSortedByDateDesc() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }
    
    public Order updateOrderStatus(Long id, String status) {
        Order existing = orderRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setStatus(status);
        return orderRepository.save(existing);
    }
    
    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findOrdersBySellerId(sellerId);
    }
    
    public void save(Order order) {
        orderRepository.save(order);
    }
    
    public List<Order> findTop10ByOrderByCreatedAtDesc() {
        return orderRepository.findTop10ByOrderByOrderDateDesc();
    }


}
