package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.UserDTO;
import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.Role;
import com.ecommerce.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface UserService {

    // * Get All Users
    Page<UserDTO> getAllUsers(Pageable pageable , Gender gender , Role role , String search);

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

    // * Get Users Count
    Long getUsersCount();
}
