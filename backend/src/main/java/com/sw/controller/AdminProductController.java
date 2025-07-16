package com.sw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.entity.Product;
import com.sw.service.ProductService;

@RestController
@RequestMapping("/api/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {
	@Autowired
    private ProductService productService;

    @PostMapping("/admin")
    public ResponseEntity<Product> createProductByAdmin(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Product> approveProduct(@PathVariable("id") Long id) {
        Product approved = productService.approve(id);
        return ResponseEntity.ok(approved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
