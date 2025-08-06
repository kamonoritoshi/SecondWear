package com.sw.dto.admin;

import java.time.LocalDateTime;

import com.sw.entity.Account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerRequestDTO {
	private Long accountId;
    private String name;
    private String email;
    private String phone;
    private String sellerStatus;
    private String rejectReason;
    private LocalDateTime createdAt;

    public static SellerRequestDTO from(Account account) {
        return new SellerRequestDTO(
            account.getAccountId(),
            account.getUser().getName(),
            account.getUser().getEmail(),
            account.getUser().getPhone(),
            account.getSellerStatus().name(),
            account.getRejectReason(),
            account.getCreatedAt()
        );
    }
}
