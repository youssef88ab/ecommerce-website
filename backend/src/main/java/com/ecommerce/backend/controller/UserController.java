package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.UserDTO;
import com.ecommerce.backend.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService ;

    // * Get Users
    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    // * Get User By ID
    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // * Add User
    @PostMapping()
    public UserDTO addUser(@RequestBody UserDTO user) {
        return userService.registerUser(user);
    }

    // * Update User
    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id , @RequestBody UserDTO user) {
        return userService.updateUser(id , user);
    }

    // * Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleterUser(id);
        return ResponseEntity.noContent().build();
    }
}