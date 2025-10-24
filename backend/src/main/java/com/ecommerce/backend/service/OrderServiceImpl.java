package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.dto.PaymentDTO;
import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.mapper.OrderMapper;
import com.ecommerce.backend.model.Invoice;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.specifications.OrderSpecification;
import com.ecommerce.backend.specifications.UserSpecification;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
    @Transactional(readOnly = true)
    public Page<OrderDTO> getOrders(Pageable pageable, OrderStatus status , String search) {
        // * 1. Build the dynamic WHERE clause using the Specification class
        Specification<Order> spec = OrderSpecification.filterBy(status, search);

        // * 2. Execute the single findAll method, passing the dynamic Specification
        Page<Order> orderPage = orderRepository.findAll(spec, pageable);

        // * 3. Map and return
        return orderPage.map(orderMapper::toDTO);
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

    public Long getOrdersCount() {
        return orderRepository.count();
    }
}
