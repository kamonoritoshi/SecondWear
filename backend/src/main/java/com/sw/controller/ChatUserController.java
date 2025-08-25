package com.sw.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sw.dto.ChatMessageDTO;
import com.sw.dto.ChatRoomDTO;
import com.sw.dto.ChatRoomUpdateDTO;
import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;
import com.sw.entity.Product;
import com.sw.entity.ProductMessageRequest;
import com.sw.service.ChatUserService;
import com.sw.service.FileStorageService;

@RestController
@RequestMapping("/api/chat")
public class ChatUserController {

    @Autowired
    private ChatUserService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private FileStorageService fileStorageService;

    // ================== ROOM ==================
    @GetMapping("/room")
    public ResponseEntity<?> getExistingRoom(@RequestParam Long buyerId, @RequestParam Long sellerId) {
        Optional<ChatRoom> existingRoom = chatService.findExistingChatRoom(buyerId, sellerId);
        return existingRoom.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/room")
    public ResponseEntity<ChatRoom> getOrCreateRoom(@RequestParam Long buyerId, @RequestParam Long sellerId) {
        return ResponseEntity.ok(chatService.getOrCreateChatRoom(buyerId, sellerId));
    }

    @GetMapping("/rooms/{accountId}")
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(@PathVariable Long accountId) {
        List<ChatRoom> rooms = chatService.getChatRooms(accountId);

        List<ChatRoomDTO> dtoList = rooms.stream().map(room -> {
            ChatMessage lastMsg = room.getMessages() != null && !room.getMessages().isEmpty()
                    ? room.getMessages().stream().max((a, b) -> a.getTimestamp().compareTo(b.getTimestamp())).orElse(null)
                    : null;

            int unread = chatService.countUnreadMessages(room.getRoomId(), accountId);

         // 👇 lấy tên đối thủ
            boolean isBuyer = room.getBuyer().getAccountId().equals(accountId);
            String roomName = isBuyer 
                    ? room.getSeller().getUser().getName()
                    : room.getBuyer().getUser().getName();
            
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
            	    receiverId,
            	    roomName // 👈 thêm roomName ở đây
            	);
        }).toList();
        return ResponseEntity.ok(dtoList);
    }

    // ================== MESSAGE ==================
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
        ChatMessageDTO response = mapToDTO(saved);

        // Gửi realtime message trong phòng
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, response);

        // Broadcast update danh sách phòng (có đầy đủ name)
        broadcastRoomUpdate(saved);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/room/{roomId}/messages")
    public ResponseEntity<List<ChatMessageDTO>> getMessages(@PathVariable Long roomId) {
        List<ChatMessage> messages = chatService.getMessages(roomId);
        List<ChatMessageDTO> dtoList = messages.stream().map(this::mapToDTO).toList();
        return ResponseEntity.ok(dtoList);
    }

    @PostMapping("/room/{roomId}/read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable Long roomId,
            @RequestParam Long accountId) {

        // Đánh dấu tất cả tin nhắn chưa đọc là đã đọc
        chatService.markMessagesAsRead(roomId, accountId);

        List<ChatMessage> messages = chatService.getMessages(roomId);
        ChatMessage lastMsg = messages.isEmpty() ? null : messages.get(messages.size() - 1);

        ChatRoom room = messages.isEmpty()
                ? chatService.getChatRooms(accountId).stream()
                    .filter(r -> r.getRoomId().equals(roomId)).findFirst().orElse(null)
                : messages.get(0).getChatRoom();

        if (room != null) {
            Long receiverId = room.getBuyer().getAccountId().equals(accountId)
                    ? room.getSeller().getAccountId()
                    : room.getBuyer().getAccountId();

            // roomName = luôn là tên đối thủ
            String roomName = room.getBuyer().getAccountId().equals(accountId)
                    ? room.getSeller().getUser().getName()
                    : room.getBuyer().getUser().getName();

            ChatRoomUpdateDTO updateDTO = ChatRoomUpdateDTO.builder()
                    .roomId(roomId)
                    .content(lastMsg != null ? lastMsg.getContent() : "...")
                    .messageType(lastMsg != null
                            ? (lastMsg.getImageUrl() != null ? "IMAGE"
                                : lastMsg.getProduct() != null ? "PRODUCT" : "TEXT")
                            : "TEXT")
                    .timestamp(lastMsg != null ? lastMsg.getTimestamp() : null)
                    .unread(0) // ✅ luôn reset về 0 cho accountId này
                    .receiverId(accountId) // ✅ chính là người vừa đọc
                    .roomName(roomName)
                    .build();

            // ✅ Gửi riêng cho accountId
            messagingTemplate.convertAndSend("/topic/rooms/" + accountId, updateDTO);
        }

        return ResponseEntity.ok().build();
    }

    // ================== PRODUCT MESSAGE ==================
    @PostMapping("/room/{roomId}/product")
    public ResponseEntity<ChatMessageDTO> sendProductMessage(
            @PathVariable Long roomId,
            @RequestBody ProductMessageRequest request) {

        ChatMessage saved = chatService.sendProductMessage(
                roomId, request.getSenderId(), request.getProductId(), request.getContent()
        );

        ChatMessageDTO response = mapToDTO(saved);

        // Gửi realtime message
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, response);

        // Broadcast update danh sách phòng (có đầy đủ name)
        broadcastRoomUpdate(saved);

        return ResponseEntity.ok(response);
    }

    // ================== HELPER ==================
    private ChatMessageDTO mapToDTO(ChatMessage msg) {
        ChatMessageDTO dto = new ChatMessageDTO(
                msg.getChatId(),
                msg.getContent(),
                msg.getImageUrl(),
                msg.getSender().getUser().getName(),
                msg.getSender().getAccountId(),
                msg.getChatRoom().getRoomId(),
                msg.getTimestamp()
        );

        if (msg.getProduct() != null) {
            Product product = msg.getProduct();
            dto.setMessageType("PRODUCT");
            dto.setProductId(product.getProductId());
            dto.setProductName(product.getName());
            dto.setProductImageUrl(
                    product.getImages() != null && !product.getImages().isEmpty()
                            ? product.getImages().get(0).getImageUrl()
                            : null
            );
            dto.setProductPrice(product.getPrice());
        } else if (msg.getImageUrl() != null) {
            dto.setMessageType("IMAGE");
        } else {
            dto.setMessageType("TEXT");
        }

        return dto;
    }

    private void broadcastRoomUpdate(ChatMessage saved) {
        ChatRoom room = saved.getChatRoom();

        Long receiverId = room.getBuyer().getAccountId()
                .equals(saved.getSender().getAccountId())
                ? room.getSeller().getAccountId()
                : room.getBuyer().getAccountId();

        int unreadCount = chatService.countUnreadMessages(room.getRoomId(), receiverId);

        // 👇 roomName = tên đối thủ (người gửi hoặc người còn lại)
        String roomName = room.getBuyer().getAccountId().equals(receiverId)
                ? room.getSeller().getUser().getName()
                : room.getBuyer().getUser().getName();


        ChatRoomUpdateDTO updateDTO = ChatRoomUpdateDTO.builder()
                .roomId(room.getRoomId())
                .content(saved.getContent())
                .messageType(saved.getImageUrl() != null ? "IMAGE" :
                             saved.getProduct() != null ? "PRODUCT" : "TEXT")
                .timestamp(saved.getTimestamp())
                .unread(unreadCount)
                .receiverId(receiverId)
                .senderId(saved.getSender().getAccountId())
                .senderName(saved.getSender().getUser().getName())
                .roomName(roomName) // 👈 luôn là tên đối thủ
                .avatarUrl(null)
                .build();

        messagingTemplate.convertAndSend("/topic/rooms/" + receiverId, updateDTO);
    }

}
