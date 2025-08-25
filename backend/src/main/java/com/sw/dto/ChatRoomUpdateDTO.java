package com.sw.dto;

import lombok.AllArgsConstructor;
import lombok.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomUpdateDTO {
	private Long roomId;
	private String content;
	private String messageType;
	private LocalDateTime timestamp;
	private long unread;

	private Long receiverId;

	private Long senderId;
	private String senderName;
	private String roomName;
	private String avatarUrl;

}
