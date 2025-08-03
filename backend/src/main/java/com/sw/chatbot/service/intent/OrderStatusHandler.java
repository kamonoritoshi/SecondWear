package com.sw.chatbot.service.intent;

import java.util.List;

import org.springframework.stereotype.Component;

import com.sw.chatbot.model.ChatRequest;
import com.sw.chatbot.model.ChatResponse;

@Component
public class OrderStatusHandler {

    public ChatResponse handle(ChatRequest request) {
        Long userId = request.getUserId(); // giả sử đã xác thực

        // Tạm mô phỏng đơn hàng
        List<String> orders = List.of("Đơn hàng #123456 đang giao", "Đơn hàng #654321 đã hoàn tất");

        ChatResponse response = new ChatResponse();
        response.setReply("Bạn có các đơn hàng:\n- " + String.join("\n- ", orders));
        response.setIntent("order_status");
        return response;
    }
}
