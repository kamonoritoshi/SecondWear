package com.sw.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "\"Favorite_stores\"")
@Data
@NoArgsConstructor
public class FavoriteStore {
	@EmbeddedId
	private FavoriteStoreId id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("userAccountId")
	@JoinColumn(name = "user_account_id")
	private Account userAccount;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("storeAccountId")
	@JoinColumn(name = "store_account_id")
	private Account storeAccount;

	public FavoriteStore(Account userAccount, Account storeAccount) {
		this.userAccount = userAccount;
		this.storeAccount = storeAccount;
		this.id = new FavoriteStoreId(userAccount.getAccountId(), storeAccount.getAccountId());
	}
}
