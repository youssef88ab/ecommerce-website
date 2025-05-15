package com.ecommerce.controller;

import com.ecommerce.Dto.PaymentDTO;
import com.ecommerce.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin (origins = "*")
public class PaymentController {

    @Autowired
    PaymentService paymentService ;

    @GetMapping()
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        return new ResponseEntity<>(paymentService.getAllPayments() , HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPayment(@PathVariable Long id){
        return new ResponseEntity<>(paymentService.getPayment(id) , HttpStatus.OK);
    }
}
