package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.dto.PaymentDTO;
import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.model.Invoice;

import java.util.List;

public class OrderServiceImpl implements OrderService {
    @Override
    public OrderDTO placeOrder(Long cartId, PaymentDTO paymentInfo) {
        return null;
    }

    @Override
    public List<OrderDTO> getOrders() {
        return List.of();
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        return null;
    }

    @Override
    public List<OrderDTO> getOrdersByUser(Long userId) {
        return List.of();
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
