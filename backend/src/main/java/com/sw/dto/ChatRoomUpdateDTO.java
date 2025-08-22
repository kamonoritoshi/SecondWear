package com.sw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomUpdateDTO {
    private Long roomId;
    private String content;
    private LocalDateTime timestamp;
    private long unread;  // ✅ cập nhật realtime luôn
    private Long receiverId; // ✅ thêm
}

