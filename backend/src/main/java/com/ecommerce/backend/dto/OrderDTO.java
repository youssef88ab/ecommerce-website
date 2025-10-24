package com.ecommerce.backend.dto;

import com.ecommerce.backend.enums.OrderStatus;
import lombok.Data;


import java.sql.Timestamp;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private UserDTO user;
    private List<OrderItemDTO> items;
    private double totalAmount;
    private OrderStatus status;
    private Timestamp orderDate;
    private PaymentDTO payment;
}
