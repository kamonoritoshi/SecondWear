package com.sw.dto;

import lombok.Data;

@Data
public class AdminStatisticsResponse {
    private long totalAccounts;
    private long totalSellers;
    private long totalOrders;
    private double totalRevenue;
}