package com.sw.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.dao.OrderRepository;
import com.sw.dto.admin.SellerInfoDTO;
import com.sw.entity.Account;

@Service
public class AdminSellerService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<SellerInfoDTO> getAllApprovedSellers() {
        List<Account> sellers = accountRepository.findApprovedSellers();

        return sellers.stream().map(seller -> {
            BigDecimal revenue = orderRepository.getTotalRevenueBySeller(seller.getAccountId());

            return new SellerInfoDTO(
                seller.getAccountId(),
                seller.getUser().getName(), // hoặc tên shop nếu có
                seller.getUser().getEmail(),
                revenue != null ? revenue.longValue() : 0L,
                seller.getStatus() // "Hoạt động" hoặc "Tạm ngưng"
            );
        }).collect(Collectors.toList());
    }

    public void suspendSeller(Long accountId) {
        Account seller = accountRepository.findById(accountId).orElseThrow();
        seller.setStatus("Tạm ngưng");
        accountRepository.save(seller);
    }

    public void restoreSeller(Long accountId) {
        Account seller = accountRepository.findById(accountId).orElseThrow();
        seller.setStatus("Hoạt động");
        accountRepository.save(seller);
    }
}