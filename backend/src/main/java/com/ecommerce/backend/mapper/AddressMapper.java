package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.AddressDTO;
import com.ecommerce.backend.model.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AddressMapper {

    public Address toEntity(AddressDTO addressDTO) {

        // * if addressDTO is null return null ;
        if (addressDTO == null) { return null; }

        Address address = new Address();

        address.setId(addressDTO.getId());
        address.setCity(addressDTO.getCity());
        address.setStreet(addressDTO.getStreet());
        address.setCountry(addressDTO.getCounty());
        address.setPostalCode(addressDTO.getPostalCode());

        return address;
    }

    public AddressDTO toDTO(Address address) {

        // * if address is null return null ;
        if (address == null) { return null; }

        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(address.getId());
        addressDTO.setCity(address.getCity());
        addressDTO.setStreet(address.getStreet());
        addressDTO.setCounty(address.getCountry());
        addressDTO.setPostalCode(address.getPostalCode());

        return addressDTO;
    }

}
