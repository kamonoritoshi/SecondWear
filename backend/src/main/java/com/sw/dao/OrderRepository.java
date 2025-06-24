package com.sw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sw.entity.Order;
import com.sw.entity.Account;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Tìm đơn hàng theo tài khoản người dùng
    List<Order> findByAccount(Account account);

    // Tìm đơn hàng theo trạng thái
    List<Order> findByStatus(String status);  //

    // Tìm đơn hàng theo tài khoản và trạng thái
    List<Order> findByAccountAndStatus(Account account, String status); 

    // Lấy tất cả đơn hàng sắp xếp theo thời gian đặt hàng (mặc định là orderDate)
    List<Order> findAllByOrderByOrderDateDesc();  //
}
