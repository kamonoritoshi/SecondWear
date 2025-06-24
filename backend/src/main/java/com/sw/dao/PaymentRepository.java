package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
