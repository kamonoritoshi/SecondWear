package com.sw.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sw.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategory_CategoryId(Integer categoryId);
    // List<Product> findByAccount_AccountId(Long accountId);
    
    @EntityGraph(attributePaths = "images")
    List<Product> findByAccount_AccountId(Long accountId);
    
    @Query(value = "SELECT TOP 3 * FROM product WHERE approved = 1 ORDER BY NEWID()", nativeQuery = true)
    List<Product> findTop3SuggestedProducts();
    
    List<Product> findByApproved(Byte approved);
}
