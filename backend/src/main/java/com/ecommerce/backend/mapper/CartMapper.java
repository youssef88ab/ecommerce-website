package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.CartDTO;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CartMapper {

    private final CartItemMapper cartItemMapper;

    public Cart toEntity(CartDTO cartDTO) {

        if (cartDTO == null) { return null; }

        Cart cart = new Cart();
        cart.setId(cartDTO.getId());
        cart.setTotalPrice(cartDTO.getTotalPrice());
        cart.setItems(cartDTO.getItems().stream().map(cartItemMapper::toEntity).collect(Collectors.toList()));

        User user = new User();

        user.setId(cartDTO.getUserId());

        cart.setUser(user);

        return cart;
    }

    public CartDTO toDto(Cart cart) {

        if (cart == null) { return null; }

        CartDTO cartDTO = new CartDTO();

        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        cartDTO.setTotalPrice(cart.getTotalPrice());
        cartDTO.setItems(cart.getItems().stream().map(cartItemMapper::toDTO).collect(Collectors.toList()));

        return cartDTO;
    }
}