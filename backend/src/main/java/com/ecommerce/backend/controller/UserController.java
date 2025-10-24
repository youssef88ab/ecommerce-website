package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.UserDTO;
import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.Role;
import com.ecommerce.backend.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService ;

    // * Get Users
    @GetMapping
    public Page<UserDTO> getUsers(@PageableDefault(size = 20, sort = "id") Pageable pageable , @RequestParam(required = false) Gender gender, @RequestParam(required = false) Role role , @RequestParam(required = false) String search)
    {
        return userService.getAllUsers(pageable , gender , role , search);
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

    // * Get Users Count
    @GetMapping("/count")
    public Long getUsersCount() {
        return userService.getUsersCount();
    }
}