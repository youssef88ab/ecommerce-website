/*package com.ecommerce.demoapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.demoapp.Dto.UserAuthDTO;
import com.ecommerce.demoapp.model.User;
import com.ecommerce.demoapp.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public int createUser(UserAuthDTO userDTO) {
        if (userRepository.existsByMail(userDTO.getMail())) {
            throw new RuntimeException("Email already used !");
        }
        try {
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getMail());
            user.setPass(userDTO.getPass()); // In production, you should hash the password here
            user.setRole(1);
            userRepository.save(user);
            return 1 ;
        }
        catch(Exception e) {
            return 0;
        }

    }

    public User getUserById(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(int userId, UserAuthDTO userDTO) {
        User existingUser = getUserById(userId);

        // Update fields if they are provided in the DTO
        if (userDTO.getUsername() != null) {
            existingUser.setUsername(userDTO.getUsername());
        }
        if (userDTO.getMail() != null && !userDTO.getMail().equals(existingUser.getEmail())) {
            // Check if new email is already in use
            if (userRepository.existsByMail(userDTO.getMail())) {
                throw new RuntimeException("Email already in use");
            }
            existingUser.setEmail(userDTO.getMail());
        }
        if (userDTO.getPass() != null) {
            existingUser.setPass(userDTO.getPass()); // Again, hash the password in production
        }
        existingUser.setRole(userDTO.getRole());

        return userRepository.save(existingUser);
    }

    public void deleteUser(int userId) {
        User user = getUserById(userId);
        userRepository.delete(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByMail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByMail(email);
    }
}*/