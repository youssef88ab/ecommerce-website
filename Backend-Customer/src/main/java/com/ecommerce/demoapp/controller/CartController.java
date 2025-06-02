package com.ecommerce.demoapp.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.demoapp.Dto.CartItemDTO;
import com.ecommerce.demoapp.Dto.CartItemReqDTO;
import com.ecommerce.demoapp.Dto.UserDataDTO;
import com.ecommerce.demoapp.model.Cart;
import com.ecommerce.demoapp.model.User;
import com.ecommerce.demoapp.repository.UserRepository;
import com.ecommerce.demoapp.service.AuthService;
import com.ecommerce.demoapp.service.CartService;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @GetMapping("/init")
    public ResponseEntity<Cart> initCart(Authentication authentication) {
        System.out.println("InitCart called");
        int userId = extractUserId(authentication);
        System.out.println("User ID extracted: " + userId);
        Cart cart = cartService.getCartForUser(userId);
        System.out.println("Cart ID: " + (cart != null ? cart.getId() : "null"));
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/items")
    public ResponseEntity<?> getCartItems(Authentication authentication) {
        String username = authentication.getName(); 

        Optional<UserDataDTO> userOpt = authService.getUserData(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        UserDataDTO userData = userOpt.get();

        // Now get the cart for this user from cartService
        List<CartItemDTO> cartItems = cartService.getCartItemsByUsername(userData.getUsername());

        return ResponseEntity.ok(cartItems);
    }

   @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItemReqDTO request, Authentication authentication) {
        Optional<User> userOpt = userRepository.findByUsername(authentication.getName());
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = userOpt.get();
        Cart cart = cartService.getCartForUser(user.getId());

        cartService.addItemToCart(cart.getId(), request.getProductId()); 

        return ResponseEntity.ok(Map.of("message", "Item added to cart"));
    }

        private int extractUserId(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> removeCartItem(Authentication authentication, @PathVariable int productId) {
        String username = authentication.getName();

        Optional<UserDataDTO> userOpt = authService.getUserData(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        try {
            cartService.removeCartItem(username, productId);
            return ResponseEntity.ok(Collections.singletonMap("message", "Item removed"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item not found or error occurred");
        }
    }

}
