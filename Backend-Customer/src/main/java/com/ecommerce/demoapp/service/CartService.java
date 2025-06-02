package com.ecommerce.demoapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.demoapp.Dto.CartItemDTO;
import com.ecommerce.demoapp.model.Cart;
import com.ecommerce.demoapp.model.CartItem;
import com.ecommerce.demoapp.model.Product;
import com.ecommerce.demoapp.model.User;
import com.ecommerce.demoapp.repository.CartItemRepository;
import com.ecommerce.demoapp.repository.CartRepository;
import com.ecommerce.demoapp.repository.ProductRepository;
import com.ecommerce.demoapp.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    public Cart getCartForUser(int userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }
    
    @Transactional
public void addItemToCart(int cartId, int productId) {
    Cart cart = cartRepository.findById(cartId)
                  .orElseThrow(() -> new RuntimeException("Cart not found"));

    Hibernate.initialize(cart.getItems()); // initialize lazy collection

    Product product = productRepository.findById(productId)
                  .orElseThrow(() -> new RuntimeException("Product not found"));

    CartItem existingItem = cart.getItems().stream()
        .filter(item -> item.getProduct().getProductId() == productId)
        .findFirst()
        .orElse(null);

    if (existingItem != null) {
        existingItem.setQuantity(existingItem.getQuantity() + 1);
    } else {
        CartItem newItem = new CartItem();
        newItem.setCart(cart);
        newItem.setProduct(product);
        newItem.setQuantity(1);
        cart.getItems().add(newItem);
    }

    cartRepository.save(cart);
}

  public List<CartItemDTO> getCartItemsByUsername(String username) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    Cart cart = cartRepository.findByUserIdWithItems(user.getId())
        .orElseThrow(() -> new RuntimeException("Cart not found for user"));


    return cart.getItems().stream()
        .map(item -> {
            CartItemDTO dto = new CartItemDTO();
            dto.setProductName(item.getProduct().getProductName());
            dto.setImageUrl(item.getProduct().getMainImgUrl());
            dto.setPrice(item.getProduct().getOriginalPrice());
            dto.setQuantity(item.getQuantity());
            dto.setProductId(item.getProduct().getProductId());
            return dto;
        })
        .collect(Collectors.toList());
}

    public void removeCartItem(String username, int productId) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    Cart cart = cartRepository.findByUserId(user.getId())
        .orElseThrow(() -> new RuntimeException("Cart not found"));

    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
        .orElseThrow(() -> new RuntimeException("Item not found in cart"));

    cartItemRepository.delete(item);
}



}
