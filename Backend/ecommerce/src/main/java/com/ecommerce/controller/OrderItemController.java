package com.ecommerce.controller;

import com.ecommerce.Dto.OrderItemDTO;
import com.ecommerce.model.OrderItem;
import com.ecommerce.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin (origins =  "*")
@RequestMapping ("/api/orderItems")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService ;

    @GetMapping()
    public ResponseEntity<List<OrderItemDTO>> getAllOrderItems() {

        return new ResponseEntity<>(orderItemService.getAll() , HttpStatus.OK);
    }

}
