package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.CartDTO;
import com.ecommerce.backend.dto.CartItemDTO;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartItem;
import com.ecommerce.backend.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartItemMapper {

    CartItem toEntity(CartItemDTO cartItemDTO) {

        if (cartItemDTO == null) { return null; }

        CartItem cartItem = new CartItem();

        cartItem.setId(cartItemDTO.getId());
        cartItem.setQuantity(cartItemDTO.getQuantity());

        Product product = new Product();

        product.setId(cartItemDTO.getProductId());
        product.setName(cartItemDTO.getProductName());
        product.setPrice(cartItemDTO.getProductPrice());

        Cart cart = new Cart();

        cart.setId(cartItem.getId());

        cartItem.setCart(cart);

        return cartItem;
    }

    CartItemDTO toDTO(CartItem cartItem) {

        if (cartItem == null) { return null; }

        CartItemDTO cartItemDTO = new CartItemDTO();

        cartItemDTO.setId(cartItem.getId());
        cartItemDTO.setQuantity(cartItem.getQuantity());
        cartItemDTO.setProductId(cartItem.getProduct().getId());
        cartItemDTO.setProductPrice(cartItem.getProduct().getPrice());
        cartItemDTO.setProductName(cartItem.getProduct().getName());
        cartItemDTO.setSubtotal(cartItem.getQuantity() * cartItem.getProduct().getPrice());

        return cartItemDTO;
    }
}
