package com.ecommerce.service;

import com.ecommerce.Dto.OrderDTO;
import com.ecommerce.Dto.OrderItemDTO;
import com.ecommerce.Dto.ShippingDetailsDTO;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import com.ecommerce.model.ShippingDetails;
import com.ecommerce.repository.ShippingDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShippingDetailsService {

    @Autowired
    private ShippingDetailsRepo shippingDetailsRepo;

    public List<ShippingDetailsDTO> getAllShippingDetails() {
        List<ShippingDetails> ShippingDetails = shippingDetailsRepo.findAll();

        return ShippingDetails.stream()
                .map(this::convertShippingToDTO) // Convert each Order to OrderDTO
                .collect(Collectors.toList());
    }


    // ✅ Convert ShippingDetails entity to ShippingDetailsDTO
    private ShippingDetailsDTO convertShippingToDTO(ShippingDetails shippingDetails) {
        return new ShippingDetailsDTO(shippingDetails.getId() , shippingDetails.getAddress() , shippingDetails.getCity() ,
                shippingDetails.getCountry() , shippingDetails.getDelivered_at() , shippingDetails.getEstimated_delivery_date() ,
                shippingDetails.getPostal_code() , shippingDetails.getRecipient_phone());
    }


    // ✅ Convert Order entity to OrderDTO
    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new OrderDTO(order.getId() , order.getTotalPrice(), order.getStatus() ,order.getOrderDate() , orderItemDTOs , order.getUser().getId() , order.getUser().getUsername() , order.getUser().getEmail() , order.getPayment().getId() , convertShippingToDTO(order.getShippingDetails())  );
    }

    // ✅ Convert OrderItem entity to OrderItemDTO
    private OrderItemDTO convertToDTO(OrderItem orderItem) {
        return new OrderItemDTO(
                orderItem.getId(),
                orderItem.getProduct().getName(), // Assuming OrderItem has a Product
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }

}


