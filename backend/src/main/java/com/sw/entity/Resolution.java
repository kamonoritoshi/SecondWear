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
@Table(name = "Resolution")
public class Resolution {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "resolution_id")
    private Long resolutionId;

    @OneToOne
    @JoinColumn(name = "complaint_id", nullable = false, unique = true)
    private Complaint complaint;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String result;

    @Column(name = "resolution_date")
    private LocalDateTime resolutionDate;

    @PrePersist
    protected void onCreate() {
        resolutionDate = LocalDateTime.now();
    }
}
