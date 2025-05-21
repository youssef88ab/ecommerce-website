package com.ecommerce.demoapp.controller;

import com.ecommerce.demoapp.Dto.UserAuthDTO;
import com.ecommerce.demoapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
public ResponseEntity<?> register(@Valid @RequestBody UserAuthDTO authRequest) {
    try {
        int response = userService.createUser(authRequest);
        if (response == 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Registration failed");
    } catch (Exception e) {
        return ResponseEntity.internalServerError().body(e.getMessage());
    }
}

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@Valid @RequestBody AuthRequestDTO authRequest) {
        UserResponseDTO response = userService.authenticateUser(authRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(@RequestParam String email) {
        UserResponseDTO response = userService.getCurrentUser(email);
        return ResponseEntity.ok(response);
    }
}