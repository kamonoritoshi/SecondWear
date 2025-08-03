//chatcontroler
package com.sw.controller;

import com.sw.entity.ChatMessage;
import com.sw.service.ChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@Autowired
	private ChatUserService chatService;

	@MessageMapping("/chat/send")
	public void send(ChatMessage msg) {
		ChatMessage saved = chatService.sendMessage(msg.getChatRoom().getRoomId(), msg.getSender().getAccountId(), // ⚠️ nếu sender là Account																												
				msg.getContent());
		messagingTemplate.convertAndSend("/topic/chat/" + saved.getChatRoom().getRoomId(), saved);
	}
}
