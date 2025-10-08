package com.ecommerce.backend.dto;

import java.util.List;

public class CartDTO {
    private Long id;
    private Long userId;
    private List<CartItemDTO> items;
    private double totalPrice;
}