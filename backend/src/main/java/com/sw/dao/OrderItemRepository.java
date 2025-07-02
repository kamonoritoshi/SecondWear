package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

}
