package com.sw.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByBuyerIdAndSellerId(Long buyerId, Long sellerId);
    List<ChatRoom> findByBuyerIdOrSellerId(Long userId, Long userId2);
}


