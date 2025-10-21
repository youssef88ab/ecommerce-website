package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.UserDTO;
import com.ecommerce.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final AddressMapper addressMapper ;

    public User toEntity(UserDTO userDTO) {

        // * if userDTO null return null
        if (userDTO == null) { return null; }

        User user = new User();

        user.setId(userDTO.getId());
        user.setRole(userDTO.getRole());
        user.setEmail(userDTO.getEmail());
        user.setGender(userDTO.getGender());
        user.setPhone(userDTO.getPhone());
        user.setUsername(userDTO.getUsername());

        if (userDTO.getAddress() != null) {
            user.setAddress(addressMapper.toEntity(userDTO.getAddress()));
        }

        return user;
    }

    public UserDTO toDTO(User user) {

        // * if user null return null
        if (user == null) { return null; }

        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setRole(user.getRole());
        userDTO.setPhone(user.getPhone());
        userDTO.setEmail(user.getEmail());
        userDTO.setGender(user.getGender());
        userDTO.setUsername(user.getUsername());

        if (user.getAddress() != null) {
            userDTO.setAddress(addressMapper.toDTO(user.getAddress()));
        }

        return userDTO;
    }
}
