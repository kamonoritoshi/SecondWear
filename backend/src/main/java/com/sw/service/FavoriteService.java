package com.sw.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sw.dao.AccountRepository;
import com.sw.dao.FavoriteProductRepository;
import com.sw.dao.ProductRepository;
import com.sw.dto.ProductDTO;
import com.sw.entity.Account;
import com.sw.entity.FavoriteProduct;
import com.sw.entity.FavoriteProductId;
import com.sw.entity.Product;
import com.sw.entity.ProductImage; // <-- Cần import ProductImage

@Service
public class FavoriteService {
	
	@Autowired
    private FavoriteProductRepository favoriteProductRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;
    
    // --- CẬP NHẬT PHƯƠNG THỨC NÀY ---
    private ProductDTO convertToDto(Product product) {
        if (product == null) {
            return null;
        }

        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCondition(product.getCondition());
        dto.setSize(product.getSize());
        dto.setColor(product.getColor());
        dto.setPrice(product.getPrice());
        dto.setStatus(product.getStatus());
        dto.setQuantity(product.getQuantity());
        dto.setBrand(product.getBrand());
        dto.setOrigin(product.getOrigin());
        dto.setApproved(product.getApproved());
        dto.setRejectReason(product.getRejectReason());

        if (product.getCategory() != null && product.getCategory().getCategoryId() != null) {
            dto.setCategoryId(product.getCategory().getCategoryId().longValue());
        }

        // --- SỬA LẠI LOGIC LẤY URL ---
        // Lấy trực tiếp trường imageUrl từ mỗi đối tượng ProductImage
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            List<String> urls = product.getImages().stream()
                .map(ProductImage::getImageUrl) // Lấy URL trực tiếp
                .collect(Collectors.toList());
            dto.setImageUrls(urls);
        } else {
            dto.setImageUrls(Collections.emptyList());
        }

        dto.setFavorited(true);

        return dto;
    }
    
    @Transactional
    public boolean toggleFavorite(Long accountId, Long productId) {
        FavoriteProductId favoriteId = new FavoriteProductId(accountId, productId);
        
        if (favoriteProductRepository.existsById(favoriteId)) {
            favoriteProductRepository.deleteById(favoriteId);
            return false;
        } else {
            Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Account not found"));
            Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
            
            FavoriteProduct favoriteProduct = new FavoriteProduct(account, product);
            favoriteProductRepository.save(favoriteProduct);
            return true;
        }
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getFavoritesByAccountId(Long accountId) {
        return favoriteProductRepository.findById_AccountId(accountId)
                .stream()
                .map(FavoriteProduct::getProduct)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public boolean isProductFavoritedByUser(Long accountId, Long productId) {
        if (accountId == null) return false;
        return favoriteProductRepository.existsById_AccountIdAndId_ProductId(accountId, productId);
    }
}
