package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.UserDTO;
import com.ecommerce.backend.enums.Role;
import com.ecommerce.backend.mapper.AddressMapper;
import com.ecommerce.backend.mapper.UserMapper;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper ;

    @Override
    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userRepository.findById(id).map(userMapper::toDTO).orElse(null);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(userMapper::toDTO).orElse(null);
    }

    @Override
    public UserDTO registerUser(UserDTO addedUser) {

        // * Convert Dto to Entity
        User user = userMapper.toEntity(addedUser) ;

        // * Set id to null
        user.setId(null);

        // * Check if email is already taken
        if (getUserByEmail(addedUser.getEmail()) != null) { return null ; }

        // * Don't let add admin Role
        user.setRole(Role.ROLE_CUSTOMER);

        // * Save user to database
        userRepository.save(user);

        // * return registered user

        return userMapper.toDTO(user);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO updatedUser) {

        // * Create Optional User
        Optional<User> userOptional = userRepository.findById(id);

        // * Verify if user is present
        if (userOptional.isPresent()) {

            // * Create User Object
            User user = userOptional.get();

            // * Verify is email is already taken
            if (getUserByEmail(updatedUser.getEmail()) != null) { return null; }

            // * Update User Attributes From DTO
            user.setPhone(updatedUser.getPhone());
            user.setUsername(updatedUser.getUsername());
            user.setAddress(addressMapper.toEntity(updatedUser.getAddress()));

            // * set role to customer
            user.setRole(Role.ROLE_CUSTOMER);

            // * update user in db & return updated user
            return userMapper.toDTO(userRepository.save(user));
        }

        return null;
    }

    @Override
    public void deleterUser(Long id) {
        userRepository.deleteById(id);
    }
}