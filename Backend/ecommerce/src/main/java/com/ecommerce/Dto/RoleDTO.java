package com.ecommerce.Dto;

public class RoleDTO {
    private Long id;
    private String name;

    // Default constructor
    public RoleDTO() {
    }

    // Parameterized constructor
    public RoleDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
} 