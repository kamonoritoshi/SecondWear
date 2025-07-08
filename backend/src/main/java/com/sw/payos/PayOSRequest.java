package com.sw.payos;

import java.util.List;

import lombok.Data;

@Data
public class PayOSRequest {
    private long orderCode; // Đổi thành long
    private int amount;
    private String description;
    private String returnUrl;
    private String cancelUrl;
    private String currency = "VND"; // Thêm currency
    private List<Item> items;
    private String buyerName; // Thêm
    private String buyerEmail; // Thêm
    private String buyerPhone; // Thêm
    private String signature;
}