package com.ecommerce.demoapp.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank ;
import jakarta.validation.constraints.Size;

public class UserAuthDTO {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between 3-20 characters")
    private String username ;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email ;

    private int role;
    
    public UserAuthDTO() {}

    public UserAuthDTO(String name, String mail, String pass, int role) {
        this.username = name;
        this.email = mail ;
        this.password = pass;
        this.role = role;
    }

    public String getUsername() {
        return this.username;
    }
    public void setUsername(String name) {
        this.username = name ;
    }
    public String getPass() {
        return this.password ;
    }
    public void setRating(String pass) {
        this.password = pass;
    }
    public String getMail() {
        return this.email ;
    }
    public void setMail(String mail) {
        this.email = mail ;
    }
    public int getRole() {
        return this.role ;
    }
    public void setRole(int role) {
        this.role = role;
    }
}
