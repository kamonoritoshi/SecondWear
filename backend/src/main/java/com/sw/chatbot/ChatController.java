package com.sw.chatbot;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.chatbot.model.ChatRequest;
import com.sw.chatbot.model.ChatResponse;
import com.sw.chatbot.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/message")
    public ResponseEntity<ChatResponse> handleMessage(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(chatService.processMessage(request));
    }
}
