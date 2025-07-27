package com.sw.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sw.entity.Order;
import com.sw.entity.Account;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	@EntityGraph(attributePaths = { "payment", "items.product.account.user", "account.user" })
	List<Order> findAll();

	// Tìm đơn hàng theo trạng thái
	List<Order> findByStatus(String status); //

	// Tìm đơn hàng theo tài khoản và trạng thái
	List<Order> findByAccountAndStatus(Account account, String status);

	// Lấy tất cả đơn hàng sắp xếp theo thời gian đặt hàng (mặc định là orderDate)
	List<Order> findAllByOrderByOrderDateDesc(); //

	@Query("SELECT DISTINCT o FROM Order o " + "JOIN o.items i " + "JOIN i.product p "
			+ "WHERE p.account.accountId = :sellerId " + "ORDER BY o.orderDate DESC")
	List<Order> findOrdersBySeller(@Param("sellerId") Long sellerId);

	List<Order> findByAccount_AccountId(Long accountId);

	@Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status = :status")
	double sumTotalAmountByStatus(@Param("status") String status);

	List<Order> findTop5ByOrderByOrderDateDesc();

	@Query("SELECT MONTH(o.orderDate), SUM(o.totalAmount) "
			+ "FROM Order o WHERE YEAR(o.orderDate) = :year AND o.status = 'Hoàn thành' "
			+ "GROUP BY MONTH(o.orderDate) ORDER BY MONTH(o.orderDate)")
	List<Object[]> sumRevenueByMonth(@Param("year") int year);

	@Query("SELECT o.status, COUNT(o.id) FROM Order o GROUP BY o.status")
	List<Object[]> countOrdersByStatus();

	@Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = :status AND o.orderDate BETWEEN :start AND :end")
	Double sumTotalAmountByStatusAndCreatedAtBetween(@Param("status") String status,
			@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

	@Query("SELECT DISTINCT o FROM Order o " + "JOIN o.items i " + "JOIN i.product p "
			+ "WHERE p.account.accountId = :sellerId " + "ORDER BY o.orderDate DESC")
	List<Order> findRecentOrdersBySeller(@Param("sellerId") Long sellerId, Pageable pageable);

	@Query("SELECT FUNCTION('FORMAT', o.orderDate, 'yyyy-MM') AS month, SUM(o.totalAmount) "
			+ "FROM Order o JOIN o.items i "
			+ "WHERE i.product.account.accountId = :sellerId AND o.status = 'Hoàn thành' "
			+ "GROUP BY FUNCTION('FORMAT', o.orderDate, 'yyyy-MM') " + "ORDER BY month")
	List<Object[]> getMonthlyRevenueBySeller(@Param("sellerId") Long sellerId);

	@Query(value = """
			SELECT YEAR(o.order_date) AS year, DATEPART(WEEK, o.order_date) AS week, SUM(o.total_amount) AS revenue
			FROM [Order] o
			JOIN OrderItem i ON o.order_id = i.order_id
			JOIN Product p ON i.product_id = p.product_id
			WHERE p.account_id = :sellerId AND o.status IN (N'Hoàn thành', N'Đã giao')
			GROUP BY YEAR(o.order_date), DATEPART(WEEK, o.order_date)
			ORDER BY year, week
			""", nativeQuery = true)
	List<Object[]> getWeeklyRevenueBySeller(@Param("sellerId") Long sellerId);

	@Query("SELECT o.status, COUNT(o) " + "FROM Order o JOIN o.items i "
			+ "WHERE i.product.account.accountId = :sellerId " + "GROUP BY o.status")
	List<Object[]> countOrdersByStatusForSeller(@Param("sellerId") Long sellerId);

	@Query("""
			SELECT FUNCTION('FORMAT', o.orderDate, 'MM') AS month,
			       SUM(oi.price * oi.quantity) AS revenue,
			       COUNT(DISTINCT o.orderId) AS orderCount
			FROM Order o
			JOIN o.items oi
			JOIN oi.product p
			WHERE p.account.accountId = :sellerId
			GROUP BY FUNCTION('FORMAT', o.orderDate, 'MM')
			ORDER BY month
			""")
	List<Object[]> sumRevenueAndOrdersByMonth(@Param("sellerId") Long sellerId);

	@Query("""
			    SELECT p.name, SUM(oi.quantity)
			    FROM OrderItem oi
			    JOIN oi.product p
			    JOIN oi.order o
			    WHERE o.status = 'Hoàn thành'
			    GROUP BY p.productId, p.name
			    ORDER BY SUM(oi.quantity) DESC
			    LIMIT 10
			""")
	List<Object[]> findTopSellingProducts();
}
