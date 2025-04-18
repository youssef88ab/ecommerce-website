package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.ecommerce.Dto.LoginDTO;
import com.ecommerce.config.JwtTokenProvider;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepo;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired 
    private JwtTokenProvider jwtTokenProvider;

    @Autowired 
    private UserRepo userRepo ;

    public String Login(LoginDTO loginDto) {

        // 01 - AuthenticationManager is used to authenticate the user
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginDto.getUsername() ,
            loginDto.getPassword()
        ));

         /* 02 - SecurityContextHolder is used to allows the rest of the application to know
        that the user is authenticated and can use user data from Authentication object */
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 03 - Generate the token based on username and secret key
        String token = jwtTokenProvider.generateToken(authentication);

        // 04 - Return the token to controller
        return token;
    }

    public String getRole(LoginDTO loginDto) {
        User user = userRepo.findByUsername(loginDto.getUsername()).orElse(null);

        if (user != null) {
            return user.getRoles().stream()
                        .map(Role::getName) // Assuming Role has a getName() method
                        .collect(Collectors.joining(","));
        }

        return null;
    }


    
}
