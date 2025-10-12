package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    Order toEntity(OrderDTO orderDTO) {

        if (orderDTO == null) { return null; }

        Order order = new Order();

        order.setId(orderDTO.getId());
        order.setStatus(orderDTO.getStatus());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setTotalAmount(orderDTO.getTotalAmount());

        // ! User streams plus mapper here ;
        order.setItems();

        User user = new User();

        user.setId(orderDTO.getUserId());

        order.setUser(user);

        // ! Use Payment Mapper ;
        order.setPayment(orderDTO.getPayment());

        return order;
    }

    OrderDTO toDTO(Order order) {

        if (order == null) { return null; }

        OrderDTO orderDTO = new OrderDTO();

        orderDTO.setId(order.getId());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setUserId(order.getUser().getId());

        // ! User streams plus mapper here
        orderDTO.setItems(order.getItems());

        // ! Use Payment Mapper ;
        orderDTO.setPayment(order.getPayment());

        return orderDTO;
    }
}