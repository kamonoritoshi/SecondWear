package com.sw.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
    private Long chatId;
    private String content;
    private String imageUrl;
    private String senderName;
    private Long senderId;
    private Long roomId;
    private LocalDateTime timestamp;

    private String messageType; // TEXT, IMAGE, PRODUCT

    // Thông tin sản phẩm (nếu có)
    private Long productId;
    private String productName;
    private String productImageUrl;
    private BigDecimal productPrice;

    // Constructor cơ bản (TEXT/IMAGE)
    public ChatMessageDTO(Long chatId, String content, String imageUrl, String senderName,
                          Long senderId, Long roomId, LocalDateTime timestamp) {
        this.chatId = chatId;
        this.content = content;
        this.imageUrl = imageUrl;
        this.senderName = senderName;
        this.senderId = senderId;
        this.roomId = roomId;
        this.timestamp = timestamp;
    }

    // Constructor đầy đủ (PRODUCT)
    public ChatMessageDTO(Long chatId, String content, String imageUrl, String senderName,
                          Long senderId, Long roomId, LocalDateTime timestamp,
                          Long productId, String productName, String productImageUrl, BigDecimal productPrice) {
        this.chatId = chatId;
        this.content = content;
        this.imageUrl = imageUrl;
        this.senderName = senderName;
        this.senderId = senderId;
        this.roomId = roomId;
        this.timestamp = timestamp;
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.productPrice = productPrice;
    }
}
