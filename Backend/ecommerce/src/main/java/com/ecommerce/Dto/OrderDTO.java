package com.ecommerce.Dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ecommerce.model.ShippingDetails;
import lombok.Data;
import com.ecommerce.model.OrderStatus;

@Data 
public class OrderDTO {

    private Long orderId ; 
    private Long userId ;
    private String username ;
    private String email;
    private Double totalPrice ;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private List<OrderItemDTO> orderItems;
    private Long paymentId;
    private ShippingDetailsDTO shippingDetails;

    public OrderDTO(Long orderId, Double totalPrice, OrderStatus status, LocalDateTime orderDate, List<OrderItemDTO> orderItems , Long userId , String username , String email , Long paymentId , ShippingDetailsDTO shippingDetails) {
        this.orderId = orderId;
        this.totalPrice = totalPrice;
        this.status = status;
        this.orderDate = orderDate;
        this.email = email;
        this.username = username;
        this.orderItems = orderItems;
        this.paymentId = paymentId;
        this.userId = userId ;
        this.shippingDetails = shippingDetails;
    }
}

