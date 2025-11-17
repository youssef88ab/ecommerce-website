package com.ecommerce.backend.service;

// * -------------------------------------------------------------------------------------------------------- *
// ! This is responsible for handling all interactions with external payment gateways (Stripe, PayPal, etc.). |
// * -------------------------------------------------------------------------------------------------------- *

import com.ecommerce.backend.dto.PaymentDTO;
import com.ecommerce.backend.enums.PaymentMethod;
import com.ecommerce.backend.enums.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentService {

    // * Get Payments
    Page<PaymentDTO> getAllPayments(Pageable pageable , PaymentStatus status , PaymentMethod method , String search);

    // * Initiates and processes a payment transaction for a given order amount.
    // todo : PaymentResponse processPayment(PaymentRequest request);

    // * Processes a refund for a previously successful transaction.
    // todo : RefundResponse issueRefund(Long transactionId, BigDecimal amount);

    // * Retrieves the details of a specific payment transaction.
    // todo : PaymentDetails getTransactionDetails(Long transactionId);

    // * Generates a secure token for the client-side to use with the payment gateway's UI (e.g., Stripe Elements).
    // todo : String generateClientToken(Long userId);

    // * Validates the authenticity of incoming messages from the payment gateway.
    // todo : boolean verifyWebhookSignature(HttpServletRequest request)

    // * Get Counts
    Long getPaymentsCount();

    // * Get Success Rate
    public Long getSuccessRate();
}
