package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.dto.OrderItemDTO;
import com.ecommerce.backend.model.OrderItem;
import com.ecommerce.backend.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderItemMapper {

    OrderItem toEntity(OrderItemDTO orderItemDTO) {

        if (orderItemDTO == null) { return null; }

        OrderItem orderItem = new OrderItem();

        orderItem.setId(orderItemDTO.getId());
        orderItem.setPrice(orderItemDTO.getSubtotal());
        orderItem.setQuantity(orderItemDTO.getQuantity());

        Product product = new Product();
        product.setId(orderItemDTO.getProductId());
        product.setName(orderItemDTO.getProductName());
        product.setPrice(orderItemDTO.getProductPrice());

        orderItem.setProduct(product);

        return orderItem;
    }

    OrderItemDTO toDto(OrderItem orderItem) {

        if (orderItem == null) { return null; }

        OrderItemDTO orderItemDTO = new OrderItemDTO();

        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setQuantity(orderItemDTO.getQuantity());
        orderItemDTO.setSubtotal(orderItem.getSubtotal());
        orderItemDTO.setProductId(orderItem.getProduct().getId());
        orderItemDTO.setProductName(orderItem.getProduct().getName());
        orderItemDTO.setProductPrice(orderItem.getProduct().getPrice());

        return orderItemDTO ;
    }
}