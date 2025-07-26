package com.sw.security;

import java.util.List;

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
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	    System.out.println("[UserDetailsService] → loadUserByUsername: " + email);

	    List<Account> accounts = accountRepository.findByUser_Email(email);

	    if (accounts.isEmpty()) {
	        throw new UsernameNotFoundException("Không tìm thấy tài khoản với email: " + email);
	    }

	    if (accounts.size() > 1) {
	        System.err.println("[UserDetailsService] ⚠️ Có nhiều hơn 1 account trùng email: " + email);
	        // hoặc xử lý logic ưu tiên account nào (mới nhất? vai trò cao nhất? active?)
	    }

	    Account account = accounts.get(0); // hoặc apply logic chọn account phù hợp

	    System.out.println("[UserDetailsService] → Found account ID: " + account.getAccountId()
	            + ", role: " + account.getRole().getRoleName());

	    return new CustomUserDetails(account);
	}


}
