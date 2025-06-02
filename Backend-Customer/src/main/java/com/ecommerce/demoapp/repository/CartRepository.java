package com.ecommerce.demoapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.demoapp.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    // Custom method to find a cart by user ID
    Optional<Cart> findByUserId(int userId);

    @Query("SELECT c FROM Cart c JOIN FETCH c.items WHERE c.user.id = :userId")
    Optional<Cart> findByUserIdWithItems(@Param("userId") int userId);

}
