package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.PaymentDTO;
import com.ecommerce.backend.enums.PaymentMethod;
import com.ecommerce.backend.enums.PaymentStatus;
import com.ecommerce.backend.service.PaymentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/payments")
@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceImpl paymentService ;

    @GetMapping
    public Page<PaymentDTO> getPayments(@PageableDefault(size = 20, sort = "id") Pageable pageable , @RequestParam(required = false) PaymentStatus status, @RequestParam(required = false) PaymentMethod method , @RequestParam(required = false) String search) {
        return  paymentService.getAllPayments(pageable , status , method , search);
    }

    @GetMapping("/count")
    public Long getCounts() {
        return  paymentService.getPaymentsCount();
    }

    @GetMapping("/successRate")
    public Long getSuccessRate() {
        return paymentService.getSuccessRate();
    }
}
