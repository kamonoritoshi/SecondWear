package com.sw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sw.dto.UnreadCountDTO;
import com.sw.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // Lấy tất cả tin nhắn theo room (thứ tự thời gian)
    List<ChatMessage> findByChatRoom_RoomIdOrderByTimestampAsc(Long roomId);

    // Đếm tin nhắn chưa đọc trong 1 room cho user
    @Query("SELECT COUNT(m) FROM ChatMessage m " +
           "WHERE m.chatRoom.roomId = :roomId " +
           "AND m.sender.accountId <> :accountId " + // không tính tin mình gửi
           "AND m.isRead = false")
    int countUnreadMessagesByRoomAndUser(Long roomId, Long accountId);

    // Lấy toàn bộ tin nhắn chưa đọc trong 1 room cho user
    @Query("SELECT m FROM ChatMessage m " +
           "WHERE m.chatRoom.roomId = :roomId " +
           "AND m.sender.accountId <> :accountId " +
           "AND m.isRead = false")
    List<ChatMessage> findUnreadMessagesByRoomAndUser(Long roomId, Long accountId);

    // Đếm tổng unread theo từng phòng (group by)
    @Query("SELECT new com.sw.dto.UnreadCountDTO(m.chatRoom.roomId, COUNT(m)) " +
           "FROM ChatMessage m " +
           "WHERE m.sender.accountId <> :accountId " +
           "AND m.isRead = false " +
           "GROUP BY m.chatRoom.roomId")
    List<UnreadCountDTO> countUnreadMessagesByAllRooms(Long accountId);
}
