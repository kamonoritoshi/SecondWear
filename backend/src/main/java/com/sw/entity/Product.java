package com.sw.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"Product\"")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Long productId;
	
	@Column(name = "approved")
    private Byte approved = 0;
	
	@Column(name = "reject_reason")
    private String rejectReason;

	@ManyToOne
	@JoinColumn(name = "account_id", nullable = false)
	@JsonIgnoreProperties({"orders", "role", "password", "status", "createdAt", "hibernateLazyInitializer", "handler"})
	private Account account;

	private String name;
	
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("product") // ✅ thay vì @JsonManagedReference
	private List<ProductImage> images = new ArrayList<>();

	
    private String description;
    private String condition;
    private String size;
    private String color;
    private BigDecimal price;
    private String status;
    private Integer quantity;
    private String brand;
    private String origin;
    
    @JsonIgnoreProperties("products")
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
