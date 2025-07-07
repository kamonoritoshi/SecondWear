package com.sw.payos;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.OrderRepository;
import com.sw.entity.Order;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PayOSController {

    private final PayOSService payOSService;
    private final OrderRepository orderRepository;

    @PostMapping("/payos/create")
    public ResponseEntity<?> createPayment(@RequestParam Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            return ResponseEntity.status(404).body("Không tìm thấy đơn hàng với ID: " + orderId);
        }
        
        if (order.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
            return ResponseEntity.status(400).body("Đơn hàng có tổng tiền không hợp lệ.");
        }

        PayOSRequest request = new PayOSRequest();
        request.setAmount(order.getTotalAmount().intValue()); // lấy từ đơn hàng
        request.setOrderCode("SW_" + orderId+ "_" + System.currentTimeMillis());
        request.setDescription("Thanh toán đơn hàng #" + orderId);
        request.setReturnUrl("http://localhost:3000/payment/result"); // hoặc frontend bạn
        request.setCancelUrl("http://localhost:3000/payment/cancel");
        request.setWebhookUrl("https://your-ngrok-url/api/payment/payos/callback");
        request.setItems(List.of("SecondWear Order #" + orderId));

        try {
            String checkoutUrl = payOSService.createPaymentLink(request);
            return ResponseEntity.ok(checkoutUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Tạo liên kết thanh toán thất bại: " + e.getMessage());
        }
    }
}