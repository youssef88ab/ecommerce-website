package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CartDTO;
import com.ecommerce.backend.dto.CartItemDTO;
import com.ecommerce.backend.mapper.CartMapper;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements  CartService {

    private final CartRepository cartRepository ;
    private final CartMapper cartMapper ;

    // * Get Cart By User Id
    @Override
    public CartDTO getCartByUserId(Long userId) {

        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);

        // * If Cart Exist
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();

            return cartMapper.toDto(cart);
        }

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
