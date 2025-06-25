package com.sw.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sw.dao.ProductImageRepository;
import com.sw.entity.Product;
import com.sw.entity.ProductImage;

@Service
public class ProductImageService {
	@Autowired
	private ProductImageRepository productImageRepo;

	public List<ProductImage> getImagesByProductId(Long productId) {
		return productImageRepo.findByProduct_ProductId(productId);
	}

	public ProductImage addImage(Product product, String imageUrl) {
		ProductImage image = new ProductImage();
		image.setProduct(product);
		image.setImageUrl(imageUrl);
		return productImageRepo.save(image);
	}

	public void deleteImage(Long imageId) {
		productImageRepo.deleteById(imageId);
	}
}
