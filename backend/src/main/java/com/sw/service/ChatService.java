package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; // ✅ thêm dòng này

import com.sw.dao.ChatMessageRepository;
import com.sw.dao.ChatRoomRepository;
import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;

@Service
public class ChatService {
    @Autowired private ChatRoomRepository chatRoomRepo;
    @Autowired private ChatMessageRepository messageRepo;

    public ChatRoom getOrCreateChatRoom(Long buyerId, Long sellerId) {
        return chatRoomRepo.findByBuyerIdAndSellerId(buyerId, sellerId)
                .orElseGet(() -> {
                    ChatRoom room = new ChatRoom();
                    room.setBuyerId(buyerId);
                    room.setSellerId(sellerId);
                    return chatRoomRepo.save(room);
                });
    }

    public ChatMessage sendMessage(Long roomId, Long senderId, String content) {
        ChatRoom room = chatRoomRepo.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng chat"));
        ChatMessage msg = new ChatMessage();
        msg.setChatRoom(room);
        msg.setSenderId(senderId);
        msg.setContent(content);
        return messageRepo.save(msg);
    }

    public List<ChatMessage> getMessages(Long roomId) {
        return messageRepo.findByChatRoomIdOrderByTimestampAsc(roomId);
    }
}
