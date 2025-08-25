//chatservice
package com.sw.service;

import java.time.LocalDateTime;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.dao.ChatMessageRepository;
import com.sw.dao.ChatRoomRepository;
import com.sw.dao.ProductRepository;

import com.sw.dto.ChatRoomUpdateDTO;
import com.sw.dto.UnreadCountDTO;
import com.sw.entity.Account;
import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;
import com.sw.entity.Product;

import jakarta.transaction.Transactional;

@Service
public class ChatUserService {

    @Autowired
    private ChatRoomRepository chatRoomRepository; // ⚡ chỉ dùng cho create/find room
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    @Autowired
    private AccountRepository accountRepository;  
    @Autowired ProductRepository productRepository;
    
    // ---------- ROOM LOGIC ----------
    public ChatRoom getOrCreateChatRoom(Long buyerId, Long sellerId) {
        return chatRoomRepository.findByBuyer_AccountIdAndSeller_AccountId(buyerId, sellerId)
            .orElseGet(() -> {
                Account buyer = accountRepository.findById(buyerId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy buyerId: " + buyerId));
                Account seller = accountRepository.findById(sellerId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy sellerId: " + sellerId));
                ChatRoom room = new ChatRoom();
                room.setBuyer(buyer);
                room.setSeller(seller);
                return chatRoomRepository.save(room);
            });
    }

    public Optional<ChatRoom> findExistingChatRoom(Long buyerId, Long sellerId) {
        return chatRoomRepository.findByBuyer_AccountIdAndSeller_AccountId(buyerId, sellerId);
    }

    public List<ChatRoom> getChatRooms(Long userId) {
        return chatRoomRepository.findRoomsWithMessages(userId);
    }

    // ---------- UNREAD MESSAGES (CHỈ DÙNG ChatMessageRepository) ----------
    public int countUnreadMessages(Long roomId, Long accountId) {
        return chatMessageRepository.countUnreadMessagesByRoomAndUser(roomId, accountId);
    }

    public List<UnreadCountDTO> countUnreadMessagesForAllRooms(Long accountId) {
        return chatMessageRepository.countUnreadMessagesByAllRooms(accountId);
    }

    @Transactional
    public int markMessagesAsRead(Long roomId, Long accountId) {
        List<ChatMessage> unreadMessages =
            chatMessageRepository.findUnreadMessagesByRoomAndUser(roomId, accountId);

        unreadMessages.forEach(msg -> msg.setRead(true));
        chatMessageRepository.saveAll(unreadMessages);

        // sau khi mark read, số tin chưa đọc chắc chắn = 0
        return 0;
    }

    
    public List<ChatRoomUpdateDTO> getChatRoomsWithUnread(Long userId) {
        List<Object[]> result = chatRoomRepository.findRoomsWithLastMessage(userId);

        return result.stream()
            .map(rowObj -> {
                Object[] row = (Object[]) rowObj;
                ChatRoom room = (ChatRoom) row[0];
                ChatMessage lastMsg = (ChatMessage) row[1];

                int unread = chatMessageRepository.countUnreadMessagesByRoomAndUser(room.getRoomId(), userId);

                Long receiverId = room.getBuyer().getAccountId().equals(userId)
                        ? room.getSeller().getAccountId()
                        : room.getBuyer().getAccountId();

                // 👇 roomName = tên đối thủ
                String roomName = room.getBuyer().getAccountId().equals(userId)
                        ? room.getSeller().getUser().getName()
                        : room.getBuyer().getUser().getName();

                return ChatRoomUpdateDTO.builder()
                        .roomId(room.getRoomId())
                        .content(lastMsg != null
                                ? (lastMsg.getImageUrl() != null ? "[Hình ảnh]" : lastMsg.getContent())
                                : null)
                        .messageType(lastMsg != null
                                ? (lastMsg.getImageUrl() != null ? "IMAGE"
                                  : lastMsg.getProduct() != null ? "PRODUCT"
                                  : "TEXT")
                                : null)
                        .timestamp(lastMsg != null ? lastMsg.getTimestamp() : null)
                        .unread(unread)
                        .receiverId(receiverId)
                        .senderId(lastMsg != null ? lastMsg.getSender().getAccountId() : null)
                        .senderName(lastMsg != null ? lastMsg.getSender().getUser().getName() : null)
                        .roomName(roomName) // 👈 luôn là đối thủ
                        .avatarUrl(null)    // sau có thể bổ sung ảnh đại diện
                        .build();
            })
            .sorted((a, b) -> {
                if (a.getTimestamp() == null && b.getTimestamp() == null) return 0;
                if (a.getTimestamp() == null) return 1;
                if (b.getTimestamp() == null) return -1;
                return b.getTimestamp().compareTo(a.getTimestamp());
            })
            .collect(Collectors.toList());
    }




    // ---------- SEND / GET MESSAGES ----------
    public ChatMessage sendMessage(Long roomId, Long senderId, String content, String imageUrl) {
        Account sender = accountRepository.findById(senderId).orElseThrow();
        ChatRoom room = chatRoomRepository.findById(roomId).orElseThrow();
        ChatMessage message = new ChatMessage();
        message.setSender(sender);
        message.setChatRoom(room);
        message.setContent(content);
        message.setImageUrl(imageUrl);
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false); // ✅ bắt buộc: tin nhắn mới luôn là chưa đọc
        return chatMessageRepository.save(message);
    }


    public List<ChatMessage> getMessages(Long roomId) {
        return chatMessageRepository.findByChatRoom_RoomIdOrderByTimestampAsc(roomId);
    }
    
    public ChatMessage sendProductMessage(Long roomId, Long senderId, Long productId, String note) {
        Account sender = accountRepository.findById(senderId).orElseThrow();
        ChatRoom room = chatRoomRepository.findById(roomId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        ChatMessage message = new ChatMessage();
        message.setSender(sender);
        message.setChatRoom(room);
        message.setProduct(product); // 👈 gắn sản phẩm
        message.setContent(note != null ? note : "Xin chào, tôi muốn hỏi về sản phẩm này");
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false);

        return chatMessageRepository.save(message);
    }

}

