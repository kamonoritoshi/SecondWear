package com.sw.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private String description;
    private String condition;
    private String size;
    private String color;
    private BigDecimal price;
    private String status;
    private Integer quantity;
    private Long categoryId;
    private String brand;
    private String origin;
    private Byte approved;
    private String rejectReason;
}
