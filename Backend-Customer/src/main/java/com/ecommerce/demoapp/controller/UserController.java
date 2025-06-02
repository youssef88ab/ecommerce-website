package com.ecommerce.demoapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.demoapp.Dto.UserDataDTO;
import com.ecommerce.demoapp.service.AuthService;

@RestController
@RequestMapping("/api/profile")
public class UserController {
    
    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<?> findByUsername(@RequestParam String username) {
            Optional<UserDataDTO> response = authService.getUserData(username);
            return response
            .map(ResponseEntity::ok) // If response exists, return 200 OK with body
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
 }


