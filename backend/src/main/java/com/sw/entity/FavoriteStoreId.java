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
public class FavoriteStoreId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long userAccountId;
	private Long storeAccountId;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		FavoriteStoreId that = (FavoriteStoreId) o;
		return Objects.equals(userAccountId, that.userAccountId) && Objects.equals(storeAccountId, that.storeAccountId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userAccountId, storeAccountId);
	}

}
