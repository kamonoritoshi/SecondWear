package com.sw.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sw.entity.Account;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CustomUserDetails implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final Account account;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		String roleName = "ROLE_" + account.getRole().getRoleName(); 
	    return List.of(new SimpleGrantedAuthority(roleName));
	}
	
	@Override
    public String getPassword() {
        return account.getPassword();
    }
	
	@Override
    public String getUsername() {
        // Dùng email trong bảng User làm username đăng nhập
        return account.getUser().getEmail();
    }
	
	@Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !"locked".equalsIgnoreCase(account.getStatus());
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return "active".equalsIgnoreCase(account.getStatus());
    }

    public Account getAccount() {
        return account;
    }
    
    public boolean hasRole(String roleName) {
        return account.getRole() != null && account.getRole().getRoleName().equalsIgnoreCase(roleName);
    }
}
