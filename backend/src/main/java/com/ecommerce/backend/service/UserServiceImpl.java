package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.UserDTO;
import com.ecommerce.backend.model.User;

import java.util.List;

public class UserServiceImpl implements UserService {
    @Override
    public List<UserDTO> getUsers() {
        return List.of();
    }

    @Override
    public UserDTO getUserById(Long id) {
        return null;
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        return null;
    }

    @Override
    public UserDTO registerUser(UserDTO user) {
        return null;
    }

    @Override
    public UserDTO updateUser(Long id, User updatedUser) {
        return null;
    }

    @Override
    public void deleterUser(Long id) {

    }
}
