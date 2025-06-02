package com.ecommerce.demoapp.Dto;

import java.time.LocalDateTime;

import com.ecommerce.demoapp.model.User;

public class UserDataDTO {
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String phone;
    private final LocalDateTime createdAt;
    
    // Constructor from User entity
    public UserDataDTO(User user) {
        this.username = user.getName();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phone = user.getPhone();
        this.createdAt = user.getCreatedAt();
    }
    
    // Getters and Setters
    
    public String getUsername() { return this.username; }
    
    public String getEmail() { return this.email; }
    
    public String getFirstName() { return this.firstName; }

    public String getLastName() { return this.lastName; }

    public String getPhone() { return this.phone; }
    
    public LocalDateTime getCreatedAt() { return this.createdAt; }
}