package com.ecommerce.Dto;

import com.ecommerce.model.Order;
import com.ecommerce.model.Payment;
import com.ecommerce.model.PaymentStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;


public class PaymentDTO {

    private Long id;


    private OrderDTO order;

    private PaymentStatus paymentStatus;

    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String transactionId; // From payment gateway

    // Default Constructor ;
    public PaymentDTO() {

    }

    // Parametreized Constructor ;
    public  PaymentDTO (Long id , OrderDTO orderDTO , PaymentStatus paymentStatus , LocalDateTime paymentDate , String paymentMethod , String transactionId) {
        this.id = id ;
        this.order = orderDTO;
        this.paymentStatus = paymentStatus;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

}


