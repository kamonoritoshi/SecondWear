//package com.sw.payos;
//
//import java.io.BufferedReader;
//
//import org.apache.commons.codec.digest.HmacAlgorithms;
//import org.apache.commons.codec.digest.HmacUtils;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.sw.dao.OrderRepository;
//import com.sw.entity.Order;
//
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@RequestMapping("/api/payment/payos")
//@RequiredArgsConstructor
//public class PayOSWebhookController {
//
//    private final OrderRepository orderRepository;
//    private final PayOSConfig config;
//    private final ObjectMapper objectMapper;
//
//    @PostMapping("/callback")
//    public ResponseEntity<String> handleCallback(HttpServletRequest request) throws Exception {
//        StringBuilder json = new StringBuilder();
//        try (BufferedReader reader = request.getReader()) {
//            String line;
//            while ((line = reader.readLine()) != null) {
//                json.append(line);
//            }
//        }
//
//        // Kiểm tra chữ ký
//        String xChecksum = request.getHeader("x-checksum");
//        String calculatedChecksum = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, config.getChecksumKey())
//                .hmacHex(json.toString());
//
//        if (!calculatedChecksum.equals(xChecksum)) {
//            return ResponseEntity.status(400).body("Invalid checksum");
//        }
//
//        PayOSWebhookPayload payload = objectMapper.readValue(json.toString(), PayOSWebhookPayload.class);
//
//        // Lấy orderId từ orderCode
//        Long orderId = Long.parseLong(payload.getOrderCode().replace("SW_", ""));
//        Order order = orderRepository.findById(orderId).orElse(null);
//
//        if (order == null) {
//            return ResponseEntity.status(404).body("Order not found");
//        }
//
//        // Cập nhật trạng thái đơn hàng
//        if ("SUCCESS".equals(payload.getStatus())) {
//            order.setStatus("Đã thanh toán");
//        } else {
//            order.setStatus("Thanh toán thất bại");
//        }
//
//        orderRepository.save(order);
//
//        return ResponseEntity.ok("Webhook processed");
//    }
//}
