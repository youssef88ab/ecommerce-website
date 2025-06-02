package com.ecommerce.demoapp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "user") // Matches your table name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdUser") 
    private int IdUser;

    @Column(name = "Name", length = 100, nullable= false) // Adjust length as needed
    private String username;

    @Column(name = "Email", length = 200, nullable = false) 
    private String mail;

    @Column(name = "Password", length = 200, nullable = false) 
    private String password;

    @Column(name = "Role", length = 200, nullable = false) 
    private int role;

    @Column(name = "First_Name", length = 50, nullable = true)
    private String firstName;

    @Column(name = "Last_Name", length = 50, nullable = true)
    private String lastName;

    @Column(name = "Phone", length = 20, nullable = true)
    private String phone;

    @Column(name = "profileImg", length = 500, nullable = true)
    private String imgUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    // Constructors
    public User() {}

    public int getId() {
        return this.IdUser ;
    }
     public String getName() {
        return this.username ;
    }
    public String getEmail() {
        return this.mail ;
    }
    public String getImgUrl() {
        return this.imgUrl;
    }
    public String getPass() {
        return this.password ;
    }
    public int getRole() {
        return this.role ;
    }
    public String getFirstName() {
        return this.firstName;
    }
    public String getLastName() {
        return this.lastName;
    }
    public String getPhone() {
        return this.phone;
    }
    public void setName(String username) {
        this.username = username;
    }
    public void setEmail(String email) {
        this.mail = email;
    }
    public void setPass(String pass) {
        this.password = pass;
    }
    public void setFirstName(String name) {
        this.firstName = name;
    }
    public void setLastName(String name) {
        this.lastName = name;
    }
    public void setPhone(String phone) {
        this.phone = phone ;
    }
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl ;
    }
    public void setRole(int role) {
        this.role = role;
    }
    public Cart getCart() {
        return this.cart;
    }
    public void setCart(Cart cart) {
        this.cart = cart;
        cart.setUser(this);
    }
    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
     }