package com.sw.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "Account", schema = "dbo")
public class Account {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_id")
    private Long accountId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"accounts"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String status;
    
    @CreationTimestamp
    @Column(name = "create_at", updatable = false)
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "account")
    @JsonIgnore // ✅ tránh vòng lặp khi serialize
    private List<Order> orders;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "seller_status", nullable = false)
    private SellerStatus sellerStatus = SellerStatus.NONE;

    @Column(name = "reject_reason")
    private String rejectReason;

    public enum SellerStatus {
        NONE,
        PENDING,
        APPROVED,
        REJECTED
    }
}
