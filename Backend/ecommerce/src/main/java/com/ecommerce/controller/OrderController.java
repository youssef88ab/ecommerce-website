package com.ecommerce.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Dto.OrderDTO;
import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;

@RestController
@CrossOrigin(origins = "*") // Autoriser les requêtes depuis le frontend
@RequestMapping("/api/orders")
public class OrderController {

    private final AuthController authController;
    
    @Autowired 
    private OrderService orderService ;

    OrderController(AuthController authController) {
        this.authController = authController;
    } 

    @GetMapping()
    public ResponseEntity<List<OrderDTO>> getOrders() {
        return new ResponseEntity<>(orderService.getAllOrders() , HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.getOrder(id) , HttpStatus.OK);
    }

    @PatchMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long id) {
        orderService.cancelOrder(id);
        return new ResponseEntity<>(HttpStatus.OK);
    } 

    @GetMapping("/byUserId/{id}")
    public  ResponseEntity<List<OrderDTO>> findByUserId(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.getByUserId(id) , HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getOrdersCount() {
        return new ResponseEntity<>(orderService.getOrdersCount() , HttpStatus.OK);
    }

}
