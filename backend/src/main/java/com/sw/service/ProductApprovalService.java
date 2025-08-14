package com.sw.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.ProductRepository;
import com.sw.entity.Product;

@Service
public class ProductApprovalService {

	@Autowired
    private ProductRepository productRepository;

    // Lấy danh sách sản phẩm chờ phê duyệt
    public List<Product> getPendingProducts() {
        return productRepository.findByApproved((byte) 0); // 0 = Chưa duyệt
    }

    // Phê duyệt sản phẩm
    public Optional<Product> approveProduct(Long id) {
        return productRepository.findById(id).map(product -> {
            product.setApproved((byte) 1); // 1 = Đã duyệt
            product.setRejectReason(null);
            return productRepository.save(product);
        });
    }

    // Từ chối sản phẩm
    public Optional<Product> rejectProduct(Long id, String reason) {
        return productRepository.findById(id).map(product -> {
            product.setApproved((byte) 2); // 2 = Từ chối
            product.setRejectReason(reason);
            return productRepository.save(product);
        });
    }
}