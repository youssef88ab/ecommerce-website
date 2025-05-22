package com.ecommerce.demoapp.Dto;

import lombok.Data;

@Data
public class LoginDTO {
    
    private String email ; 
    private String password ;
    
    // Getters 
    public String getMail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }
}