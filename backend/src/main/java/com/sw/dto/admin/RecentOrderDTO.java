package com.sw.dto.admin;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentOrderDTO {
	private Long orderId;
    private String customerName;
    private String status;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;

}
