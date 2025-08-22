package com.sw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UnreadCountDTO {
    private Long roomId;
    private Long count;  // phải là Long (không phải int) để match COUNT()
}
