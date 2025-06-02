package com.ecommerce.demoapp.Dto;

import lombok.Data;

@Data
public class AuthResponseDTO {

    private String token;
    private String username;
    private int role; 
    private String imgUrl;

    public AuthResponseDTO(String token, String username, int role, String imgUrl) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.imgUrl = imgUrl;
    }
    
    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token; 
    }

    public void setRole(int role) {
        this.role = role ;
    }

    public int getRole() {
        return this.role;
    }

    public String getImgUrl() {
        return this.imgUrl;
    }

    public void setImgUrl(String imgURL) {
        this.imgUrl = imgURL;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }
}