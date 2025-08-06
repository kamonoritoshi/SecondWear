package com.sw.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.sw.security.CustomUserDetailsService;
import com.sw.security.JwtFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
	
	private final JwtFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
        		.cors()
        		.and()
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                	    .requestMatchers("/ws/**").permitAll() // ✅ Thêm dòng này
                	    .requestMatchers("/api/auth/**").permitAll()
                	    .requestMatchers("/api/payment/vnpay-return").permitAll()
                	    .requestMatchers("/api/products/**").permitAll()
                	    .requestMatchers("/api/categories/**").permitAll()
                	    .requestMatchers("/api/payment/return", "/api/payment/cancel", "/test_payos.html").permitAll()
                	    .requestMatchers("/api/seller/**").hasAuthority("ROLE_seller")
                	    .requestMatchers("/api/seller/revenue/**").permitAll()
                	    .requestMatchers("/api/admin/**").hasAuthority("ROLE_admin")
                	    .requestMatchers("/api/orders/**").authenticated()
                	    .requestMatchers("/api/accounts/me").authenticated()
                	    .requestMatchers("/api/users/me").authenticated()
                	    .requestMatchers("/api/payments/**").permitAll()
                	    .requestMatchers("/api/chatbot/**").permitAll()
                	    .anyRequest().authenticated()
                	)

                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173")); // ✅ Cụ thể, KHÔNG dùng "*"
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type")); // ✅ rõ ràng
        config.setAllowCredentials(true); // ✅ PHẢI đặt true để SockJS hoạt động

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
