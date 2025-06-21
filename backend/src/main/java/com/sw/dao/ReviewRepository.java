package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

}
