package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
