package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    OrderItemMapper orderItemMapper ;
    PaymentMapper paymentMapper ;

    public Order toEntity(OrderDTO orderDTO) {

        if (orderDTO == null) { return null; }

        Order order = new Order();

        order.setId(orderDTO.getId());
        order.setStatus(orderDTO.getStatus());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setPayment(paymentMapper.toEntity(orderDTO.getPayment()));
        order.setItems(orderDTO.getItems().stream().map(orderItemMapper::toEntity).collect(Collectors.toList()));

        User user = new User();

        user.setId(orderDTO.getUserId());

        order.setUser(user);

        return order;
    }

    public OrderDTO toDTO(Order order) {

        if (order == null) { return null; }

        OrderDTO orderDTO = new OrderDTO();

        orderDTO.setId(order.getId());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setUserId(order.getUser().getId());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setPayment(paymentMapper.toDTO(order.getPayment()));
        orderDTO.setItems(order.getItems().stream().map(orderItemMapper::toDto).collect(Collectors.toList()));

        return orderDTO;
    }

}