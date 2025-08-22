package com.sw.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class StoreDTO {
	private Long accountId;
    private String storeName;
    private String address;
    @JsonProperty("isFavorited")
    private boolean isFavorited; // Cho biết người dùng hiện tại có thích cửa hàng này không
    private List<ProductDTO> products;
}
