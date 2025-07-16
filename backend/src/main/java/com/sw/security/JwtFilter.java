package com.sw.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
	
	private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        if (path.startsWith("/api/auth/")) {
            // Bỏ qua filter cho login/register
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("[JwtFilter] → URI: " + request.getRequestURI());
        
        final String authHeader = request.getHeader("Authorization");
        System.out.println("[JwtFilter] → Authorization header: " + authHeader);
        
        String token = null;
        String email = null; // sẽ chứa email|role
        String role = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                if (jwtUtil.isTokenValid(token)) {
                	email = jwtUtil.extractUsername(token); // chứa email
                    role = jwtUtil.extractRole(token);      // lấy từ claim
                }
            } catch (Exception e) {
                System.out.println("[JwtFilter] → Lỗi khi parse token: " + e.getMessage());
            }
            System.out.println("[JwtFilter] → role: " + role);
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email + "|" + role);
            System.out.println("[JwtFilter] → Loaded user: " + userDetails.getUsername());
            
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities() // 🔥 quan trọng
            );
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
            System.out.println("[JwtFilter] → Authorities: " + authToken.getAuthorities());
            System.out.println("[JwtFilter] → Auth in context: " + SecurityContextHolder.getContext().getAuthentication());
        }

        filterChain.doFilter(request, response);
    }
}
