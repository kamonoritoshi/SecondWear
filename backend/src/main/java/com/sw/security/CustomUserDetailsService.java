package com.sw.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.entity.Account;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final AccountRepository accountRepository;
	
	@Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {
		System.out.println("[UserDetailsService] → loadUserByUsername: " + input);
		// 📌 Tách chuỗi email|role
        String[] parts = input.split("\\|");
        String email = parts[0];
        String role = (parts.length > 1) ? parts[1] : "customer";

        // 📌 Tìm trong DB
        Account account = accountRepository.findByEmailAndRole(email, role)
            .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản cho " + email + " với vai trò " + role));
        System.out.println("[UserDetailsService] → Found account ID: " + account.getAccountId() + ", role: " + account.getRole());


        // 📌 Trả về đối tượng chứa Account
        return new CustomUserDetails(account);
    }
}
