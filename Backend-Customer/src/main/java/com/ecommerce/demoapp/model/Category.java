package com.ecommerce.demoapp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table(name = "category") // Matches your table name
public class Category {

    @Id
    @Column(name = "IdMainCat") // Matches your primary key column
    private int IdCat;

    @Column(name = "Name", length = 100) // Adjust length as needed
    private String NameCat;

    @Column(name = "catUrl", length = 200, nullable = true) // New column
    private String catUrl;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Subcategory> subcategories = new ArrayList<>();

    // Constructors
    public Category() {}

    public int getIdCat() {
        return this.IdCat ;
    }
     public String getNameCat() {
        return this.NameCat ;
    }
    public String getCatUrl() {
        return this.catUrl ;
    }
     }