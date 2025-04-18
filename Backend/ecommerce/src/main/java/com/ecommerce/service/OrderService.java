package com.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.Dto.ShippingDetailsDTO;
import com.ecommerce.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.stereotype.Service;

import com.ecommerce.Dto.OrderDTO;
import com.ecommerce.Dto.OrderItemDTO;
import com.ecommerce.EcommerceApplication;
import com.ecommerce.config.CustomUserDetailsService;
import com.ecommerce.config.JwtAuthenticationEntryPoint;
import com.ecommerce.config.JwtAuthenticationFilter;
import com.ecommerce.controller.AuthController;
import com.ecommerce.controller.OrderController;
import com.ecommerce.repository.OrderRepo;
import com.ecommerce.repository.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class OrderService {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private final EcommerceApplication ecommerceApplication;

    private final CustomUserDetailsService customUserDetailsService;

    private final AuthService authService;

    private final AuthController authController;

    @Autowired
    private OrderRepo orderRepo ;

    @Autowired 
    private UserRepo userRepo ;
    

    OrderService(AuthController authController, AuthService authService, CustomUserDetailsService customUserDetailsService, EcommerceApplication ecommerceApplication, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.authController = authController;
        this.authService = authService;
        this.customUserDetailsService = customUserDetailsService;
        this.ecommerceApplication = ecommerceApplication;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    } 

    public List<OrderDTO> getAllOrders() {

        List<Order> orders = orderRepo.findAll();

        return orders.stream()
                .map(this::convertToDTO) // Convert each Order to OrderDTO
                .collect(Collectors.toList());
    }

    public OrderDTO getOrder(Long id) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order Not Found"));
        
        return convertToDTO(order);
    }

    @Transactional
    public void cancelOrder(Long id) {
        // Fetch the order from the repository
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order Not Found"));
    
        // Check if the order is already delivered or canceled
        if (order.getStatus().equals(OrderStatus.DELIVERED) || order.getStatus().equals(OrderStatus.CANCELED)) {
            throw new RuntimeException("Order cannot be canceled. It has already been delivered or canceled.");
        }
    
        // Update the order status to CANCELED
        order.setStatus(OrderStatus.CANCELED);
    
        // Save the updated order status
        orderRepo.save(order);
    }

    @Transactional 
    public void assignOrderToDelivry(Long id) {
        // Get Order From Db 
        Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order Not Found")); 

        // Check If The Order Already Shipped Or Canceled 
        if (order.getStatus().equals(OrderStatus.SHIPPED) || order.getStatus().equals(OrderStatus.CANCELED)) {
            throw new RuntimeException("Order Cannot Be Shipped , it has Already Shipped or Canceled");
        }

        // Update Order Status 
        order.setStatus(OrderStatus.SHIPPED);

        // Save Order 
        orderRepo.save(order);
    }

    public void addOrder(Order order) {
        
        // Set the Status Of The Order To PEDNING
        order.setStatus(OrderStatus.PENDING);

        // Save The Order To Database 
        orderRepo.save(order);
        
    }

    public List<OrderDTO> getOrdersByStatus(OrderStatus status) {
        
        // Get Shipped Orders From Database 
        List<Order> orders = orderRepo.findByStatus(status);

        // Convert Each Order to Order Dto 
        List<OrderDTO> orderDTOs = orders.stream().map(this::convertToDTO).collect(Collectors.toList());
        
        return orderDTOs;
    }

    public List<OrderDTO> getByUserId(Long id) {
        List<Order> orders = orderRepo.findByUserId(id);

        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    
    

    // ✅ Convert Order entity to OrderDTO
    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new OrderDTO(order.getId() , order.getTotalPrice(), order.getStatus() ,order.getOrderDate() , orderItemDTOs , order.getUser().getId() , order.getUser().getUsername() , order.getUser().getEmail() , order.getPayment().getId() , convertShippingToDTO(order.getShippingDetails()));
    }

    // ✅ Convert ShippingDetails entity to ShippingDetailsDTO
    private ShippingDetailsDTO convertShippingToDTO(ShippingDetails shippingDetails) {
        return new ShippingDetailsDTO(shippingDetails.getId() , shippingDetails.getAddress() , shippingDetails.getCity() ,
                shippingDetails.getCountry() , shippingDetails.getDelivered_at() , shippingDetails.getEstimated_delivery_date() ,
                shippingDetails.getPostal_code() , shippingDetails.getRecipient_phone() );
    }

    // ✅ Convert OrderItem entity to OrderItemDTO
    private OrderItemDTO convertToDTO(OrderItem orderItem) {
        return new OrderItemDTO(
                orderItem.getId(),
                orderItem.getProduct().getName(), // Assuming OrderItem has a Product
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }



    public Long getOrdersCount() {
        return orderRepo.count();
    }
    
    

    
}