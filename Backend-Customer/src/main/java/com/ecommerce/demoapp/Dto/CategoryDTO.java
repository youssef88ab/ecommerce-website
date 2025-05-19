package com.ecommerce.demoapp.Dto;

public class CategoryDTO {
    private int IdCat;
    private String NameCat;
    private String catUrl ;
    
    public CategoryDTO() {}

    public CategoryDTO(int idSubCat, String name, String url) {
        this.IdCat = idSubCat;
        this.NameCat = name;
        this.catUrl = url;
    }

     public int getIdSubCat() {
        return this.IdCat;
    }

    public String getName() {
        return this.NameCat;
    }
    public String getCatUrl() {
        return this.catUrl;
    }
    
}