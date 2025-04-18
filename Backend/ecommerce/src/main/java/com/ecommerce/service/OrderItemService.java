package com.ecommerce.service;

import com.ecommerce.Dto.OrderDTO;
import com.ecommerce.Dto.OrderItemDTO;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import com.ecommerce.repository.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemService {

    @Autowired
    OrderItemRepo orderItemRepo ;

    public List<OrderItemDTO> getAll() {
        List<OrderItem> orderItems = orderItemRepo.findAll();

        return orderItems.stream().map(this::convertToDTO).collect(Collectors.toList());
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
