package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.entity.Account;

@Service
public class SellerApprovalService {
	@Autowired
    private AccountRepository accountRepo;

    public List<Account> getPendingRequests() {
        return accountRepo.findBySellerStatus(Account.SellerStatus.PENDING);
    }

    public void approveSeller(Long accountId) {
        Account account = accountRepo.findById(accountId).orElseThrow();
        account.setSellerStatus(Account.SellerStatus.APPROVED);
        account.setRejectReason(null);
        accountRepo.save(account);
    }

    public void rejectSeller(Long accountId, String reason) {
        Account account = accountRepo.findById(accountId).orElseThrow();
        account.setSellerStatus(Account.SellerStatus.REJECTED);
        account.setRejectReason(reason);
        accountRepo.save(account);
    }
}
