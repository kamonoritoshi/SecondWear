package com.sw.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDetailsDTO {
    private Long productId;
    private String name;
    private String description;
    private String condition;
    private String size;
    private String color;
    private BigDecimal price;
    private String status;
    private Integer quantity;
    private String brand;
    private String origin;
    private Boolean approved;

    private Long categoryId;
    private String categoryName;

    private List<String> imageUrls;
    private String shopName;
    private String shopAddress; // ✅ thêm vào cuối
    
    private Long accountId;

}
