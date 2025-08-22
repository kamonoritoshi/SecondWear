//chatcontroler
package com.sw.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sw.dto.ChatMessageDTO;
import com.sw.dto.ChatRoomDTO;
import com.sw.dto.ChatRoomUpdateDTO;
import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;
import com.sw.service.ChatUserService;
import com.sw.service.FileStorageService;

import org.springframework.messaging.simp.SimpMessagingTemplate;

@RestController
@RequestMapping("/api/chat")
public class ChatUserController {
	@Autowired
	private ChatUserService chatService;

	@Autowired
	private SimpMessagingTemplate messagingTemplate; // ✅ Thêm dòng này

	@Autowired
	private FileStorageService fileStorageService;

	@GetMapping("/room")
	public ResponseEntity<?> getExistingRoom(@RequestParam Long buyerId, @RequestParam Long sellerId) {
		Optional<ChatRoom> existingRoom = chatService.findExistingChatRoom(buyerId, sellerId);
		return existingRoom.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/room")
	public ResponseEntity<ChatRoom> getOrCreateRoom(@RequestParam Long buyerId, @RequestParam Long sellerId) {
		return ResponseEntity.ok(chatService.getOrCreateChatRoom(buyerId, sellerId));
	}

	@PostMapping("/room/{roomId}/message")
	public ResponseEntity<ChatMessageDTO> sendMessage(
	        @PathVariable Long roomId,
	        @RequestParam("senderId") Long senderId,
	        @RequestParam(value = "content", required = false) String content,
	        @RequestParam(value = "file", required = false) MultipartFile file) {

	    if (senderId == null || ((content == null || content.trim().isEmpty()) && (file == null || file.isEmpty()))) {
	        return ResponseEntity.badRequest().build();
	    }

	    String fileUrl = null;
	    if (file != null && !file.isEmpty()) {
	        fileUrl = fileStorageService.saveFile(file);
	    }

	    ChatMessage saved = chatService.sendMessage(roomId, senderId, content, fileUrl);

	    ChatMessageDTO response = new ChatMessageDTO(
	            saved.getChatId(),
	            saved.getContent(),
	            saved.getImageUrl(),
	            saved.getSender().getUser().getName(),
	            saved.getSender().getAccountId(),
	            saved.getChatRoom().getRoomId(),
	            saved.getTimestamp()
	    );

	    // Gửi realtime cho client trong room
	    messagingTemplate.convertAndSend("/topic/chat/" + roomId, response);

	    // ===== FIXED: TÍNH SỐ UNREAD CHO NGƯỜI NHẬN =====
	    Long receiverId = saved.getChatRoom().getBuyer().getAccountId()
	            .equals(saved.getSender().getAccountId())
	            ? saved.getChatRoom().getSeller().getAccountId()
	            : saved.getChatRoom().getBuyer().getAccountId();

	    int unreadCount = chatService.countUnreadMessages(saved.getChatRoom().getRoomId(), receiverId);

	    // Broadcast update danh sách phòng
	    messagingTemplate.convertAndSend("/topic/chat/rooms", new ChatRoomUpdateDTO(
	            saved.getChatRoom().getRoomId(),
	            saved.getContent(),
	            saved.getTimestamp(),
	            unreadCount,
	            receiverId // ✅ thêm
	    ));

	    return ResponseEntity.ok(response);
	}

	@GetMapping("/room/{roomId}/messages")
	public ResponseEntity<List<ChatMessageDTO>> getMessages(@PathVariable Long roomId) {
		List<ChatMessage> messages = chatService.getMessages(roomId);
		List<ChatMessageDTO> dtoList = messages.stream()
				.map(msg -> new ChatMessageDTO(msg.getChatId(), msg.getContent(), msg.getImageUrl(),
						msg.getSender().getUser().getName(), msg.getSender().getAccountId(),
						msg.getChatRoom().getRoomId(), msg.getTimestamp()))
				.toList();
		return ResponseEntity.ok(dtoList);
	}

	@GetMapping("/rooms/{accountId}")
	public ResponseEntity<List<ChatRoomDTO>> getChatRooms(@PathVariable Long accountId) {
		List<ChatRoom> rooms = chatService.getChatRooms(accountId);

		List<ChatRoomDTO> dtoList = rooms.stream().map(room -> {
		    ChatMessage lastMsg = room.getMessages() != null && !room.getMessages().isEmpty()
		            ? room.getMessages().stream().max((a, b) -> a.getTimestamp().compareTo(b.getTimestamp())).orElse(null)
		            : null;

		    // ✅ gọi service để đếm unread
		    int unread = chatService.countUnreadMessages(room.getRoomId(), accountId);

		    // ✅ xác định receiverId (người còn lại trong phòng)
		    Long receiverId = room.getBuyer().getAccountId().equals(accountId)
		            ? room.getSeller().getAccountId()
		            : room.getBuyer().getAccountId();

		    return new ChatRoomDTO(
		            room.getRoomId(),
		            room.getBuyer().getUser().getName(),
		            room.getSeller().getUser().getName(),
		            lastMsg != null ? lastMsg.getContent() : "...",
		            lastMsg != null ? lastMsg.getTimestamp() : null,
		            unread,
		            receiverId // ✅ thêm
		    );
		}).toList();
		return ResponseEntity.ok(dtoList);
	}

	@PostMapping("/room/{roomId}/read")
	public ResponseEntity<Void> markAsRead(
	        @PathVariable Long roomId,
	        @RequestParam Long accountId) {

	    // mark read trong DB
	    int unread = chatService.markMessagesAsRead(roomId, accountId);

	    // tìm last message để update danh sách phòng
	    List<ChatMessage> messages = chatService.getMessages(roomId);
	    ChatMessage lastMsg = messages.isEmpty() ? null : messages.get(messages.size() - 1);

	    // xác định receiver (người còn lại trong phòng)
	    ChatRoom room = messages.isEmpty()
	            ? chatService.getChatRooms(accountId).stream()
	                  .filter(r -> r.getRoomId().equals(roomId)).findFirst().orElse(null)
	            : messages.get(0).getChatRoom();

	    if (room != null) {
	        Long receiverId = room.getBuyer().getAccountId().equals(accountId)
	                ? room.getSeller().getAccountId()
	                : room.getBuyer().getAccountId();

	        // Gửi event cho frontend để cập nhật lại số unread
	        messagingTemplate.convertAndSend("/topic/chat/rooms", new ChatRoomUpdateDTO(
	                roomId,
	                lastMsg != null ? lastMsg.getContent() : "...",
	                lastMsg != null ? lastMsg.getTimestamp() : null,
	                unread,  // = 0
	                receiverId
	        ));
	    }

	    return ResponseEntity.ok().build();
	}


}
