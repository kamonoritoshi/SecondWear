package com.sw.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Shipping")
public class Shipping {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shippingId;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    private String carrier;

    @Column(nullable = false)
    private String status;

    private LocalDateTime shippingDate;

    // Optionally auto-set shippingDate if needed
    @PrePersist
    protected void onCreate() {
        if (shippingDate == null) {
            shippingDate = LocalDateTime.now();
        }
    }
}
