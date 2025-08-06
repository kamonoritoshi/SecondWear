//chatmessage
package com.sw.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ChatMessage")
public class ChatMessage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chat_id")
	private Long chatId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	@JsonIgnoreProperties({ "messages", "buyer", "seller" }) // 👈 Tránh vòng lặp khi serialize
	private ChatRoom chatRoom;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sender_id", nullable = false)
	@JsonIgnoreProperties({ "user", "role", "orders" }) // 👈 Tránh vòng lặp khi serialize
	private Account sender;

	private String content;

	private LocalDateTime timestamp = LocalDateTime.now();
}
