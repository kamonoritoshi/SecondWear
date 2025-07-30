package com.sw.chatbot.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSuggestion {
	private Long id;
    private String name;
    private BigDecimal price;
    private String image;
}
