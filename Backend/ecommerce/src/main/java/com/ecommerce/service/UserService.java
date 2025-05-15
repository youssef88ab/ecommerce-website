package com.ecommerce.service;

import java.util.*;

import com.ecommerce.model.Role;
import com.ecommerce.repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.EcommerceApplication;
import com.ecommerce.Dto.UserDTO;
import com.ecommerce.config.CustomUserDetailsService;
import com.ecommerce.config.JwtAuthenticationEntryPoint;
import com.ecommerce.controller.AuthController;
import com.ecommerce.model.User;

import com.ecommerce.repository.UserRepo;

@Service
public class UserService {


    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<UserDTO> getAllUsers() {
        List<User> usersRepo = userRepo.findAll();
        List<UserDTO> dtos = new ArrayList<>();
        for (User user : usersRepo) {
            dtos.add(convertToDTO(user));
        }
        return dtos;
    }

    public UserDTO getUser(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
        return convertToDTO(user);
    }

    public void addUser(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        user.setId(null);
        // Find Role
        Role role = roleRepo.findByName(userDTO.getRole()).orElseThrow(() -> new RuntimeException("Role Doesn't Exist"));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton(role));
        userRepo.save(user);
    }

    public void updateUser(Long id, UserDTO updatedUserDTO) {
        try {
            User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
            String email = updatedUserDTO.getEmail();
            if (userRepo.findByEmail(email).isPresent() && !user.getEmail().equals(email)) {
                throw new RuntimeException("This Email is Already Taken email : " + email);
            } else {
                user.setEmail(email);
            }
            String username = updatedUserDTO.getUsername();
            if (userRepo.findByUsername(username).isPresent() && !user.getUsername().equals(username)) {
                throw new RuntimeException("This Username is Already Taken Username : " + username);
            } else {
                user.setUsername(username);
            }
            // Update Role
            Role role = roleRepo.findByName(updatedUserDTO.getRole()).orElseThrow(() -> new RuntimeException("Role Doesn't Exist"));
            user.setRoles(Collections.singleton(role));
            userRepo.save(user);
        } catch (Exception e) {
            System.out.println("UPDATE USER ERROR : " + e.getMessage());;
        }
    }

    public void deleteUser(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        // Clear the roles first (to remove from join table)
        user.getRoles().clear();
        userRepo.save(user);

        // Now delete the user
        userRepo.deleteById(id);
    }

    public List<UserDTO> searchUser(String keyword) {
        keyword = "%" + keyword + "%" ;
        List<User> users = userRepo.findByUsernameLike(keyword);
        List<UserDTO> dtos = new ArrayList<>();
        for (User user : users) {
            dtos.add(convertToDTO(user));
        }
        return dtos;
    }

    public void signUp(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        user.setId(null);
        Role role = roleRepo.findByName("CUSTOMER").orElseThrow(() -> new RuntimeException("Role Doesn't Exist"));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton(role));
        userRepo.save(user);
    }

    // Conversion methods
    private UserDTO convertToDTO(User user) {
        String roleName = user.getRoles() != null && !user.getRoles().isEmpty() ? user.getRoles().iterator().next().getName() : null;
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), roleName);
    }

    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        // Password and roles are set in addUser/signUp
        return user;
    }
}