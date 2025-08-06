//chatservice
package com.sw.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
	@Autowired
	private ChatRoomRepository chatRoomRepository;
	@Autowired
	private ChatMessageRepository chatMessageRepository;
	@Autowired
	private AccountRepository accountRepository;

	public ChatRoom getOrCreateChatRoom(Long buyerId, Long sellerId) {
		return chatRoomRepository.findByBuyer_AccountIdAndSeller_AccountId(buyerId, sellerId).orElseGet(() -> {
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

//	public Optional<ChatRoom> findExistingChatRoom(Long buyerId, Long sellerId) {
//		Account buyer = accountRepo.findById(buyerId)
//				.orElseThrow(() -> new RuntimeException("Không tìm thấy buyerId: " + buyerId));
//		Account seller = accountRepo.findById(sellerId)
//				.orElseThrow(() -> new RuntimeException("Không tìm thấy sellerId: " + sellerId));
//		return chatRoomRepository.findByBuyerAndSeller(buyer, seller);
//	}

	public Optional<ChatRoom> findExistingChatRoom(Long buyerId, Long sellerId) {
		return chatRoomRepository.findByBuyer_AccountIdAndSeller_AccountId(buyerId, sellerId);
	}

	public ChatMessage sendMessage(Long roomId, Long senderId, String content) {
		Account sender = accountRepository.findById(senderId).orElseThrow();
		ChatRoom room = chatRoomRepository.findById(roomId).orElseThrow();
		ChatMessage message = new ChatMessage();
		message.setSender(sender);
		message.setChatRoom(room);
		message.setContent(content);
		message.setTimestamp(LocalDateTime.now());;
		return chatMessageRepository.save(message);
	}

	public List<ChatMessage> getMessages(Long roomId) {
		return chatMessageRepository.findByChatRoom_RoomIdOrderByTimestampAsc(roomId);
	}

	public List<ChatRoom> getChatRooms(Long userId) {
		return chatRoomRepository.findByBuyer_AccountIdOrSeller_AccountId(userId, userId);
	}
}
