package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CartDTO;
import com.ecommerce.backend.dto.CartItemDTO;

public interface CartService {

    // * Read: Retrieves the active shopping cart for a given user.
    CartDTO getCartByUserId(Long userId);

    // * Create: Creates a new, empty cart for a user (often done upon registration or first visit).
    CartDTO createCart(Long userId);

    // * Adds a specific quantity of a product to the user's cart, handling existing items.
    CartDTO addItemToCart(Long userId , Long productId , int Quantity);

    // * Modifies the quantity of an item already in the cart.
    CartDTO updateItemQuantity(Long userId , Long productId , int newQuantity);

    // * Removes a specific product entirely from the cart.
    CartDTO removeItemFromCart(Long userId , CartItemDTO cartItem);

    // * Empties all items from the user's cart (usually after a successful checkout).
    void clearCart(Long userId);
}
