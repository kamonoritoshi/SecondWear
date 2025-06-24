package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Shipping;

public interface ShippingRepository extends JpaRepository<Shipping, Long>{

}
