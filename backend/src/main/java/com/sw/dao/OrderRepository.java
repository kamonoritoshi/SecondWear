package com.sw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sw.entity.Order;
import com.sw.entity.Account;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Tìm đơn hàng theo trạng thái
    List<Order> findByStatus(String status);  //

    // Tìm đơn hàng theo tài khoản và trạng thái
    List<Order> findByAccountAndStatus(Account account, String status); 

    // Lấy tất cả đơn hàng sắp xếp theo thời gian đặt hàng (mặc định là orderDate)
    List<Order> findAllByOrderByOrderDateDesc();  //
    
    @Query("SELECT DISTINCT o FROM Order o JOIN o.items i WHERE i.product.account.accountId = :sellerId ORDER BY o.orderDate DESC")
    List<Order> findOrdersBySellerId(@Param("sellerId") Long sellerId);
    
    List<Order> findByAccount_AccountId(Long accountId);
}
