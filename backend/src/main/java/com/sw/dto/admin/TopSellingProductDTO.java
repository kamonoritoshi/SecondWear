package com.sw.dto.admin;

import lombok.Data;

@Data
public class TopSellingProductDTO {
	private String name;
    private double soldQuantity;
    private String unit;
    private double growth; // tăng trưởng %
}
