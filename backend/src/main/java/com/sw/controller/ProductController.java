package com.sw.controller;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dto.ProductDTO;
import com.sw.entity.Product;
import com.sw.security.CustomUserDetails;
import com.sw.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	@Autowired
    private ProductService productService;

	@GetMapping
	public List<Product> getAllProducts() {
	    return productService.getAllProducts()
	            .stream()
	            .filter(p -> p.getApproved() != null && p.getApproved() == 1) // chỉ lấy đã duyệt
	            .collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
		Long accountId = (userDetails != null) ? userDetails.getAccount().getAccountId() : null;
	    Product product = productService.getProductById(id, accountId);
	    if (product == null || product.getApproved() == null || product.getApproved() != 1) {
	        return ResponseEntity.notFound().build();
	    }
	    return ResponseEntity.ok(product);
	}

	@GetMapping("/search")
	public ResponseEntity<List<Product>> searchProducts(@RequestParam String name) {
	    List<Product> approvedProducts = productService.searchProductsByName(name)
	            .stream()
	            .filter(p -> p.getApproved() != null && p.getApproved() == 1)
	            .collect(Collectors.toList());
	    return ResponseEntity.ok(approvedProducts);
	}

	@GetMapping("/paged")
	public ResponseEntity<Page<Product>> getAllProductsPaged(@PageableDefault(size = 10) Pageable pageable) {
		Page<Product> products = productService.getAllApprovedProducts(pageable);
	    return ResponseEntity.ok(products);
	}

	@GetMapping("/category/{categoryId}")
	public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
	    return productService.getProductsByCategory(categoryId)
	            .stream()
	            .filter(p -> p.getApproved() != null && p.getApproved() == 1)
	            .collect(Collectors.toList());
	}
}
