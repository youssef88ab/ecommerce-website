package com.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "roles")
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ; 
    private String name ;

    // Default Constructor ;
    public  Role() {

    }

    // Paramtreized Constructor
    public  Role(Long id , String name) {
        this.id = id ;
        this.name = name;
    }
    

    // Getters 
    public Long getId() {
        return this.id ;
    }

    public String getName() {
        return this.name;
    }

    // Setters 

    public void setId(Long id) {
        this.id = id; 
    }

    public void setName(String name) {
        this.name = name ;
    }
}
