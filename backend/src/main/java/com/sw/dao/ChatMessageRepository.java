//chatmessrepo
package com.sw.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sw.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
	List<ChatMessage> findByChatRoom_RoomIdOrderByTimestampAsc(Long chatRoomId);
}
