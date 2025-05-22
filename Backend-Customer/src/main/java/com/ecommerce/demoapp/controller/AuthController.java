package com.ecommerce.demoapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.demoapp.Dto.AuthResponseDTO;
import com.ecommerce.demoapp.Dto.LoginDTO;
import com.ecommerce.demoapp.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
     @PostMapping("/login") 
    public ResponseEntity<?> login(@RequestBody LoginDTO request) {
        System.out.println("EMAIL ENTERED: " + request.getMail());
        System.out.println("PASSWORD ENTERED: " + request.getPassword());

        Optional<AuthResponseDTO> response = authService.login(request.getMail(), request.getPassword());
        
        return response
            .map(ResponseEntity::ok) // If response exists, return 200 OK with body
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()); // Else return 401
    }
 }


