package com.ecommerce.demoapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.demoapp.model.Cart;
import com.ecommerce.demoapp.model.CartItem;
import com.ecommerce.demoapp.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    // Optional, for finding all items of a specific cart
    List<CartItem> findByCart(Cart cart);

    // Find item by cart and product
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    // Optional: delete by cart and product directly
    void deleteByCartAndProduct(Cart cart, Product product);
}
