package com.sw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long>{
	List<ProductImage> findByProduct_ProductId(Long productId);
}
