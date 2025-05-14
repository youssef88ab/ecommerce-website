package com.ecommerce.Dto;

import java.util.Set;

import com.ecommerce.model.Role;

import lombok.Data;

@Data
public class UserDTO {
    
    Long id ; 
    String username ; 
    String email; 
    String role;

    // Default Constructor ; 
    public UserDTO() {

    }

    // Parametreized Constructor ; 
    public UserDTO(Long id , String username , String email , String role) {
        this.id = id;
        this.username = username ; 
        this.email = email; 
        this.role = role ;
    }



}
