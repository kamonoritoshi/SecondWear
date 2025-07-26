package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sw.dto.ProductDetailsDTO;
import com.sw.entity.Product;
import com.sw.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	@Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailsDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null)
            return ResponseEntity.notFound().build();

        Long categoryId = (product.getCategory() != null) ? product.getCategory().getCategoryId() : null;
        String categoryName = (product.getCategory() != null) ? product.getCategory().getName() : "Không rõ";
        Long accountId = (product.getAccount() != null) ? product.getAccount().getAccountId() : null;

        
        String shopName = "Ẩn danh";
        String shopAddress = "Không rõ vị trí";
        if (product.getAccount() != null && product.getAccount().getUser() != null) {
            shopName = product.getAccount().getUser().getName();
            shopAddress = product.getAccount().getUser().getAddress();
        }

        ProductDetailsDTO dto = new ProductDetailsDTO(
        	    product.getProductId(),
        	    product.getName(),
        	    product.getDescription(),
        	    product.getCondition(),
        	    product.getSize(),
        	    product.getColor(),
        	    product.getPrice(),
        	    product.getStatus(),
        	    product.getQuantity(),
        	    product.getBrand(),
        	    product.getOrigin(),
        	    product.getApproved(),
        	    categoryId,
        	    categoryName,
        	    product.getImages().stream().map(img -> img.getImageUrl()).toList(),
        	    shopName,
        	    shopAddress,              // 👈 thêm dòng này
        	    accountId
        	);
        dto.setAccountId(accountId);

        return ResponseEntity.ok(dto);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String name) {
        return ResponseEntity.ok(productService.searchProductsByName(name));
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<Product>> getAllProductsPaged(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
        return productService.getProductsByCategory(categoryId);
    }
}
