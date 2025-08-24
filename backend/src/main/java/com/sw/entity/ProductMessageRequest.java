package com.sw.entity;

import lombok.Data;

@Data
public class ProductMessageRequest {
    private Long senderId;
    private Long productId;
    private String content; // note hoặc tin nhắn kèm sản phẩm
}
