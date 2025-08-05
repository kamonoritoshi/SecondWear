//chatroomrepo
package com.sw.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Account;
import com.sw.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // ✅ Nếu dùng ID
    Optional<ChatRoom> findByBuyer_AccountIdAndSeller_AccountId(Long buyerId, Long sellerId);
    List<ChatRoom> findByBuyer_AccountIdOrSeller_AccountId(Long buyerId, Long sellerId);

    // ✅ Hoặc dùng Account trực tiếp
    Optional<ChatRoom> findByBuyerAndSeller(Account buyer, Account seller);
    List<ChatRoom> findByBuyerOrSeller(Account buyer, Account seller);
}

