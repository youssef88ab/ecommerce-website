package com.ecommerce.backend.dto;

import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private Gender gender;
    private AddressDTO address;
    private Role role;
}
