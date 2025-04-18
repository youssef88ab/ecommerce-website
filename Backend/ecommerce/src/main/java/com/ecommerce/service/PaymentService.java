package com.ecommerce.service;

import com.ecommerce.Dto.OrderDTO;
import com.ecommerce.Dto.OrderItemDTO;
import com.ecommerce.Dto.PaymentDTO;
import com.ecommerce.Dto.ShippingDetailsDTO;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import com.ecommerce.model.Payment;
import com.ecommerce.model.ShippingDetails;
import com.ecommerce.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    PaymentRepo paymentRepo ;

    public List<PaymentDTO> getAllPayments() {

        List<Payment> payments = paymentRepo.findAll();

        return payments.stream()
                .map(this::convertPaymentToDTO) // Convert each Payment to PaymentDTO
                .collect(Collectors.toList());
    }

    public PaymentDTO getPayment(Long id) {
        return  convertPaymentToDTO(paymentRepo.findById(id).orElseThrow(() -> new RuntimeException("Payment Not Founded With This Id")));
    }


    //  ✅ Convert Payment entity to PaymentDTO
    private  PaymentDTO convertPaymentToDTO(Payment payment) {
        return new PaymentDTO(payment.getId() , convertToDTO(payment.getOrder()) , payment.getPaymentStatus() , payment.getPaymentDate() , payment.getPaymentMethod() , payment.getTransactionId());
    }

    // ✅ Convert ShippingDetails entity to ShippingDetailsDTO
    private ShippingDetailsDTO convertShippingToDTO(ShippingDetails shippingDetails) {
        return new ShippingDetailsDTO(shippingDetails.getId() , shippingDetails.getAddress() , shippingDetails.getCity() ,
                shippingDetails.getCountry() , shippingDetails.getDelivered_at() , shippingDetails.getEstimated_delivery_date() ,
                shippingDetails.getPostal_code() , shippingDetails.getRecipient_phone() );
    }

    // ✅ Convert Order entity to OrderDTO
    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new OrderDTO(order.getId() , order.getTotalPrice(), order.getStatus() ,order.getOrderDate() , orderItemDTOs , order.getUser().getId() , order.getUser().getUsername() , order.getUser().getEmail() , order.getPayment().getId() , convertShippingToDTO(order.getShippingDetails()));
    }

    // ✅ Convert OrderItem entity to OrderItemDTO
    private OrderItemDTO convertToDTO(OrderItem orderItem) {
        return new OrderItemDTO(
                orderItem.getId(),
                orderItem.getProduct().getName(), // Assuming OrderItem has a Product
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }

}
