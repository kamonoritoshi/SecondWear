package com.sw.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	Optional<Role> findByRoleName(String roleName);
}
