package com.sw.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Complaint")
public class Complaint {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "complaint_id")
    private Long complaintId;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(nullable = false)
    private String status;

    @Column(name = "complaint_date")
    private LocalDateTime complaintDate;

    @PrePersist
    protected void onCreate() {
        complaintDate = LocalDateTime.now();
    }
}
