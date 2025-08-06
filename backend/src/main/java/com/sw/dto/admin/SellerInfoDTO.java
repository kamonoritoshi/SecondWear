package com.sw.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerInfoDTO {
    private Long accountId;
    private String storeName;
    private String email;
    private Long revenue;
    private String status; // "Hoạt động" hoặc "Tạm ngưng"
}
