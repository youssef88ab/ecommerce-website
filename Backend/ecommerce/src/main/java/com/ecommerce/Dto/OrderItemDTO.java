package com.ecommerce.Dto;


public class OrderItemDTO {
    private Long id;
    private String productName;
    private int quantity;
    private double price;


    public OrderItemDTO(Long id, String productName, int quantity, double price) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters & Setters
    public Long getId() {
        return id ;
    }

    public String getProudctName() {
        return productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }
}
