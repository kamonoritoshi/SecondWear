package com.sw.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sw.dao.AccountRepository;
import com.sw.dto.admin.CustomerResponse;
import com.sw.entity.Account;
import com.sw.entity.Order;
import com.sw.entity.User;

import jakarta.transaction.Transactional;

@Service
public class AccountService {
	@Autowired
    private AccountRepository accountRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account updateAccount(Long id, Account updatedAccount) {
        Account existing = accountRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setUser(updatedAccount.getUser());
        existing.setRole(updatedAccount.getRole());
        existing.setPassword(updatedAccount.getPassword());
        existing.setStatus(updatedAccount.getStatus());
        return accountRepository.save(existing);
    }

    public void deleteAccount(Long id) {
    	accountRepository.deleteById(id);
    }
    
    public Page<Account> getAccountsFiltered(String role, String status, String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("accountId").descending());

        if ((role == null || role.isEmpty()) &&
            (status == null || status.isEmpty()) &&
            (keyword == null || keyword.isEmpty())) {
            return accountRepository.findAll(pageable);
        }

        return accountRepository.findByFilters(role, status, keyword, pageable);
    }
    
    @Transactional
    public void updateAccountStatus(Long accountId, String newStatus) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));
        account.setStatus(newStatus);
        accountRepository.save(account);
    }
    
    @Transactional
    public void resetPassword(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        account.setPassword(passwordEncoder.encode("123456")); // Mật khẩu mặc định mới
        accountRepository.save(account);
    }
    
    public List<CustomerResponse> getAllCustomers() {
        return accountRepository.findAll().stream()
            .filter(acc -> acc.getRole().getRoleName().equalsIgnoreCase("CUSTOMER"))
            .map(account -> {
                User user = account.getUser();

                BigDecimal totalSpending = BigDecimal.ZERO;

                if (account.getOrders() != null) {
                    for (Order order : account.getOrders()) {
                        if (order.getTotalAmount() != null) {
                            totalSpending = totalSpending.add(order.getTotalAmount());
                        }
                    }
                }

                return new CustomerResponse(
                    account.getAccountId(),
                    user.getName(),
                    user.getEmail(),
                    totalSpending,
                    account.getStatus()
                );
            }).collect(Collectors.toList());
    }
}
