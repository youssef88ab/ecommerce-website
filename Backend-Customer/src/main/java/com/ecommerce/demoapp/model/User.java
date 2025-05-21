package com.ecommerce.demoapp.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "user") // Matches your table name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdUser") // Matches your primary key column
    private int IdUser;

    @Column(name = "Name", length = 100, nullable= false) // Adjust length as needed
    private String username;

    @Column(name = "Email", length = 200, nullable = true) 
    private String mail;

    @Column(name = "Password", length = 200, nullable = true) 
    private String password;

    @Column(name = "Role", length = 200, nullable = true) // New column
    private int role;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

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
    public String getPass() {
        return this.password ;
    }
    public int getRole() {
        return this.role ;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setEmail(String email) {
        this.mail = email;
    }
    public void setPass(String pass) {
        this.password = pass;
    }
    public void setRole(int role) {
        this.role = role;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
     }