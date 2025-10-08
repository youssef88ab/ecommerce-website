package com.ecommerce.backend.dto;

import com.ecommerce.backend.enums.PaymentMethod;
import com.ecommerce.backend.enums.PaymentStatus;

import java.sql.Timestamp;

public class PaymentDTO {
    private Long id;
    private Long orderId;
    private double amount;
    private PaymentMethod method;
    private PaymentStatus status;
    private Timestamp paymentDate;
}