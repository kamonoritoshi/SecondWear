//chatroomrepo
package com.sw.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sw.entity.Account;
import com.sw.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	// ✅ Nếu dùng ID
	Optional<ChatRoom> findByBuyer_AccountIdAndSeller_AccountId(Long buyerId, Long sellerId);

	List<ChatRoom> findByBuyer_AccountIdOrSeller_AccountId(Long buyerId, Long sellerId);

	// ✅ Hoặc dùng Account trực tiếp
	Optional<ChatRoom> findByBuyerAndSeller(Account buyer, Account seller);
	List<ChatRoom> findByBuyerOrSeller(Account buyer, Account seller);
	
	@Query("SELECT r FROM ChatRoom r LEFT JOIN FETCH r.messages WHERE r.buyer.accountId = :id OR r.seller.accountId = :id")
	List<ChatRoom> findRoomsWithMessages(@Param("id") Long id);

}
