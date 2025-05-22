package com.ecommerce.demoapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.demoapp.Dto.AuthResponseDTO;
import com.ecommerce.demoapp.model.User;
import com.ecommerce.demoapp.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Optional<AuthResponseDTO> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByMail(email);
            if(userOpt.isPresent() && userOpt.get().getPass().equals(password)) {
                User user = userOpt.get();
                String token = generateToken(user.getName());
                String username = user.getName();
                int role = user.getRole();
                AuthResponseDTO response = new AuthResponseDTO(token, username, role);
                return Optional.of(response);
               }
               return Optional.empty();
    }
    public String generateToken(String username) {
        return "dummy-token-" + username + "-" + System.currentTimeMillis();
    }
}