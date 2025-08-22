package com.sw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dto.StoreDTO;
import com.sw.security.CustomUserDetails;
import com.sw.service.StoreService;

@RestController
@RequestMapping("/api/stores")
public class StoreController {
	@Autowired
    private StoreService storeService;

    @GetMapping("/{storeId}")
    public ResponseEntity<StoreDTO> getStorePage(@PathVariable Long storeId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            // Lấy ID người dùng hiện tại (nếu đã đăng nhập)
            Long currentUserId = (userDetails != null) ? userDetails.getAccount().getAccountId() : null;
            
            StoreDTO storeData = storeService.getStoreDetails(storeId, currentUserId);
            return ResponseEntity.ok(storeData);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
