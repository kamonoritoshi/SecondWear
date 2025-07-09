package com.sw.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class SellerOrderDTO {
    private Long orderId;
    private String status;
    private BigDecimal totalAmount;
    private String customerEmail;
    private List<OrderItemDTO> items;

    @Data
    public static class OrderItemDTO {
        private Long orderItemId;
        private String productName;
        private int quantity;
        private BigDecimal price;
    }
}
