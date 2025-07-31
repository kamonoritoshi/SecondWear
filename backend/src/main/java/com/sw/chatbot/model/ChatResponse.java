package com.sw.chatbot.model;

import java.util.List;

import lombok.Data;

@Data
public class ChatResponse {
    private String reply;
    private String intent;
    private List<ProductSuggestion> suggestions; // chỉ dùng nếu intent là suggest_product
}