package com.sw.dto.admin;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminOrderResponse {
    private Long orderId;
    private String status;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String customerName;
}