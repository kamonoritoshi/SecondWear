package com.sw.service;

import java.util.List;

import com.sw.dto.SellerOrderDTO;

public interface SellerOrderService {
    List<SellerOrderDTO> getOrdersForSeller();
    SellerOrderDTO getOrderDetail(Long orderId);
    void updateOrderStatus(Long orderId, String status);
}
