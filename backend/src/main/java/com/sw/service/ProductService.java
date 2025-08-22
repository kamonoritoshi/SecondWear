package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.ProductRepository;
import com.sw.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private FavoriteService favoriteService;

	public List<Product> getAllProducts() {
		List<Product> products = productRepository.findAll();
		// Ép Hibernate load danh sách ảnh
		for (Product p : products) {
			p.getImages().size(); // force lazy load
		}
		return products;
	}

	public Product getProductById(Long id) {
		Product p = productRepository.findById(id).orElse(null);
		if (p != null) {
			p.getImages().size(); // ép load ảnh
		}
		return p;
	}

	public Product createProduct(Product product) {
		return productRepository.save(product);
	}

	public Product updateProduct(Long id, Product product) {
		Product existing = productRepository.findById(id).orElse(null);
		if (existing == null)
			return null;

		existing.setName(product.getName());
		existing.setPrice(product.getPrice());
		existing.setDescription(product.getDescription());
		existing.setCondition(product.getCondition());
		existing.setSize(product.getSize());
		existing.setColor(product.getColor());
		existing.setStatus(product.getStatus());
		return productRepository.save(existing);
	}

	public void deleteProduct(Long id) {
		productRepository.deleteById(id);
	}

	public Page<Product> getAllApprovedProducts(Pageable pageable) {
		return productRepository.findAllApproved(pageable);
	}

	public List<Product> searchProductsByName(String name) {
		return productRepository.findByNameContainingIgnoreCase(name);
	}

	public List<Product> getProductsByCategory(Integer categoryId) {
		return productRepository.findByCategory_CategoryId(categoryId);
	}

	public Product approve(Long id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

		product.setApproved((byte) 1);
		return productRepository.save(product);
	}

	public Product getProductById(Long id, Long currentAccountId) {
		Product product = productRepository.findById(id).orElse(null);
		if (product != null && currentAccountId != null) {
			// Kiểm tra và set trạng thái isFavorited
			boolean isFavorited = favoriteService.isProductFavoritedByUser(currentAccountId, id);
			product.setFavorited(isFavorited);
		}
		return product;
	}

}
