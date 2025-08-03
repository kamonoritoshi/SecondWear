package com.sw.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.sw.dao.AccountRepository;
import com.sw.dao.OrderItemRepository;
import com.sw.dao.OrderRepository;
import com.sw.dto.admin.AdminStatisticsResponse;
import com.sw.dto.admin.GrowthRateDTO;
import com.sw.dto.admin.NewCustomerStatsDTO;
import com.sw.dto.admin.TopSellingProductDTO;

@Service
public class AdminStatisticsServiceImpl implements AdminStatisticsService {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Override
	public AdminStatisticsResponse getAdminStatistics() {
		AdminStatisticsResponse res = new AdminStatisticsResponse();

		// Tổng quan
		res.setTotalAccounts(accountRepository.count());
		res.setTotalSellers(accountRepository.countByRoleName("seller"));
		res.setTotalOrders(orderRepository.count());
		res.setTotalRevenue(orderRepository.sumTotalAmountByStatus("Hoàn thành"));

		// Doanh thu hôm nay
		LocalDate today = LocalDate.now();
		LocalDateTime startOfToday = today.atStartOfDay();
		LocalDateTime endOfToday = today.atTime(LocalTime.MAX);
		Double todayRevenue = orderRepository.sumTotalAmountByStatusAndCreatedAtBetween("Hoàn thành", startOfToday,
				endOfToday);
		res.setTodayRevenue(todayRevenue != null ? todayRevenue : 0);

		// Doanh thu tháng này
		YearMonth currentMonth = YearMonth.now();
		LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
		LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(LocalTime.MAX);
		Double monthRevenue = orderRepository.sumTotalAmountByStatusAndCreatedAtBetween("Hoàn thành", startOfMonth,
				endOfMonth);
		monthRevenue = (monthRevenue != null) ? monthRevenue : 0.0;
		res.setMonthRevenue(monthRevenue != null ? monthRevenue : 0.0);
		
		// 🟩 1. Tính sản phẩm bán chạy nhất trong tháng
		PageRequest pageRequest = PageRequest.of(0, 1);
		List<Object[]> bestProducts = orderItemRepository.findTopSellingProductOfMonth(startOfMonth, endOfMonth, pageRequest);
		if (bestProducts != null && !bestProducts.isEmpty()) {
			Object[] bestProduct = bestProducts.get(0); // lấy sản phẩm đầu tiên (bán chạy nhất)
			TopSellingProductDTO productDTO = new TopSellingProductDTO();
			// Ép kiểu dữ liệu chính xác
			productDTO.setName((String) bestProduct[0]);
			// Nếu dùng SUM(i.quantity) thì kiểu có thể là Long hoặc Double tùy vào DB
			// (MySQL, PostgreSQL...)
			// Kiểm tra và ép kiểu an toàn:
			Object quantityObj = bestProduct[1];
			double currentQuantity = 0.0;
			if (quantityObj instanceof Long) {
		        currentQuantity = ((Long) quantityObj).doubleValue();
		    } else if (quantityObj instanceof Double) {
		        currentQuantity = (Double) quantityObj;
		    } else if (quantityObj instanceof Integer) {
		        currentQuantity = ((Integer) quantityObj).doubleValue();
		    }
		    productDTO.setSoldQuantity(currentQuantity);
			// Tính growth thật
		    LocalDateTime startOfLastMonth = startOfMonth.minusMonths(1);
		    LocalDateTime endOfLastMonth = startOfMonth.minusDays(1);
		    // Lấy số lượng bán được của sản phẩm này trong tháng trước (bằng tên)
		    Double lastMonthQuantity = orderItemRepository.findQuantitySoldOfProductByName(
		        productDTO.getName(), startOfLastMonth, endOfLastMonth
		    );
		    double growth;
		    if (lastMonthQuantity != null && lastMonthQuantity > 0) {
		        growth = ((currentQuantity - lastMonthQuantity) / lastMonthQuantity) * 100.0;
		    } else if (lastMonthQuantity != null && lastMonthQuantity == 0) {
		        growth = 100.0; // mới xuất hiện
		    } else {
		        growth = 0.0; // fallback
		    }
		    productDTO.setGrowth(round(growth));
			// Các trường cố định
			productDTO.setUnit("cái"); // có thể thay bằng "cái", "kg", v.v. tuỳ sản phẩm
			res.setTopSellingProduct(productDTO);
		}

		// 🟪 2. Tính số khách hàng mới trong tháng
		long currentNew = accountRepository.countNewCustomersBetween(startOfMonth, endOfMonth);
		// giả sử bạn có tháng trước để so sánh
		YearMonth lastMonth = currentMonth.minusMonths(1);
		LocalDateTime startLastMonth = lastMonth.atDay(1).atStartOfDay();
		LocalDateTime endLastMonth = lastMonth.atEndOfMonth().atTime(LocalTime.MAX);
		long previousNew = accountRepository.countNewCustomersBetween(startLastMonth, endLastMonth);

		NewCustomerStatsDTO newCustomer = new NewCustomerStatsDTO();
		newCustomer.setCount((int) currentNew);
		double customerGrowth = previousNew > 0 ? ((double) (currentNew - previousNew) / previousNew) * 100 : 0;
		newCustomer.setGrowth(round(customerGrowth));
		res.setNewCustomers(newCustomer);

		// 🟧 3. Tính tỷ lệ tăng trưởng doanh thu tháng
		Double prevMonthRevenue = orderRepository.sumTotalAmountByStatusAndCreatedAtBetween("Hoàn thành",
				startLastMonth, endLastMonth);
		double revenueGrowth = prevMonthRevenue != null && prevMonthRevenue > 0
				? ((monthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100
				: 0;

		GrowthRateDTO growthRate = new GrowthRateDTO();
		growthRate.setValue(round((monthRevenue / res.getTotalRevenue()) * 100));
		growthRate.setGrowth(round(revenueGrowth));
		res.setGrowthRate(growthRate);

		return res;
	}

	private double round(double value) {
		return Math.round(value * 10.0) / 10.0;
	}

}
