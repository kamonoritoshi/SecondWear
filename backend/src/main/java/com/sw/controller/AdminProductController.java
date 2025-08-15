package com.sw.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.entity.Product;
import com.sw.service.ProductApprovalService;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {
	@Autowired
	private ProductApprovalService productApprovalService;
	
	// Lấy danh sách sản phẩm chờ duyệt
    @GetMapping("/pending")
    public ResponseEntity<List<Product>> getPendingProducts() {
        return ResponseEntity.ok(productApprovalService.getPendingProducts());
    }

    // Phê duyệt sản phẩm
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveProduct(@PathVariable Long id) {
        return productApprovalService.approveProduct(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Từ chối sản phẩm
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectProduct(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String reason = body.get("reason");
        return productApprovalService.rejectProduct(id, reason)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
