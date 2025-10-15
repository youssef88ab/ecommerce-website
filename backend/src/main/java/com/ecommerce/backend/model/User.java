package com.ecommerce.backend.model;

import com.ecommerce.backend.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@ToString(exclude = "orders")
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @Column(unique = true)
    private String email;

    private String phone;

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true )
    private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true)
    private List<Payment> payments = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_CUSTOMER;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Address address;
}