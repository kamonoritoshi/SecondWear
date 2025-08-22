package com.sw.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteProductId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long accountId;
    private Long productId;

    // Cần phải có equals và hashCode cho khóa phức hợp
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavoriteProductId that = (FavoriteProductId) o;
        return Objects.equals(accountId, that.accountId) &&
               Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountId, productId);
    }
}
