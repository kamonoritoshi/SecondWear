package com.sw.dto;

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
}
