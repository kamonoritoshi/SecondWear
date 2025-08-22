package com.sw.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sw.dao.AccountRepository;
import com.sw.dao.ProductRepository;
import com.sw.dto.ProductDTO;
import com.sw.dto.StoreDTO;
import com.sw.entity.Account;
import com.sw.entity.Product;

@Service
public class StoreService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private FavoriteStoreService favoriteStoreService;

    // Phương thức helper để chuyển đổi Product sang ProductDTO
    private ProductDTO convertToProductDto(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            dto.setImageUrls(product.getImages().stream().map(img -> img.getImageUrl()).collect(Collectors.toList()));
        } else {
            dto.setImageUrls(Collections.emptyList());
        }
        return dto;
    }

    @Transactional(readOnly = true)
    public StoreDTO getStoreDetails(Long storeAccountId, Long currentUserId) {
        Account storeAccount = accountRepository.findById(storeAccountId)
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + storeAccountId));

        // Lấy danh sách sản phẩm đã được duyệt của cửa hàng
        List<Product> approvedProducts = productRepository.findByAccount_AccountIdAndApproved(storeAccountId, (byte) 1);

        // Chuyển đổi danh sách Product sang ProductDTO
        List<ProductDTO> productDTOs = approvedProducts.stream()
                .map(this::convertToProductDto)
                .collect(Collectors.toList());

        // Tạo đối tượng StoreDTO để trả về
        StoreDTO storeDTO = new StoreDTO();
        storeDTO.setAccountId(storeAccount.getAccountId());
        storeDTO.setStoreName(storeAccount.getUser().getName());
        storeDTO.setAddress(storeAccount.getUser().getAddress());
        storeDTO.setProducts(productDTOs);
        
        // Sửa lỗi: Sử dụng favoriteService để kiểm tra trạng thái yêu thích
        boolean isFavorited = favoriteStoreService.isStoreFavoritedByUser(currentUserId, storeAccountId);
        storeDTO.setFavorited(isFavorited); 

        return storeDTO;
    }
}
