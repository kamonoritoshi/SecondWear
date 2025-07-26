package com.sw.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sw.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategory_CategoryId(Integer categoryId);

    // ✅ Sửa: Fetch cả account.user và images
    @EntityGraph(attributePaths = {"images", "account.user"})
    List<Product> findByAccount_AccountId(Long accountId);

    // ✅ Thêm: Dành cho getProductById dùng DTO (đầy đủ images + account.user + category)
    @EntityGraph(attributePaths = {"images", "account.user", "category"})
    @Query("SELECT p FROM Product p WHERE p.productId = :id")
    Optional<Product> findByIdWithAll(@Param("id") Long id);
}

