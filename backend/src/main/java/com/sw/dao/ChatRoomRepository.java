//chatroomrepo
package com.sw.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sw.entity.Account;
import com.sw.entity.ChatMessage;
import com.sw.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByBuyer_AccountIdAndSeller_AccountId(Long buyerId, Long sellerId);

    List<ChatRoom> findByBuyer_AccountIdOrSeller_AccountId(Long buyerId, Long sellerId);

    Optional<ChatRoom> findByBuyerAndSeller(Account buyer, Account seller);
    List<ChatRoom> findByBuyerOrSeller(Account buyer, Account seller);

    @Query("SELECT r FROM ChatRoom r " +
    	       "LEFT JOIN r.messages m " +
    	       "WHERE r.buyer.accountId = :id OR r.seller.accountId = :id " +
    	       "GROUP BY r " +
    	       "ORDER BY MAX(m.timestamp) DESC")
    	List<ChatRoom> findRoomsWithMessages(@Param("id") Long id);

    @Query("""
    	    SELECT r, m FROM ChatRoom r
    	    LEFT JOIN r.messages m
    	    WHERE (r.buyer.accountId = :id OR r.seller.accountId = :id)
    	      AND m.timestamp = (
    	          SELECT MAX(m2.timestamp) 
    	          FROM ChatMessage m2 
    	          WHERE m2.chatRoom = r
    	      )
    	""")
    	List<Object[]> findRoomsWithLastMessage(@Param("id") Long id);

}

