package com.sw.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sw.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	@Query("SELECT a FROM Account a WHERE a.user.email = :email AND a.role.roleName = :roleName")
	Optional<Account> findByEmailAndRole(@Param("email") String email, @Param("roleName") String roleName);

	Optional<Account> findByUser_Email(String email);

	@Query("SELECT COUNT(a) FROM Account a WHERE a.role.roleName = :roleName")
	long countByRoleName(@Param("roleName") String roleName);

	@Query("SELECT a FROM Account a " +
		       "WHERE (:role IS NULL OR a.role.roleName = :role) " +
		       "AND (:status IS NULL OR a.status = :status) " +
		       "AND (:keyword IS NULL OR LOWER(a.user.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
		       "OR LOWER(a.user.name) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	Page<Account> findByFilters(@Param("role") String role, @Param("status") String status,
			@Param("keyword") String keyword, Pageable pageable);
	
	@Query("SELECT COUNT(a) FROM Account a WHERE a.role.roleName = 'customer' AND a.createdAt BETWEEN :start AND :end")
	long countNewCustomersBetween(LocalDateTime start, LocalDateTime end);
	
	List<Account> findBySellerStatus(Account.SellerStatus status);
	
	@Query("SELECT a FROM Account a WHERE a.role.roleName = 'seller' AND a.sellerStatus = 'APPROVED'")
    List<Account> findApprovedSellers();
	
	@Query("SELECT a FROM Account a WHERE a.role.roleName = 'CUSTOMER'")
    List<Account> findAllCustomers();
}
