package com.ecommerce.backend.dto;

import com.ecommerce.backend.enums.Role;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private AddressDTO address;
    private Role role;
}
