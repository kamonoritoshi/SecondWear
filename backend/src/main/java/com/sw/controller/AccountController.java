package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.entity.Account;
import com.sw.security.CustomUserDetails;
import com.sw.service.AccountService;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
	@Autowired
	private AccountService accountService;

	@GetMapping
	public List<Account> getAllAccounts() {
		return accountService.getAllAccounts();
	}

	
	@GetMapping("/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
		Account account = accountService.getAccountById(id);
		if (account == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(account);
	}

	
	@PostMapping
	public ResponseEntity<Account> createAccount(@RequestBody Account account) {
		return ResponseEntity.ok(accountService.createAccount(account));
	}

	
	@PutMapping("/{id}")
	public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {
		Account updated = accountService.updateAccount(id, account);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
		accountService.deleteAccount(id);
		return ResponseEntity.noContent().build();
	}
	
	
	@GetMapping("/me")
	public ResponseEntity<Account> getCurrentAccount(@AuthenticationPrincipal CustomUserDetails userDetails) {
	    return ResponseEntity.ok(userDetails.getAccount());
	}
	
}
