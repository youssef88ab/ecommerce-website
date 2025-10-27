package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.PaymentDTO;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentMapper {

    public Payment toEntity(PaymentDTO paymentDTO) {

        if (paymentDTO == null) { return null; }

        Payment payment = new Payment();

        payment.setId(paymentDTO.getId());
        payment.setStatus(paymentDTO.getStatus());
        payment.setPaymentDate(paymentDTO.getPaymentDate());
        payment.setMethod(paymentDTO.getMethod());
        payment.setAmount(paymentDTO.getAmount());

        Order order = new Order();

        order.setId(paymentDTO.getOrderId());

        payment.setOrder(order);

        return payment;
    }

    public PaymentDTO toDTO(Payment payment) {

        if (payment == null) { return null; }

        PaymentDTO paymentDTO = new PaymentDTO();

        paymentDTO.setId(payment.getId());
        paymentDTO.setStatus(payment.getStatus());
        paymentDTO.setMethod(payment.getMethod());
        paymentDTO.setOrderId(payment.getOrder().getId());
        paymentDTO.setAmount(payment.getAmount());
        paymentDTO.setPaymentDate(payment.getPaymentDate());

        return paymentDTO;
    }
}