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
    public UserDetails loadUserByUsername(String subject) throws UsernameNotFoundException {
        // ✅ THAY ĐỔI: Tách email và role từ subject
        if (subject == null || !subject.contains("|")) {
            throw new UsernameNotFoundException("Định dạng subject không hợp lệ: " + subject);
        }

        String[] parts = subject.split("\\|");
        String email = parts[0];
        String role = parts[1];

        // ✅ Dùng cả email và role để tìm tài khoản duy nhất, giải quyết NonUniqueResultException
        Account acc = accountRepository.findByUser_EmailAndRole_RoleName(email, role)
            .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản cho " + email + " với vai trò " + role));
        
        return new CustomUserDetails(acc);
    }
}
