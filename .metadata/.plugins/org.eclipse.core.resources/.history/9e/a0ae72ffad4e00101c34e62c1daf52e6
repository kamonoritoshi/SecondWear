package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.sw.entity.Account;
import com.sw.entity.Product;
import com.sw.service.AccountService;
import com.sw.service.ProductService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@org.springframework.web.bind.annotation.RestController
public class RestController {
	@Autowired
	private ProductService pService;
	@Autowired
	private AccountService aService;
	
	// Product REST API
	
	@GetMapping("/api/products")
	public List<Product> getAllProducts() {
		return pService.getAllProducts();
	}
	
	@GetMapping("/api/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = pService.getProductById(id);
        if (product == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product);
    }
	
	@PostMapping("/api/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(pService.createProduct(product));
    }
	
	@PutMapping("/api/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updated = pService.updateProduct(id, product);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }
	
	@DeleteMapping("/api/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        pService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
	
	// Account REST API
	
	@GetMapping("/api/accounts")
    public List<Account> getAllAccounts() {
        return aService.getAllAccounts();
    }

    @GetMapping("/api/accounts/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Account account = aService.getAccountById(id);
        if (account == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(account);
    }

    @PostMapping("/api/accounts")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return ResponseEntity.ok(aService.createAccount(account));
    }

    @PutMapping("/api/accounts/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {
        Account updated = aService.updateAccount(id, account);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/accounts/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        aService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }
}
