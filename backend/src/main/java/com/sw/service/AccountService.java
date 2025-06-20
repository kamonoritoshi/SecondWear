package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.entity.Account;

@Service
public class AccountService {
	@Autowired
    private AccountRepository aDAO;
	
	public List<Account> getAllAccounts() {
        return aDAO.findAll();
    }

    public Account getAccountById(Long id) {
        return aDAO.findById(id).orElse(null);
    }

    public Account createAccount(Account account) {
        return aDAO.save(account);
    }

    public Account updateAccount(Long id, Account updatedAccount) {
        Account existing = aDAO.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setUser(updatedAccount.getUser());
        existing.setRole(updatedAccount.getRole());
        existing.setPassword(updatedAccount.getPassword());
        existing.setStatus(updatedAccount.getStatus());
        return aDAO.save(existing);
    }

    public void deleteAccount(Long id) {
    	aDAO.deleteById(id);
    }
}
