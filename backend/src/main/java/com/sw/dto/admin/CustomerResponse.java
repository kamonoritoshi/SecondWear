package com.sw.dto.admin;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse {
    private Long accountId;
    private String fullName;
    private String email;
    private BigDecimal totalSpending; // VNĐ
    private String status; // "ACTIVE", "INACTIVE" (từ Account.status)
}
