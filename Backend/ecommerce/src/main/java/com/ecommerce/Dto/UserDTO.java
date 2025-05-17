package com.ecommerce.Dto;

import java.util.Date;
import java.util.Set;

import com.ecommerce.model.Role;

import lombok.Data;

@Data
public class UserDTO {
    
    Long id ; 
    String username ; 
    String email; 
    String role;
    String address;
    String phone;
    String gender;
    Date birthDate;
    Date dateAdded;

    // Default Constructor ;
    public UserDTO() {

    }

    public UserDTO(Long id, String username, String email, String role, String address, String phone, String gender, Date birthDate, Date dateAdded) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.address = address;
        this.phone = phone;
        this.gender = gender;
        this.birthDate = birthDate;
        this.dateAdded = dateAdded;
    }
}
