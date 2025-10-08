package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.dto.PaymentDTO;
import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.model.Invoice;
import java.util.List;

public interface OrderService {

    // ! Finalizes the checkout, converts a cart into an order, and initiates payment processing.
    OrderDTO placeOrder(Long cartId , PaymentDTO paymentInfo);

    // * Get Orders
    List<OrderDTO> getOrders();

    // * Get Order By id
    OrderDTO getOrderById(Long id);

    // * Get Orders By User
    List<OrderDTO> getOrdersByUser(Long userId);

    // * Get Orders By Status
    List<OrderDTO> getOrdersByStatus(OrderStatus orderStatus);

    // ! Cancels an order, often performing an inventory rollback and refund process.
    OrderDTO cancelOrder(Long orderId);

    // * Generates and retrieves the formal invoice/receipt for the order.
    Invoice generateInvoice(Long orderId);
}
