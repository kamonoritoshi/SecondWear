package com.sw.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.dao.OrderRepository;
import com.sw.dto.AdminStatisticsResponse;
import com.sw.entity.Role;

@Service
public class AdminStatisticsServiceImpl implements AdminStatisticsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public AdminStatisticsResponse getAdminStatistics() {
        AdminStatisticsResponse res = new AdminStatisticsResponse();
        res.setTotalAccounts(accountRepository.count());
        res.setTotalSellers(accountRepository.countByRoleName("seller"));
        res.setTotalOrders(orderRepository.count());
        res.setTotalRevenue(orderRepository.sumTotalAmountByStatus("Hoàn thành")); // hoặc "Đã giao"

        return res;
    }
}
