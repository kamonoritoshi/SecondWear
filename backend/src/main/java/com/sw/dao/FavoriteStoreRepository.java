package com.sw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.FavoriteStore;
import com.sw.entity.FavoriteStoreId;

public interface FavoriteStoreRepository extends JpaRepository<FavoriteStore, FavoriteStoreId> {
	List<FavoriteStore> findById_UserAccountId(Long userAccountId);
}
