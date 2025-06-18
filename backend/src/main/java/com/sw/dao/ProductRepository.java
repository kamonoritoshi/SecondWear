package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
