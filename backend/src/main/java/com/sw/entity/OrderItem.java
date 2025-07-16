package com.sw.entity;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "[OrderItem]")
public class OrderItem {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_item_id")
    private Long orderItemId;

	@ManyToOne
	@JoinColumn(name = "order_id")
	@JsonBackReference // ✅ cặp với @JsonManagedReference bên Order
	private Order order;

	@ManyToOne
	@JoinColumn(name = "product_id")
	@JsonIgnoreProperties("account") // ✅ tránh vòng lặp Product → Account → Order
	private Product product;

    private Integer quantity;

    private BigDecimal price; // giá tại thời điểm mua
    
    @Column(nullable = false)
    private String status; // trạng thái riêng của từng sản phẩm trong đơn hàng
}
