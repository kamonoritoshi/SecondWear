package com.sw.vnpay;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.OrderRepository;
import com.sw.entity.Order;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VNPayService {

    private final VNPayConfig config;
    @Autowired
    private OrderRepository orderRepository;
    
    public void markOrderAsPaid(String orderId) {
        Order order = orderRepository.findById(Long.parseLong(orderId))
            .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        order.setStatus("Hoàn thành");
        orderRepository.save(order);
    }

    public String createPaymentUrl(Order order) throws Exception {
        // Chỉ tạo link nếu đơn hàng đang ở trạng thái "Đang xử lý"
        if (!"Đang xử lý".equalsIgnoreCase(order.getStatus())) {
            throw new IllegalStateException("Đơn hàng không ở trạng thái 'Đang xử lý'");
        }

        String vnp_TxnRef = order.getOrderId().toString();
        String vnp_CreateDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String vnp_ExpireDate = LocalDateTime.now().plusMinutes(15).format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        Map<String, String> vnpParams = new HashMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", config.getTmnCode());
        vnpParams.put("vnp_Amount", String.valueOf(order.getTotalAmount().multiply(BigDecimal.valueOf(100)).longValue()));
        vnpParams.put("vnp_CurrCode", "VND");
        vnpParams.put("vnp_TxnRef", vnp_TxnRef);
        vnpParams.put("vnp_OrderInfo", "Thanh toán đơn hàng #" + vnp_TxnRef);
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_ReturnUrl", config.getReturnUrl());
        vnpParams.put("vnp_IpAddr", "127.0.0.1"); // IP tạm, có thể thay bằng request.getRemoteAddr()
        vnpParams.put("vnp_CreateDate", vnp_CreateDate);
        vnpParams.put("vnp_ExpireDate", vnp_ExpireDate);

        return VNPayUtils.getPaymentUrl(vnpParams, config.getHashSecret(), config.getUrl());
    }
}