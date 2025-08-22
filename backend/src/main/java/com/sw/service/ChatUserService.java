//chatservice
package com.sw.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.dao.ChatMessageRepository;
import com.sw.dao.ChatRoomRepository;
import com.sw.dto.ChatRoomDTO;
import com.sw.dto.UnreadCountDTO;
import com.sw.entity.Account;
import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;

import jakarta.transaction.Transactional;

@Service
public class ChatUserService {

    @Autowired
    private ChatRoomRepository chatRoomRepository; // ⚡ chỉ dùng cho create/find room
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    @Autowired
    private AccountRepository accountRepository;

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

    
    public List<ChatRoomDTO> getChatRoomsWithUnread(Long userId) {
        List<ChatRoom> rooms = chatRoomRepository.findRoomsWithMessages(userId);

        return rooms.stream().map(room -> {
            int unread = chatMessageRepository.countUnreadMessagesByRoomAndUser(room.getRoomId(), userId);

            ChatMessage lastMsg = room.getMessages().isEmpty() ? null :
                    room.getMessages().get(room.getMessages().size() - 1);

            Long receiverId = room.getBuyer().getAccountId().equals(userId)
                ? room.getSeller().getAccountId()
                : room.getBuyer().getAccountId();

            return new ChatRoomDTO(
                room.getRoomId(),
                room.getBuyer().getUser().getName(),
                room.getSeller().getUser().getName(),
                lastMsg != null ? lastMsg.getContent() : null,
                lastMsg != null ? lastMsg.getTimestamp() : null,
                unread,
                receiverId
            );
        }).collect(Collectors.toList());
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
}

