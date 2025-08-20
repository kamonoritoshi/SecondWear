package com.sw.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"Role\"")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id")
	private Long roleId;
	
	@Column(name = "role_name", nullable = false, unique = true)
    private String roleName;
	
	@OneToMany(mappedBy = "role")
	@JsonIgnore // ✅ Hoặc dùng @JsonBackReference
	private List<Account> accounts;
	
	@Override
	public String toString() {
	    return "Role{" +
	            "roleId=" + roleId +
	            ", roleName='" + roleName + '\'' +
	            '}';
	}
}
