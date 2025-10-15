package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.dto.PaymentDTO;
import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.mapper.OrderMapper;
import com.ecommerce.backend.model.Invoice;
import com.ecommerce.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository ;
    private final OrderMapper orderMapper ;

    @Override
    public OrderDTO placeOrder(Long cartId, PaymentDTO paymentInfo) {
        return null;
    }

    @Override
    public List<OrderDTO> getOrders() {
        return orderRepository.findAll().stream().map(orderMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        return orderRepository.findById(id).map(orderMapper::toDTO).orElse(null);
    }

    @Override
    public List<OrderDTO> getOrdersByUser(Long userId) {
        return null;
    }

    @Override
    public List<OrderDTO> getOrdersByStatus(OrderStatus orderStatus) {
        return List.of();
    }

    @Override
    public OrderDTO cancelOrder(Long orderId) {
        return null;
    }

    @Override
    public Invoice generateInvoice(Long orderId) {
        return null;
    }
}
