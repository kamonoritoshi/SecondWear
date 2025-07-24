package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.sw.dao.AccountRepository;
import com.sw.dao.ProductRepository;
import com.sw.entity.Account;
import com.sw.entity.Product;
import com.sw.security.CustomUserDetails;
import com.sw.security.JwtUtil;

@RestController
@RequestMapping("/api/seller/products")
public class SellerProductController {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private JwtUtil jwtUtil;

	@GetMapping
	public List<Product> getSellerProducts(Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Long accountId = userDetails.getAccount().getAccountId();
		return productRepository.findByAccount_AccountId(accountId);
	}

	@PutMapping("/{id}/quantity")
	public ResponseEntity<?> updateProductQuantity(@PathVariable Long id, @RequestBody int newQuantity,
			@RequestHeader("Authorization") String token) {

		String email = jwtUtil.extractUsername(token.substring(7));
		String role = jwtUtil.extractRole(token.substring(7));

		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));

		Account seller = accountRepository.findByEmailAndRole(email, role)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Không tìm thấy người bán"));

		if (!product.getAccount().getAccountId().equals(seller.getAccountId())) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền cập nhật sản phẩm này");
		}

		product.setQuantity(newQuantity);
		productRepository.save(product);

		return ResponseEntity.ok("Đã cập nhật số lượng mới: " + newQuantity);
	}
}
