package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
