package com.sw.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.sw.entity.Order;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderWithPaymentDTO {
	
	public OrderWithPaymentDTO(Order order, String paymentMethod) {
        this.orderId = order.getOrderId();
        this.orderDate = order.getOrderDate();
        this.totalAmount = order.getTotalAmount();
        this.status = order.getStatus();
        this.paymentMethod = paymentMethod;
    }
	
	private Long orderId;
	private LocalDateTime orderDate;
	private BigDecimal totalAmount;
	private String status;
	private String paymentMethod;
}
