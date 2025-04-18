package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Dto.AuthResponseDto;
import com.ecommerce.Dto.LoginDTO;
import com.ecommerce.service.AuthService;

@RestController
@CrossOrigin(origins = "*") // Autoriser les requêtes depuis le frontend
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService; 

    // Build Login REST API 
    @PostMapping("/login") 
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDTO loginDto) {

        System.out.println("USERNAME ENTRED  : " + loginDto.getUsername());
        System.out.println("PASWROD ENTRED   : " + loginDto.getPassword());

        // 01 - Recive The Token From AuthService ; 
        String token = authService.Login(loginDto); 

        // 02 - Get the user role from the service or from the token
        String role = authService.getRole(loginDto);


        // 03 - Set The Token as a response using JwtAuthResponse Dto Class
        AuthResponseDto authResponseDto = new AuthResponseDto(); 
        authResponseDto.setToken(token);
        authResponseDto.setRole(role);
        authResponseDto.setUsername(loginDto.getUsername());

        //03 - Return the response to the user
        return new ResponseEntity<>(authResponseDto, HttpStatus.OK);
    }

}
