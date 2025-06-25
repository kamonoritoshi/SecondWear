package com.sw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategory_CategoryId(Integer categoryId);
}
