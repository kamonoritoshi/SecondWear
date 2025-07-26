package com.sw.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.OrderRepository;
import com.sw.security.CustomUserDetails;

@RestController
@RequestMapping("/api/seller/statistics")
public class SellerStatisticsController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/monthly")
    public List<Map<String, Object>> getMonthlyStatistics(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long accountId = userDetails.getAccount().getAccountId();

        List<Object[]> rawData = orderRepository.sumRevenueAndOrdersByMonth(accountId);

        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rawData) {
            Map<String, Object> map = new HashMap<>();
            map.put("month", row[0]); // "01", "02", ...
            map.put("revenue", row[1]);
            map.put("orderCount", row[2]);
            result.add(map);
        }
        return result;
    }
}

