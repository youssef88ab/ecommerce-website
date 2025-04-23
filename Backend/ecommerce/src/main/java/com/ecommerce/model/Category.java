package com.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products;

    private String name ;

    private String description;

    // Default Constructor
    public Category () {

    }

    // Parametreized Constructor
    public Category (String name , String description ) {
        this.name = name ;
        this.description = description ;
    }
}
