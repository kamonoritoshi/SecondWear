package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dto.StoreDTO;
import com.sw.security.CustomUserDetails;
import com.sw.service.FavoriteStoreService;

@RestController
@RequestMapping("/api/favorites/stores")
public class FavoriteStoreController {
	@Autowired
    private FavoriteStoreService favoriteStoreService;

	@GetMapping
    public ResponseEntity<List<StoreDTO>> getMyFavoriteStores(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getAccount().getAccountId();
        List<StoreDTO> stores = favoriteStoreService.getFavoriteStoresByAccountId(userId);
        return ResponseEntity.ok(stores);
    }
	
    @PostMapping("/{storeId}")
    public ResponseEntity<?> toggleFavoriteStore(
            @PathVariable Long storeId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        
        Long userId = userDetails.getAccount().getAccountId();
        
        // Không cho phép người dùng tự yêu thích cửa hàng của mình
        if (userId.equals(storeId)) {
            return ResponseEntity.badRequest().body("You cannot favorite your own store.");
        }

        boolean isFavorited = favoriteStoreService.toggleFavoriteStore(userId, storeId);
        return ResponseEntity.ok().body(isFavorited);
    }
}
