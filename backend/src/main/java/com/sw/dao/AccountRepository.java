package com.sw.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	Optional<Account> findByUser_Email(String email);
}
