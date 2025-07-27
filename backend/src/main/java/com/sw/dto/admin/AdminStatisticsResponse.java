package com.sw.dto.admin;

import lombok.Data;

@Data
public class AdminStatisticsResponse {
    private long totalAccounts;
    private long totalSellers;
    private long totalOrders;
    private double todayRevenue;
    private double monthRevenue;
    private double totalRevenue;
    private TopSellingProductDTO topSellingProduct;
    private NewCustomerStatsDTO newCustomers;
    private GrowthRateDTO growthRate;
}