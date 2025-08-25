package com.sw.payos;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

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

    @Value("${frontend.url}")
    private String frontendUrl;
    
    @PostMapping("/payos/create")
    public ResponseEntity<?> createPayment(@RequestParam Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            return ResponseEntity.status(404).body("Không tìm thấy đơn hàng với ID: " + orderId);
        }
        
        if (order.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
            return ResponseEntity.status(400).body("Đơn hàng có tổng tiền không hợp lệ.");
        }
        
        // 1. Lấy cancelUrl gốc từ config
        String baseCancelUrl = config.getCancelUrl(); 

        // 2. Thêm orderId vào làm query parameter cho cancelUrl
        String dynamicCancelUrl = UriComponentsBuilder.fromHttpUrl(baseCancelUrl)
                .queryParam("orderId", orderId)
                .toUriString();

        PayOSRequest request = new PayOSRequest();
        request.setAmount(order.getTotalAmount().intValue());
        request.setOrderCode(orderId); // Sử dụng orderId làm orderCode
        request.setDescription("Thanh toán đơn hàng #" + orderId);
        request.setReturnUrl(config.getReturnUrl()); // Thay bằng URL công khai
        request.setCancelUrl(dynamicCancelUrl);  // Thay bằng URL công khai
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
    
    /**
     * API này được PayOS gọi khi thanh toán thành công.
     * Nó sẽ điều hướng (redirect) trình duyệt của người dùng về trang thành công trên frontend,
     * kèm theo tất cả các tham số mà PayOS gửi về.
     */
    @GetMapping("/return")
    public ResponseEntity<Void> paymentReturn(@RequestParam Map<String, String> params) {
        // Xây dựng URL của trang thành công trên frontend
        String successPageUrl = frontendUrl + "/payment-success";

        // Thêm tất cả các tham số nhận được từ PayOS vào URL để React có thể đọc
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(successPageUrl);
        params.forEach(uriBuilder::queryParam);

        // Tạo response redirect (mã 302)
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriBuilder.build().toUri());
        
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    /**
     * API này được PayOS gọi khi người dùng hủy thanh toán.
     * Nó sẽ điều hướng (redirect) trình duyệt về trang thất bại trên frontend.
     */
    @GetMapping("/cancel")
    public ResponseEntity<Void> paymentCancel(@RequestParam Map<String, String> params) {
        // Xây dựng URL của trang thất bại trên frontend
        String cancelPageUrl = frontendUrl + "/payment-fail";

        // Thêm các tham số cần thiết (orderId và thông báo lỗi) vào URL
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(cancelPageUrl);
        
        String orderId = params.getOrDefault("orderId", "Không rõ");
        uriBuilder.queryParam("orderId", orderId);
        uriBuilder.queryParam("error", "Thanh toán đã bị hủy bởi người dùng.");

        // Tạo response redirect (mã 302)
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriBuilder.build().toUri());

        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
}