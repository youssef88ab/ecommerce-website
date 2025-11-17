package com.ecommerce.backend.service;

import lombok.RequiredArgsConstructor;
import com.ecommerce.backend.model.Payment;
import org.springframework.data.domain.Page;
import com.ecommerce.backend.dto.PaymentDTO;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import com.ecommerce.backend.enums.PaymentMethod;
import com.ecommerce.backend.enums.PaymentStatus;
import com.ecommerce.backend.mapper.PaymentMapper;
import org.springframework.data.jpa.domain.Specification;
import com.ecommerce.backend.repository.PaymentRepository;
import com.ecommerce.backend.specifications.PaymentSpecification;

@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements  PaymentService {

    private final PaymentRepository paymentRepository ;
    private final PaymentMapper paymentMapper ;

    @Override
    public Page<PaymentDTO> getAllPayments(Pageable pageable, PaymentStatus status, PaymentMethod method, String search) {
        // * 1. Build the dynamic WHERE clause using the Specification class
        Specification<Payment> spec = PaymentSpecification.filterBy(status, method, search);

        // * 2. Execute the single findAll method, passing the dynamic Specification
        Page<Payment> paymentPage = paymentRepository.findAll(spec, pageable);

        // * 3. Map and return
        return paymentPage.map(paymentMapper::toDTO);
    }

    @Override
    public Long getPaymentsCount() {
        return paymentRepository.count();
    }

    public Long getSuccessRate() {
        return (paymentRepository.successfulPayments()/paymentRepository.count()) * 100;
    }
}
