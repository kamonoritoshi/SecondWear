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
	private ProductRepository pDAO;
	
	public List<Product> getAllProducts() {
		return pDAO.findAll();
	}
	
	public Product getProductById(Long id) {
        return pDAO.findById(id).orElse(null);
    }

    public Product createProduct(Product product) {
        return pDAO.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Product existing = pDAO.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setDescription(product.getDescription());
        existing.setCondition(product.getCondition());
        existing.setSize(product.getSize());
        existing.setColor(product.getColor());
        existing.setImage(product.getImage());
        existing.setStatus(product.getStatus());
        return pDAO.save(existing);
    }

    public void deleteProduct(Long id) {
    	pDAO.deleteById(id);
    }
    
    public Page<Product> getAllProducts(Pageable pageable) {
        return pDAO.findAll(pageable);
    }

    public List<Product> searchProductsByName(String name) {
        return pDAO.findByNameContainingIgnoreCase(name);
    }
}
