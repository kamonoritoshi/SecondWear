package com.sw.vnpay;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sw.dao.OrderRepository;
import com.sw.entity.Order;
import com.sw.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class VNPayController {
	private final VNPayConfig config;
	@Autowired
	private final OrderRepository orderRepository;
	@Autowired
	private final VNPayService vnpayService;
	@Autowired
	private final PaymentService paymentService;
	
	@GetMapping("/vnpay/create")
	public ResponseEntity<?> createPayment(@RequestParam Long orderId, HttpServletRequest request) throws Exception {
	    // Lấy đơn hàng từ DB
	    Order order = orderRepository.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

	    if (!"Đang xử lý".equalsIgnoreCase(order.getStatus())) {
	        return ResponseEntity.badRequest().body("Đơn hàng không ở trạng thái Đang xử lý");
	    }

	    String vnp_TxnRef = order.getOrderId().toString();
	    String vnp_IpAddr = request.getRemoteAddr();
	    String vnp_CreateDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
	    String vnp_ExpireDate = LocalDateTime.now().plusMinutes(15).format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

	    Map<String, String> vnpParams = new HashMap<>();
	    vnpParams.put("vnp_Version", "2.1.0");
	    vnpParams.put("vnp_Command", "pay");
	    vnpParams.put("vnp_TmnCode", config.getTmnCode());
	    vnpParams.put("vnp_Amount", String.valueOf(order.getTotalAmount().multiply(BigDecimal.valueOf(100)).longValue())); // * 100
	    vnpParams.put("vnp_CurrCode", "VND");
	    vnpParams.put("vnp_TxnRef", vnp_TxnRef);
	    vnpParams.put("vnp_OrderInfo", "Thanh toán đơn hàng #" + vnp_TxnRef);
	    vnpParams.put("vnp_OrderType", "other");
	    vnpParams.put("vnp_Locale", "vn");
	    vnpParams.put("vnp_ReturnUrl", config.getReturnUrl());
	    vnpParams.put("vnp_IpAddr", vnp_IpAddr);
	    vnpParams.put("vnp_CreateDate", vnp_CreateDate);
	    vnpParams.put("vnp_ExpireDate", vnp_ExpireDate);

	    String paymentUrl = VNPayUtils.getPaymentUrl(vnpParams, config.getHashSecret(), config.getUrl());

	    return ResponseEntity.ok(Collections.singletonMap("paymentUrl", paymentUrl));
	}
	
	@GetMapping("/vnpay-return")
	public void handleVnPayReturn(HttpServletRequest request, HttpServletResponse response) {
	    try {
	        Map<String, String> params = VNPayUtils.getResponseData(request);
	        String vnp_SecureHash = params.remove("vnp_SecureHash");
	        params.remove("vnp_SecureHashType");

	        List<String> sortedKeys = new ArrayList<>(params.keySet());
	        Collections.sort(sortedKeys);

	        StringBuilder hashData = new StringBuilder();
	        for (int i = 0; i < sortedKeys.size(); i++) {
	            String key = sortedKeys.get(i);
	            String value = params.get(key);
	            hashData.append(key).append("=")
	                    .append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
	            if (i < sortedKeys.size() - 1) {
	                hashData.append("&");
	            }
	        }

	        String calculatedHash = VNPayUtils.hmacSHA512(config.getHashSecret(), hashData.toString());

	        if (!calculatedHash.equalsIgnoreCase(vnp_SecureHash)) {
	        	response.sendRedirect("http://localhost:5173/payment-fail?error=invalid-signature");
	        }

	        String responseCode = params.get("vnp_ResponseCode");
	        String txnRef = params.get("vnp_TxnRef");

	        Long orderId = Long.parseLong(txnRef);
	        Order order = orderRepository.findById(orderId)
	                        .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

	        if ("00".equals(responseCode)) {
	        	vnpayService.markOrderAsPaid(String.valueOf(orderId));
	        	if (paymentService.findByOrderId(orderId) == null) {
	                paymentService.createPayment(order, "VNPAY", "Đã thanh toán", order.getTotalAmount());
	            }
	        	response.sendRedirect("http://localhost:5173/payment-success?orderId=" + orderId + "&status=00");
	        } else {
	        	response.sendRedirect("http://localhost:5173/payment-fail?orderId=" + orderId + "&status=" + responseCode);
	        }

	    } catch (Exception e) {
	    	try {
	            response.sendRedirect("http://localhost:5173/payment-fail?error=" + URLEncoder.encode(e.getMessage(), "UTF-8"));
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }
	    }
	}

	private Map<String, String> getAllRequestParams(HttpServletRequest request) {
	    Map<String, String> result = new HashMap<>();
	    request.getParameterMap().forEach((key, values) -> {
	        if (values.length > 0) {
	            result.put(key, values[0]);
	        }
	    });
	    return result;
	}

}
