package com.ecommerce.demoapp.model;

import jakarta.persistence.*;


@Entity
@Table(name = "subcategory") // Matches your table name
public class Subcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdSubCat") // Matches your primary key column
    private int idSubCat;

    @Column(name = "Name", length = 100) // Adjust length as needed
    private String name;

    @Column(name = "imgUrl", length = 200) // Adjust length as needed
    private String imgUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")  // Foreign key column name
    private Category category;

    // Constructors
    public Subcategory() {}

    // Getters and Setters
    public int getIdSubCat() {
        return this.idSubCat;
    }

    public void setIdCat(int idCat) {
        this.idSubCat = idCat;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return this.imgUrl;
    }

    public void setUrl(String url) {
        this.imgUrl = url;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category mainCat) {
        this.category = mainCat;
    }
}