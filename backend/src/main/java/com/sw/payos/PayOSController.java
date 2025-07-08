package com.sw.payos;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

	private final PayOSConfig config;
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
        request.setAmount(order.getTotalAmount().intValue());
        request.setOrderCode(orderId); // Sử dụng orderId làm orderCode
        request.setDescription("Thanh toán đơn hàng #" + orderId);
        request.setReturnUrl(config.getReturnUrl()); // Thay bằng URL công khai
        request.setCancelUrl(config.getCancelUrl()); // Thay bằng URL công khai
        request.setItems(payOSService.buildItemsFromOrder(order));
        request.setBuyerName(order.getAccount().getUser().getName());
        request.setBuyerEmail(order.getAccount().getUser().getEmail());
        request.setBuyerPhone(order.getAccount().getUser().getPhone());
        
        try {
            String checkoutUrl = payOSService.createOrGetPaymentLink(request);
            return ResponseEntity.ok(checkoutUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Tạo liên kết thanh toán thất bại: " + e.getMessage());
        }
    }
    
    @GetMapping("/return")
    public ResponseEntity<String> paymentReturn(@RequestParam Map<String, String> params) {
        StringBuilder sb = new StringBuilder();
        sb.append("<script>");
        sb.append("localStorage.setItem('payos_result', `" + params.toString() + "`);");
        sb.append("window.location.href = '/test_payos.html';");
        sb.append("</script>");
        return ResponseEntity.ok().body(sb.toString());
    }

    @GetMapping("/cancel")
    public ResponseEntity<String> paymentCancel() {
        StringBuilder sb = new StringBuilder();
        sb.append("<script>");
        sb.append("localStorage.setItem('payos_result', 'Thanh toán đã bị hủy bởi người dùng.');");
        sb.append("window.location.href = '/test_payos.html';");
        sb.append("</script>");
        return ResponseEntity.ok().body(sb.toString());
    }
}