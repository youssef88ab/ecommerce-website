package com.ecommerce.demoapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdCartItem;

    // Many cart items belong to one cart
    @ManyToOne
    @JoinColumn(name = "IdCart", nullable = false)
    private Cart cart;

    // Many cart items point to one product
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;

    public CartItem() {}

    public CartItem(int id, Cart cart, Product product, int quantity) {
        this.IdCartItem = id;
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
    }

    // Getters and Setters
    public int getId() { return this.IdCartItem; }
    public void setId(int id) { this.IdCartItem = id; }

    public Cart getCart() { return this.cart; }
    public void setCart(Cart cart) { this.cart = cart; }

    public Product getProduct() { return this.product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQuantity() { return this.quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
