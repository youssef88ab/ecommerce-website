package com.ecommerce.demoapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.demoapp.Dto.AuthResponseDTO;
import com.ecommerce.demoapp.Dto.LoginDTO;
import com.ecommerce.demoapp.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
        private AuthService authService;

     @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody LoginDTO loginRequest, HttpServletResponse response) {
        
            Optional<AuthResponseDTO> authResponse = authService.login(loginRequest.getEmail(), loginRequest.getPassword());

            if (authResponse.isPresent()) {
                String token = authResponse.get().getToken();

                ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(3600)
                    .sameSite("Lax")
                    .build();

                response.setHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

                return ResponseEntity.ok(authResponse.get());
        }

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
}

 }


