package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.enums.PaymentMethod;
import com.ecommerce.backend.enums.Role;
import com.ecommerce.backend.service.OrderServiceImpl;
import jdk.jshell.Snippet;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("api/orders")
public class OrderController {

    private final OrderServiceImpl orderService ;

    // * Get All Orders
    @GetMapping
    public Page<OrderDTO> getAllOrders(@PageableDefault(size = 20, sort = "id") Pageable pageable , @RequestParam(required = false) OrderStatus status , @RequestParam(required = false) PaymentMethod paymentMethod , @RequestParam(required = false) String search) {
        return orderService.getOrders(pageable, status , paymentMethod , search);
    }

    // * Get Orders Count
    @GetMapping("/count")
    public Long getOrdersCount() {
        return orderService.getOrdersCount();
    }

    // * Get Order By ID
    @Transactional(readOnly = true)
    @GetMapping("/{id}")
    public OrderDTO getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    // * Get Orders By User ID
    @Transactional(readOnly = true)
    @GetMapping("/user/{id}")
    public Page<OrderDTO> getOrderByUserId(@PathVariable Long id , @PageableDefault(size = 20, sort = "id") Pageable pageable , @RequestParam(required = false) OrderStatus status , @RequestParam(required = false) PaymentMethod paymentMethod , @RequestParam(required = false) String search) {
        return orderService.getOrdersByUser(id , pageable , status , paymentMethod , search);
    }

}
