//chatcontroler
package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;
import com.sw.service.ChatService;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
	@Autowired
	private ChatService chatService;

	@PostMapping("/room")
	public ResponseEntity<ChatRoom> getOrCreateRoom(@RequestParam Long buyerId, @RequestParam Long sellerId) {
		return ResponseEntity.ok(chatService.getOrCreateChatRoom(buyerId, sellerId));
	}

	@PostMapping("/room/{roomId}/message")
	public ResponseEntity<ChatMessage> sendMessage(@PathVariable Long roomId, @RequestBody ChatMessage msg) {
	    if (msg.getSender() == null || msg.getSender().getAccountId() == null) {
	        return ResponseEntity.badRequest().build();
	    }
	    ChatMessage saved = chatService.sendMessage(roomId, msg.getSender().getAccountId(), msg.getContent());
	    return ResponseEntity.ok(saved);
	}


	@GetMapping("/room/{roomId}/messages")
	public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable Long roomId) {
		return ResponseEntity.ok(chatService.getMessages(roomId));
	}
	
	@GetMapping("/rooms/{accountId}")
	public ResponseEntity<List<ChatRoom>> getChatRooms(@PathVariable Long accountId) {
	    return ResponseEntity.ok(chatService.getChatRooms(accountId));
	}

}
