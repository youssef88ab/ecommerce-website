package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.AddressDTO;

import java.util.List;

public class AddressServiceImpl implements AddressService {
    @Override
    public AddressDTO addAddress(Long userId, AddressDTO address) {
        return null;
    }

    @Override
    public AddressDTO getAddressById(Long addressId) {
        return null;
    }

    @Override
    public List<AddressDTO> getAddressesByUserId(Long userId) {
        return List.of();
    }

    @Override
    public AddressDTO updateAddress(Long addressId, AddressDTO updatedAddress) {
        return null;
    }

    @Override
    public void removeAddress(Long addressId) {

    }

    @Override
    public AddressDTO setDefaultAddress(Long userId, Long addressId) {
        return null;
    }
}
