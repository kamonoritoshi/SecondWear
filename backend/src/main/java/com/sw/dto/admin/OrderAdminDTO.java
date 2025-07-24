package com.sw.dto.admin;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAdminDTO {
	
	private Long orderId;
    private String customerName;
    private String sellerNames;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;
    private String paymentStatus;
}
