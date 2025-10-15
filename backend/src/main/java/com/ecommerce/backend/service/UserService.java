package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.UserDTO;
import com.ecommerce.backend.model.User;


import java.util.List;

public interface UserService {

    // * Get All Users
    List<UserDTO> getUsers();

    // * Get User By ID
    UserDTO getUserById(Long id);

    // * Get User By Email
    UserDTO getUserByEmail(String email);

    // * Register User
    UserDTO registerUser(UserDTO addedUser);

    // * Update User
    UserDTO updateUser(Long id , UserDTO updatedUser);

    // * Deleter User
    void deleterUser(Long id);
}
