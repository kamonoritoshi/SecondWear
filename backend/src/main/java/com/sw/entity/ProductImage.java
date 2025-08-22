package com.sw.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"ProductImage\"")
public class ProductImage {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
    private Long imageId;

	@Column(name = "image_url")
    private String imageUrl;

	@ManyToOne
	@JoinColumn(name = "product_id")
	@JsonIgnoreProperties("images") // ✅ tránh vòng lặp khi trả Product → Image → Product → ...
	private Product product;

}
