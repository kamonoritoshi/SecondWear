package com.sw.security;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	// Giữ nguyên secret key của bạn
	private final String jwtSecret = "SecondWear@2024!JwtAuthSecretKey%$1a2b3c4d";

	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	/**
	 * Sinh token mới. Subject bây giờ chỉ là email. Role được lưu trong một trường
	 * (claim) riêng.
	 */
	public String generateToken(String email, String role, long expirationMs) {
		return Jwts.builder().setSubject(email + "|" + role.toLowerCase()) // Chuẩn hóa role thành chữ thường
				.claim("role", role.toLowerCase()).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expirationMs))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
	}

	public String getSubjectFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	public String getEmailFromToken(String token) {
		String subject = getSubjectFromToken(token);
		if (subject != null && subject.contains("|")) {
			return subject.split("\\|")[0];
		}
		return null;
	}

	public String getRoleFromToken(String token) {
		return getClaimFromToken(token, claims -> claims.get("role", String.class));
	}

	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		// userDetails.getUsername() bây giờ sẽ là "email|role"
		final String subject = getSubjectFromToken(token);
		return (subject.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	private Boolean isTokenExpired(String token) {
		return getExpirationDateFromToken(token).before(new Date());
	}

	private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
				.getBody();
		return claimsResolver.apply(claims);
	}
}