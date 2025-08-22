package com.sw.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDTO {
    private Long roomId;
    private String buyerName;
    private String sellerName;
    private String lastMessage;
    private LocalDateTime lastTime;
    private int unread;  // số tin chưa đọc
    private Long receiverId; // ✅ thêm
}



