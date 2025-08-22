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
@Table(name = "\"Favorite_products\"") // Tên bảng có dấu ngoặc kép
@Data
@NoArgsConstructor
public class FavoriteProduct {
	
	@EmbeddedId
    private FavoriteProductId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("accountId") // Ánh xạ tới thuộc tính accountId trong FavoriteProductId
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId") // Ánh xạ tới thuộc tính productId trong FavoriteProductId
    @JoinColumn(name = "product_id")
    private Product product;

    public FavoriteProduct(Account account, Product product) {
        this.account = account;
        this.product = product;
        this.id = new FavoriteProductId(account.getAccountId(), product.getProductId());
    }
}
