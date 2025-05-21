package com.ecommerce.demoapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.demoapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // Find user by email
    Optional<User> findByMail(String email);
    
    // Check if user exists by email
    boolean existsByMail(String email);
    
    // Find user by username
    Optional<User> findByUsername(String username);
}