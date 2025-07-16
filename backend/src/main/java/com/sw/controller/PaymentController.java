package com.sw.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.OrderRepository;
import com.sw.entity.Order;
import com.sw.entity.Payment;
import com.sw.payos.PayOSConfig;
import com.sw.payos.PayOSRequest;
import com.sw.payos.PayOSService;
import com.sw.security.CustomUserDetails;
import com.sw.service.PaymentService;
import com.sw.vnpay.VNPayService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private VNPayService vnpayService;
	@Autowired
	private PayOSConfig payosConfig;
	@Autowired
	private PayOSService payosService;
	
	@GetMapping
	public List<Payment> getAllPayments() {
		return paymentService.getAllPayments();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
		Payment payment = paymentService.getPaymentById(id);
		if (payment == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(payment);
	}

	@PostMapping
	public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
		return ResponseEntity.ok(paymentService.createPayment(payment));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
		Payment updated = paymentService.updatePayment(id, payment);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
		paymentService.deletePayment(id);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createPaymentRedirect(
	        @RequestBody Map<String, String> body,
	        @AuthenticationPrincipal CustomUserDetails userDetails) {

	    String method = body.get("method");
	    Long orderId;

	    try {
	        orderId = Long.parseLong(body.get("orderId"));
	    } catch (NumberFormatException e) {
	        return ResponseEntity.badRequest().body("orderId không hợp lệ");
	    }

	    // Lấy đơn hàng
	    Optional<Order> optionalOrder = orderRepository.findById(orderId);
	    if (optionalOrder.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đơn hàng không tồn tại");
	    }

	    Order order = optionalOrder.get();

	    // Kiểm tra đơn hàng thuộc về người dùng hiện tại
	    if (!order.getAccount().getAccountId().equals(userDetails.getAccount().getAccountId())) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền thanh toán đơn hàng này");
	    }

	    try {
	        switch (method.toUpperCase()) {
	            case "COD":
	                order.setStatus("Đang xử lý");
	                orderRepository.save(order);
	                return ResponseEntity.ok(Map.of("paymentUrl", "/orders"));

	            case "VNPAY":
	                String vnpUrl = vnpayService.createPaymentUrl(order); // Cần đảm bảo vnpayService tồn tại
	                return ResponseEntity.ok(Map.of("paymentUrl", vnpUrl));

	            case "PAYOS":
	                PayOSRequest payOSRequest = new PayOSRequest();
	                payOSRequest.setOrderCode(order.getOrderId()); // orderId = orderCode
	                payOSRequest.setAmount(order.getTotalAmount().intValue());
	                payOSRequest.setDescription("Thanh toán đơn hàng #" + order.getOrderId());
	                payOSRequest.setReturnUrl(payosConfig.getReturnUrl());
	                payOSRequest.setCancelUrl(payosConfig.getCancelUrl());
	                payOSRequest.setItems(payosService.buildItemsFromOrder(order));
	                payOSRequest.setBuyerName(order.getAccount().getUser().getName());
	                payOSRequest.setBuyerEmail(order.getAccount().getUser().getEmail());
	                payOSRequest.setBuyerPhone(order.getAccount().getUser().getPhone());

	                String payosUrl = payosService.createOrGetPaymentLink(payOSRequest);
	                return ResponseEntity.ok(Map.of("paymentUrl", payosUrl));

	            default:
	                return ResponseEntity.badRequest().body("Phương thức thanh toán không hợp lệ");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi tạo thanh toán: " + e.getMessage());
	    }
	}


}
