package com.sw.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.sw.dao.OrderRepository;
import com.sw.dao.PaymentRepository;
import com.sw.dao.ProductRepository;
import com.sw.dto.OrderWithPaymentDTO;
import com.sw.dto.admin.OrderRateDTO;
import com.sw.dto.admin.RecentOrderDTO;
import com.sw.dto.admin.RevenueByMonthDTO;
import com.sw.dto.admin.TopProductDTO;
import com.sw.entity.Account;
import com.sw.entity.Order;
import com.sw.entity.OrderItem;
import com.sw.entity.Payment;
import com.sw.entity.Product;
import com.sw.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private PaymentRepository paymentRepository;

	// Lấy tất cả đơn hàng
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	// Lấy đơn hàng theo ID
	public Order getOrderById(Long id) {
		return orderRepository.findById(id).orElse(null);
	}

	// Tạo đơn hàng mới
	public Order createOrder(Order order) {
	    List<OrderItem> items = order.getItems();
	    BigDecimal total = BigDecimal.ZERO;

	    for (OrderItem item : items) {
	        Long productId = item.getProduct().getProductId();

	        Product product = productRepository.findById(productId)
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + productId));

	        // ✅ Kiểm tra trạng thái
	        if (product.getApproved() != 1) {
	            throw new RuntimeException("Sản phẩm '" + product.getName() + "' chưa được duyệt.");
	        }

	        // ✅ Kiểm tra tồn kho
	        if (item.getQuantity() > product.getQuantity()) {
	            throw new RuntimeException("Sản phẩm '" + product.getName() + "' không đủ tồn kho.");
	        }

	        // ✅ Trừ tồn kho
	        product.setQuantity(product.getQuantity() - item.getQuantity());

	        // ✅ Lưu lại thay đổi
	        productRepository.save(product);

	        // Gán giá và tính tổng
	        item.setPrice(product.getPrice());
	        item.setOrder(order);
	        total = total.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
	    }

	    order.setItems(items);
	    order.setTotalAmount(total);
	    order.setStatus("Đang xử lý");

	    return orderRepository.save(order);
	}


	// Cập nhật đơn hàng
	public Order updateOrder(Long id, Order updatedOrder) {
		Order existing = orderRepository.findById(id).orElse(null);
		if (existing == null)
			return null;

		existing.setAccount(updatedOrder.getAccount());
		existing.setStatus(updatedOrder.getStatus());
		existing.setTotalAmount(updatedOrder.getTotalAmount());

		return orderRepository.save(existing);
	}

	// Xoá đơn hàng
	public void deleteOrder(Long id) {
		orderRepository.deleteById(id);
	}

	// Lấy đơn hàng theo accountId
	public List<OrderWithPaymentDTO> getOrdersByAccount(Long accountId) {
		List<Order> orders = orderRepository.findByAccount_AccountId(accountId);
		List<OrderWithPaymentDTO> result = new ArrayList<>();

		for (Order order : orders) {
			Payment payment = paymentRepository.findByOrder_OrderId(order.getOrderId());
			String method = (payment != null) ? payment.getMethod() : "COD";
			result.add(new OrderWithPaymentDTO(order, method));
		}

		return result;
	}

	// Lấy đơn hàng theo status (chuỗi)
	public List<Order> getOrdersByStatus(String status) {
		return orderRepository.findByStatus(status);
	}

	// Lấy đơn hàng theo account + status
	public List<Order> getOrdersByAccountAndStatus(Long accountId, String status) {
		Account acc = new Account();
		acc.setAccountId(accountId);
		return orderRepository.findByAccountAndStatus(acc, status);
	}

	// Lấy tất cả đơn hàng, mới nhất trước
	public List<Order> getOrdersSortedByDateDesc() {
		return orderRepository.findAllByOrderByOrderDateDesc();
	}

	public Order updateOrderStatus(Long id, String status) {
		Order existing = orderRepository.findById(id).orElse(null);
		if (existing == null)
			return null;

		existing.setStatus(status);
		return orderRepository.save(existing);
	}

	public List<Order> getOrdersBySeller(Long sellerId) {
		return orderRepository.findOrdersBySeller(sellerId);
	}

	public void save(Order order) {
		orderRepository.save(order);
	}

	public List<Order> findTop10ByOrderByCreatedAtDesc() {
		return orderRepository.findTop5ByOrderByOrderDateDesc();
	}

	public List<RevenueByMonthDTO> getMonthlyRevenue() {
		List<Object[]> results = orderRepository.sumRevenueByMonth(LocalDate.now().getYear());
		return results.stream().map(row -> {
			RevenueByMonthDTO dto = new RevenueByMonthDTO();
			dto.setMonth((Integer) row[0]);
			dto.setTotalRevenue((BigDecimal) row[1]);
			return dto;
		}).collect(Collectors.toList());
	}
	
	public List<TopProductDTO> getTopSellingProducts() {
	    List<Object[]> rows = orderRepository.findTopSellingProducts();
	    return rows.stream().map(row -> {
	        TopProductDTO dto = new TopProductDTO();
	        dto.setProductName((String) row[0]);
	        dto.setTotalSold((Long) row[1]);
	        return dto;
	    }).collect(Collectors.toList());
	}

	public List<OrderRateDTO> getOrderStatusRate() {
		List<Object[]> results = orderRepository.countOrdersByStatus();
		return results.stream().map(row -> {
			OrderRateDTO dto = new OrderRateDTO();
			dto.setStatus((String) row[0]);
			dto.setCount((Long) row[1]);
			return dto;
		}).collect(Collectors.toList());
	}

	public List<RecentOrderDTO> getRecentOrders(Long sellerId) {
		Pageable top10 = PageRequest.of(0, 10);
		List<Order> orders = orderRepository.findRecentOrdersBySeller(sellerId, top10);

		return orders.stream().map(order -> {
			RecentOrderDTO dto = new RecentOrderDTO();
			dto.setOrderId(order.getOrderId());
			dto.setCustomerName(order.getAccount().getUser().getName());
			dto.setStatus(order.getStatus());
			dto.setOrderDate(order.getOrderDate());
			dto.setTotalAmount(order.getTotalAmount());
			return dto;
		}).collect(Collectors.toList());
	}

	public List<Object[]> getMonthlyRevenueBySeller(Long sellerId) {
		return orderRepository.getMonthlyRevenueBySeller(sellerId);
	}

	public List<Map<String, Object>> getWeeklyRevenue(Long sellerId) {
		List<Object[]> results = orderRepository.getWeeklyRevenueBySeller(sellerId);

		// Map lưu revenue theo key "year-week"
		Map<String, Double> revenueMap = new HashMap<>();
		for (Object[] row : results) {
			int year = ((Number) row[0]).intValue();
			int week = ((Number) row[1]).intValue();
			double revenue = ((Number) row[2]).doubleValue();

			String key = String.format("%d-W%02d", year, week);
			revenueMap.put(key, revenue);
		}

		// Lấy 8 tuần gần nhất
		LocalDate now = LocalDate.now();
		java.time.temporal.WeekFields weekFields = java.time.temporal.WeekFields.ISO;
		int currentWeek = now.get(weekFields.weekOfWeekBasedYear());
		int currentYear = now.getYear();

		List<Map<String, Object>> response = new ArrayList<>();
		for (int i = 7; i >= 0; i--) {
			LocalDate weekStart = now.minusWeeks(i);
			int week = weekStart.get(weekFields.weekOfWeekBasedYear());
			int year = weekStart.getYear();

			String key = String.format("%d-W%02d", year, week);
			double revenue = revenueMap.getOrDefault(key, 0.0);

			Map<String, Object> item = new HashMap<>();
			item.put("week", key);
			item.put("totalRevenue", revenue);
			response.add(item);
		}

		return response;
	}

	public List<Map<String, Object>> getOrderRates(Long sellerId) {
		List<Object[]> data = orderRepository.countOrdersByStatusForSeller(sellerId);
		List<Map<String, Object>> result = new ArrayList<>();

		for (Object[] row : data) {
			Map<String, Object> map = new HashMap<>();
			map.put("status", row[0]); // Trạng thái đơn hàng
			map.put("count", row[1]); // Số lượng
			result.add(map);
		}

		return result;
	}

	
}
