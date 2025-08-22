package com.sw.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import lombok.*;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "\"ChatMessage\"")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long chatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonIgnoreProperties({ "messages", "buyer", "seller", "hibernateLazyInitializer", "handler" })
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    @JsonIgnoreProperties({ "user", "role", "orders", "hibernateLazyInitializer", "handler" })
    private Account sender;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content; // chứa text/emoji

    @Column(name = "image_url", columnDefinition = "NVARCHAR(MAX)")
    private String imageUrl; // chứa URL ảnh

    private LocalDateTime timestamp = LocalDateTime.now();
    
    @Column(name = "is_read", nullable = false)
    private boolean isRead = false; // ✅ đổi tên field

}

