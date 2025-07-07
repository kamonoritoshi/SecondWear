package com.sw.payos;

import lombok.Data;

@Data
public class PayOSWebhookPayload {
    private String orderCode;
    private int amount;
    private String status; // SUCCESS | FAILED | PENDING
    private String description;
    private String transactionId;
    private String message;
}
