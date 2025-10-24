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

    private final OrderItemMapper orderItemMapper ;
    private final PaymentMapper paymentMapper ;
    private final UserMapper userMapper;

    public Order toEntity(OrderDTO orderDTO) {

        if (orderDTO == null) { return null; }

        Order order = new Order();

        order.setId(orderDTO.getId());
        order.setStatus(orderDTO.getStatus());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setUser(userMapper.toEntity(orderDTO.getUser()));
        order.setPayment(paymentMapper.toEntity(orderDTO.getPayment()));
        order.setItems(orderDTO.getItems().stream().map(orderItemMapper::toEntity).collect(Collectors.toList()));

        User user = new User();

        order.setUser(user);

        return order;
    }

    public OrderDTO toDTO(Order order) {

        if (order == null) { return null; }

        OrderDTO orderDTO = new OrderDTO();

        orderDTO.setId(order.getId());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setUser(userMapper.toDTO(order.getUser()));
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setPayment(paymentMapper.toDTO(order.getPayment()));
        orderDTO.setItems(order.getItems().stream().map(orderItemMapper::toDto).collect(Collectors.toList()));

        return orderDTO;
    }

}