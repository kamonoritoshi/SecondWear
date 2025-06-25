package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	
}
