//chatservice
package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.dao.ChatMessageRepository;
import com.sw.dao.ChatRoomRepository;
import com.sw.entity.Account;
import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;

@Service
public class ChatUserService {
    @Autowired private ChatRoomRepository chatRoomRepo;
    @Autowired private ChatMessageRepository messageRepo;
    @Autowired private AccountRepository accountRepo;

    public ChatRoom getOrCreateChatRoom(Long buyerId, Long sellerId) {
        Account buyer = accountRepo.findById(buyerId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy buyerId: " + buyerId));
        Account seller = accountRepo.findById(sellerId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy sellerId: " + sellerId));

        return chatRoomRepo.findByBuyerAndSeller(buyer, seller)
            .orElseGet(() -> {
                ChatRoom room = new ChatRoom();
                room.setBuyer(buyer);
                room.setSeller(seller);
                return chatRoomRepo.save(room);
            });
    }

    public ChatMessage sendMessage(Long roomId, Long senderId, String content) {
        ChatRoom room = chatRoomRepo.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng chat"));

        Account sender = accountRepo.findById(senderId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người gửi"));

        ChatMessage msg = new ChatMessage();
        msg.setChatRoom(room);
        msg.setSender(sender);
        msg.setContent(content);

        return messageRepo.save(msg);
    }

    public List<ChatMessage> getMessages(Long roomId) {
        return messageRepo.findByChatRoom_RoomIdOrderByTimestampAsc(roomId);
    }

    public List<ChatRoom> getChatRooms(Long userId) {
        return chatRoomRepo.findByBuyer_AccountIdOrSeller_AccountId(userId, userId);
    }
}
