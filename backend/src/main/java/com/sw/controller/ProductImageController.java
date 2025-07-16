package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.ProductRepository;
import com.sw.entity.Product;
import com.sw.entity.ProductImage;
import com.sw.service.ProductImageService;

@RestController
@RequestMapping("/api/product-images")
public class ProductImageController {
	@Autowired
	private ProductImageService productImageService;
	@Autowired
	private ProductRepository productRepository;
	
	@GetMapping("/product/{productId}")
	public List<ProductImage> getImagesByProduct(@PathVariable Long productId) {
		return productImageService.getImagesByProductId(productId);
	}

	@PostMapping("/product/{productId}")
	public ResponseEntity<?> addImage(@PathVariable Long productId, @RequestParam String imageUrl) {
		Product product = productRepository.findById(productId).orElse(null);
		if (product == null) {
			return ResponseEntity.notFound().build();
		}
		ProductImage saved = productImageService.addImage(product, imageUrl);
		return ResponseEntity.ok(saved);
	}

	@DeleteMapping("/{imageId}")
	public ResponseEntity<?> deleteImage(@PathVariable Long imageId) {
		productImageService.deleteImage(imageId);
		return ResponseEntity.ok("Image deleted");
	}
}
