package com.sw.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
	private Long id;
    private String content;
    private String senderName;
    private Long senderId;
    private Long roomId;
    private LocalDateTime timestamp;
}
