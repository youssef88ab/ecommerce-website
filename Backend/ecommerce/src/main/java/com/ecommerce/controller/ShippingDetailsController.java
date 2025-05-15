package com.ecommerce.controller;

import com.ecommerce.Dto.ShippingDetailsDTO;
import com.ecommerce.model.ShippingDetails;
import com.ecommerce.repository.ShippingDetailsRepo;
import com.ecommerce.service.ShippingDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin (origins = "*")
@RequestMapping ("/api/shippingDetails")
public class ShippingDetailsController {

    @Autowired
    ShippingDetailsService shippingDetailsService;

    @GetMapping("")
    public ResponseEntity<List<ShippingDetailsDTO>> getAll() {
        return  new ResponseEntity<>(shippingDetailsService.getAllShippingDetails() , HttpStatus.OK);
    }
}
