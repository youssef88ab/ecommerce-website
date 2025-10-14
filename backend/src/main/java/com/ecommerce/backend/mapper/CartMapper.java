package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.CartDTO;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartMapper {

    public Cart toEntity(CartDTO cartDTO) {

        if (cartDTO == null) { return null; }

        Cart cart = new Cart();
        cart.setId(cartDTO.getId());
        cart.setTotalPrice(cartDTO.getTotalPrice());

        // ! Here you should use streams and CartItem Mapper ;
        cart..setItems(cartDTO.getItems());

        User user = new User();
        user.setId(cartDTO.getUserId());
        cart.setUser(user);

        return cart;
    }

    public CartDTO toDto(Cart cart) {

        if (cart == null) { return null; }

        CartDTO cartDTO = new CartDTO();

        cartDTO.setId(cart.getId());
        cartDTO.setTotalPrice(cart.getTotalPrice());
        cartDTO.setUserId(cart.getUser().getId());

        // ! Here you should use streams and CartItem Mapper ;
        cartDTO.setItems(cart.setItems(););

        return cartDTO;
    }
}
