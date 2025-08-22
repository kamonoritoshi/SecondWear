package com.sw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.FavoriteProduct;
import com.sw.entity.FavoriteProductId;

public interface FavoriteProductRepository extends JpaRepository<FavoriteProduct, FavoriteProductId> {
	// Tìm tất cả các lượt thích của một tài khoản
    List<FavoriteProduct> findById_AccountId(Long accountId);

    // Kiểm tra xem một tài khoản đã thích một sản phẩm cụ thể chưa
    boolean existsById_AccountIdAndId_ProductId(Long accountId, Long productId);
    
    // Đếm số lượt thích của một sản phẩm
    long countById_ProductId(Long productId);
}
