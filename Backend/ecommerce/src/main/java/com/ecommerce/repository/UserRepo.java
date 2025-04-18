package com.ecommerce.repository;

import com.ecommerce.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User , Long> {
    
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByUsernameLike(String keyword);
    
}
