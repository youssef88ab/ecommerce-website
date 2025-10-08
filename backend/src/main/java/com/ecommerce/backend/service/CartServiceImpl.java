package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CartDTO;
import com.ecommerce.backend.dto.CartItemDTO;

public class CartServiceImpl implements  CartService {
    @Override
    public CartDTO getCartByUserId(Long userId) {
        return null;
    }

    @Override
    public CartDTO createCart(Long userId) {
        return null;
    }

    @Override
    public CartDTO addItemToCart(Long userId, Long productId, int Quantity) {
        return null;
    }

    @Override
    public CartDTO updateItemQuantity(Long userId, Long productId, int newQuantity) {
        return null;
    }

    @Override
    public CartDTO removeItemFromCart(Long userId, CartItemDTO cartItem) {
        return null;
    }

    @Override
    public void clearCart(Long userId) {

    }
}
