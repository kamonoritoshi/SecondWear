package com.sw.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sw.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	@Query("SELECT a.user FROM Account a WHERE a.accountId = :accountId")
	User findUserByAccountId(@Param("accountId") Long accountId);
	Optional<User> findByEmail(String email);
}
