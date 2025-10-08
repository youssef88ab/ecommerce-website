package com.ecommerce.backend.dto;

import com.ecommerce.backend.enums.OrderStatus;


import java.sql.Timestamp;
import java.util.List;

public class OrderDTO {
    private Long id;
    private Long userId;
    private List<OrderItemDTO> items;
    private double totalAmount;
    private OrderStatus status;
    private Timestamp orderDate;
    private PaymentDTO payment;
}
