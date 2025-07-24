package com.sw.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.dao.OrderRepository;
import com.sw.dto.admin.AdminStatisticsResponse;

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

        // Tính doanh thu hôm nay
        LocalDate today = LocalDate.now();
        LocalDateTime startOfToday = today.atStartOfDay();
        LocalDateTime endOfToday = today.atTime(LocalTime.MAX);
        Double todayRevenue = orderRepository.sumTotalAmountByStatusAndCreatedAtBetween(
            "Hoàn thành", startOfToday, endOfToday);
        res.setTodayRevenue(todayRevenue != null ? todayRevenue : 0);

        // Tính doanh thu tháng hiện tại
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(LocalTime.MAX);
        Double monthRevenue = orderRepository.sumTotalAmountByStatusAndCreatedAtBetween(
            "Hoàn thành", startOfMonth, endOfMonth);
        res.setMonthRevenue(monthRevenue != null ? monthRevenue : 0);
        
        return res;
    }
}
