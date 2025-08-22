package com.sw.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dto.ProductDTO;
import com.sw.security.CustomUserDetails;
import com.sw.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
	
	@Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getMyFavorites(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long accountId = userDetails.getAccount().getAccountId();
        List<ProductDTO> favoriteProducts = favoriteService.getFavoritesByAccountId(accountId)
            .stream()
            // Lọc các sản phẩm đã được duyệt
            .filter(p -> p.getApproved() != null && p.getApproved() == 1)
            .collect(Collectors.toList());
        return ResponseEntity.ok(favoriteProducts);
    }

    @PostMapping("/{productId}")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long productId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long accountId = userDetails.getAccount().getAccountId();
        boolean isFavorited = favoriteService.toggleFavorite(accountId, productId);
        return ResponseEntity.ok().body(isFavorited); // Trả về trạng thái mới
    }
    
    @GetMapping("/{productId}/status")
    public ResponseEntity<Boolean> getFavoriteStatus(@PathVariable Long productId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.ok(false); // Nếu không đăng nhập, không yêu thích
        }
        Long accountId = userDetails.getAccount().getAccountId();
        boolean isFavorited = favoriteService.isProductFavoritedByUser(accountId, productId);
        return ResponseEntity.ok(isFavorited);
    }
}
