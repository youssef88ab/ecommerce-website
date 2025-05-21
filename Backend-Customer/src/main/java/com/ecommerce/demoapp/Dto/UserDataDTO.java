package com.ecommerce.demoapp.dto;

import java.time.LocalDateTime;

import com.ecommerce.demoapp.model.User;

public class UserDataDTO {
    private String username;
    private String email;
    private final Integer role;
    private final LocalDateTime createdAt;
    
    // Constructor from User entity
    public UserDataDTO(User user) {
        this.username = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.createdAt = user.getCreatedAt();
    }
    
    // Getters and Setters
    
    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }
    
    public Integer getRole() { return this.role; }
    
    public LocalDateTime getCreatedAt() { return this.createdAt; }
}