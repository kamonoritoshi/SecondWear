package com.sw.controller;

import com.sw.entity.ChatMessage;
import com.sw.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat/send") // client gửi tới /app/chat/send
    public void send(ChatMessage msg) {
        // lưu message vào DB
        ChatMessage saved = chatService.sendMessage(msg.getChatRoom().getId(), msg.getSenderId(), msg.getContent());

        // gửi lại cho tất cả người dùng đang sub /topic/chat/{roomId}
        messagingTemplate.convertAndSend(
            "/topic/chat/" + saved.getChatRoom().getId(),
            saved
        );
    }
}
