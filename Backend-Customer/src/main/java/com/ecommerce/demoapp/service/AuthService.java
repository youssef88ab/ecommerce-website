package com.ecommerce.demoapp.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.ecommerce.demoapp.Dto.AuthResponseDTO;
import com.ecommerce.demoapp.Dto.UserDataDTO;
import com.ecommerce.demoapp.config.JwtTokenProvider;
import com.ecommerce.demoapp.model.User;
import com.ecommerce.demoapp.repository.UserRepository;





@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtProvider;

   public Optional<AuthResponseDTO> login(String email, String password) {
    Optional<User> userOpt = userRepository.findByMail(email);
    if (userOpt.isPresent() && userOpt.get().getPass().equals(password)) {
        User user = userOpt.get();

        // Create auth object
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(user.getName(), null, new ArrayList<>());

        // Generate token
        String token = jwtProvider.generateToken(auth);

        // Return user data + token
        AuthResponseDTO response = new AuthResponseDTO(token, user.getName(), user.getRole(), user.getImgUrl());
        return Optional.of(response);
    }
    return Optional.empty();
}

    public Optional<UserDataDTO> getUserData(String username) {
    Optional<User> userOpt = userRepository.findByUsername(username);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            UserDataDTO response = new UserDataDTO(user);
            return Optional.of(response);
        }
            return Optional.empty();
    }
}