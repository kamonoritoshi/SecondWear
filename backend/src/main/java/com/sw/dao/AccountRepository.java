package com.sw.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sw.entity.Account;
import com.sw.entity.Role;

public interface AccountRepository extends JpaRepository<Account, Long> {
	@Query("SELECT a FROM Account a WHERE a.user.email = :email AND a.role.roleName = :roleName")
	Optional<Account> findByEmailAndRole(@Param("email") String email, @Param("roleName") String roleName);

	Optional<Account> findByUser_Email(String email);

	@Query("SELECT COUNT(a) FROM Account a WHERE a.role.roleName = :roleName")
	long countByRoleName(@Param("roleName") String roleName);
}
