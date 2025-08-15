//chatcontroler
package com.sw.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sw.dto.ChatMessageDTO;
import com.sw.dto.ChatRoomDTO;
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
	    return existingRoom
	            .map(ResponseEntity::ok)
	            .orElseGet(() -> ResponseEntity.notFound().build());
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
	    @RequestParam(value = "file", required = false) MultipartFile file
	) {
	    // Kiểm tra: phải có ít nhất 1 trong 2 (text hoặc file)
	    if (senderId == null || 
	        ((content == null || content.trim().isEmpty()) && (file == null || file.isEmpty()))) {
	        return ResponseEntity.badRequest().build();
	    }

	    // Xử lý lưu file nếu có
	    String fileUrl = null;
	    if (file != null && !file.isEmpty()) {
	        fileUrl = fileStorageService.saveFile(file);
	    }

	    // Lưu tin nhắn
	    ChatMessage saved = chatService.sendMessage(roomId, senderId, content, fileUrl);

	    // Tạo DTO phản hồi
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
	    // Gửi broadcast danh sách phòng
	    messagingTemplate.convertAndSend("/topic/chat/rooms", response);

	    return ResponseEntity.ok(response);
	}



	@GetMapping("/room/{roomId}/messages")
	public ResponseEntity<List<ChatMessageDTO>> getMessages(@PathVariable Long roomId) {
	    List<ChatMessage> messages = chatService.getMessages(roomId);
	    List<ChatMessageDTO> dtoList = messages.stream()
	        .map(msg -> new ChatMessageDTO(
	            msg.getChatId(),
	            msg.getContent(),
	            msg.getImageUrl(),
	            msg.getSender().getUser().getName(),
	            msg.getSender().getAccountId(),
	            msg.getChatRoom().getRoomId(),
	            msg.getTimestamp()
	        ))
	        .toList();
	    return ResponseEntity.ok(dtoList);
	}

	@GetMapping("/rooms/{accountId}")
	public ResponseEntity<List<ChatRoomDTO>> getChatRooms(@PathVariable Long accountId) {
	    System.out.println("📥 Nhận yêu cầu lấy phòng chat cho accountId = " + accountId);
	    
	    List<ChatRoom> rooms = chatService.getChatRooms(accountId);
	    System.out.println("📦 Số lượng phòng tìm thấy: " + rooms.size());

	    List<ChatRoomDTO> dtoList = rooms.stream().map(room -> {
	        String lastMessage = room.getMessages() != null && !room.getMessages().isEmpty()
	            ? room.getMessages()
	                  .stream()
	                  .max((a, b) -> a.getTimestamp().compareTo(b.getTimestamp()))
	                  .map(ChatMessage::getContent)
	                  .orElse("...")
	            : "...";

	        System.out.println("🧾 Phòng ID: " + room.getRoomId()
	            + ", Buyer: " + room.getBuyer().getUser().getName()
	            + ", Seller: " + room.getSeller().getUser().getName()
	            + ", Last Msg: " + lastMessage);

	        return new ChatRoomDTO(
	            room.getRoomId(),
	            room.getBuyer().getUser().getName(),
	            room.getSeller().getUser().getName(),
	            lastMessage
	        );
	    }).toList();

	    return ResponseEntity.ok(dtoList);
	}
	// cho t push lên dcm
}
