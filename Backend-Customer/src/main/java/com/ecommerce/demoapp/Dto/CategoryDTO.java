package com.ecommerce.demoapp.Dto;

public class CategoryDTO {
    private int IdCat;
    private String NameCat;
    
    public CategoryDTO() {}

    public CategoryDTO(int idSubCat, String name) {
        this.IdCat = idSubCat;
        this.NameCat = name;
    }

     public int getIdSubCat() {
        return this.IdCat;
    }

    public String getName() {
        return this.NameCat;
    }
    
}