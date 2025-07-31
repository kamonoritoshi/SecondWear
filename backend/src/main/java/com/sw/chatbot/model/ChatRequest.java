package com.sw.chatbot.model;

import lombok.Data;

@Data
public class ChatRequest {
    private String sessionId;
    private String message;
    private Long userId;
}