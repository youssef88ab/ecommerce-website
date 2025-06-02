package com.ecommerce.demoapp.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart") // Matches your table name
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cart") 
    private int idCart;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name="id_user", nullable = false, unique = true) 
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CartItem> items;

    private LocalDateTime createdAt;

    public Cart() {
        this.createdAt = LocalDateTime.now();
    }

    public Cart(int id, User user, List<CartItem> items, LocalDateTime createdAt) {
            this.idCart = id;
            this.user = user;
            this.items = items;
            this.createdAt = createdAt;
        }
    public int getId() { return this.idCart; }
    public void setId(int id) { this.idCart = id; }

    public User getUser() { return this.user; }
    public void setUser(User user) { this.user = user; }

    public List<CartItem> getItems() { return this.items; }
    public void setItems(List<CartItem> items) { this.items = items; }

    public LocalDateTime getCreatedAt() { return this.createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
     }