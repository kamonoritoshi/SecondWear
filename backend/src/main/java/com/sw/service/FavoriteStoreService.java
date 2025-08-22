package com.sw.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sw.dao.AccountRepository;
import com.sw.dao.FavoriteStoreRepository;
import com.sw.dto.StoreDTO;
import com.sw.entity.Account;
import com.sw.entity.FavoriteStore;
import com.sw.entity.FavoriteStoreId;

@Service
public class FavoriteStoreService {
	@Autowired
    private FavoriteStoreRepository favoriteStoreRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public boolean toggleFavoriteStore(Long userAccountId, Long storeAccountId) {
        FavoriteStoreId favoriteId = new FavoriteStoreId(userAccountId, storeAccountId);

        if (favoriteStoreRepository.existsById(favoriteId)) {
            // Nếu đã thích -> Bỏ thích
            favoriteStoreRepository.deleteById(favoriteId);
            return false; // Trả về false (không còn yêu thích)
        } else {
            // Nếu chưa thích -> Thêm vào danh sách yêu thích
            Account userAccount = accountRepository.findById(userAccountId)
                    .orElseThrow(() -> new RuntimeException("User account not found"));
            Account storeAccount = accountRepository.findById(storeAccountId)
                    .orElseThrow(() -> new RuntimeException("Store account not found"));

            FavoriteStore favoriteStore = new FavoriteStore(userAccount, storeAccount);
            favoriteStoreRepository.save(favoriteStore);
            return true; // Trả về true (đã yêu thích)
        }
    }

    public boolean isStoreFavoritedByUser(Long userAccountId, Long storeAccountId) {
        if (userAccountId == null) {
            return false;
        }
        FavoriteStoreId favoriteId = new FavoriteStoreId(userAccountId, storeAccountId);
        return favoriteStoreRepository.existsById(favoriteId);
    }
    
    @Transactional(readOnly = true)
    public List<StoreDTO> getFavoriteStoresByAccountId(Long userAccountId) {
        return favoriteStoreRepository.findById_UserAccountId(userAccountId)
                .stream()
                .map(FavoriteStore::getStoreAccount)
                .map(storeAccount -> {
                    StoreDTO dto = new StoreDTO();
                    dto.setAccountId(storeAccount.getAccountId());
                    dto.setStoreName(storeAccount.getUser().getName());
                    dto.setAddress(storeAccount.getUser().getAddress());
                    // Vì đây là danh sách yêu thích, isFavorited luôn là true
                    dto.setFavorited(true); 
                    // Không cần tải danh sách sản phẩm ở đây để tối ưu hiệu năng
                    dto.setProducts(null); 
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
