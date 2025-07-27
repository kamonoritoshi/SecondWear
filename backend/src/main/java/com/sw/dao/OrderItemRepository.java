package com.sw.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sw.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
	@Query("SELECT i.product.name, SUM(i.quantity) FROM OrderItem i "
			+ "WHERE i.order.status = 'Hoàn thành' AND i.order.orderDate BETWEEN :start AND :end "
			+ "GROUP BY i.product.name ORDER BY SUM(i.quantity) DESC")
	List<Object[]> findTopSellingProductOfMonth(LocalDateTime start, LocalDateTime end, Pageable pageable);

	@Query("SELECT SUM(i.quantity) " + "FROM OrderItem i JOIN i.order o " + "WHERE i.product.name = :productName "
			+ "AND o.orderDate BETWEEN :startDate AND :endDate")
	Double findQuantitySoldOfProductByName(String productName, LocalDateTime startDate, LocalDateTime endDate);

}
