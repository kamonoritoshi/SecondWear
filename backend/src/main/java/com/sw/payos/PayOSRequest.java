package com.sw.payos;

import java.util.List;

import lombok.Data;

@Data
public class PayOSRequest {
    private int amount;
    private String description;
    private String returnUrl;
    private String cancelUrl;
    private String orderCode;
    private List<String> items;
    private String webhookUrl;
}