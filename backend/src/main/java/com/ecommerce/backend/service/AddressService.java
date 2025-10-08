package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.AddressDTO;

import java.util.List;

public interface AddressService {

    // * Adds a new shipping/billing address for a user.
    AddressDTO addAddress(Long userId, AddressDTO address);

    // * Retrieves a specific address by its ID.
    AddressDTO getAddressById(Long addressId);

    // * Retrieves all saved addresses for a given user.
    List<AddressDTO> getAddressesByUserId(Long userId);

    // * Updates the details of an existing address.
    AddressDTO updateAddress(Long addressId, AddressDTO updatedAddress);

    // * Deletes a user's saved address.
    void removeAddress(Long addressId);

    // * Sets a specific address as the user's default shipping/billing address.
    AddressDTO setDefaultAddress(Long userId, Long addressId);
}
