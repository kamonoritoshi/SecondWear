package com.sw.security;

import java.util.Collection;
import java.util.Collections; // ✅ Thêm import này

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority; // ✅ Thêm import này
import org.springframework.security.core.userdetails.UserDetails;

import com.sw.entity.Account;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final Account account;

	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Giữ nguyên logic chuẩn hóa: ROLE_ + tên vai trò viết thường
        String roleName = "ROLE_" + account.getRole().getRoleName().toLowerCase();
        return Collections.singletonList(new SimpleGrantedAuthority(roleName));
    }
    
    @Override
    public String getUsername() {
        // ✅ THAY ĐỔI: Trả về "email|role" để khớp với subject của token
        return account.getUser().getEmail() + "|" + account.getRole().getRoleName().toLowerCase();
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return "active".equalsIgnoreCase(account.getStatus());
    }
}