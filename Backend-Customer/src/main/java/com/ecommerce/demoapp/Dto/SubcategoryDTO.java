package com.ecommerce.demoapp.Dto;

public class SubcategoryDTO {
    private int idSubCat;
    private String name;
    private String imgUrl;
    private int categoryId; 
    
    public SubcategoryDTO() {}

    public SubcategoryDTO(int idSubCat, String name, String imgUrl, int categoryId) {
        this.idSubCat = idSubCat;
        this.name = name;
        this.imgUrl = imgUrl;
        this.categoryId = categoryId;
    }

     public int getIdSubCat() {
        return this.idSubCat;
    }

    public String getName() {
        return this.name;
    }

    public String getImgUrl() {
        return this.imgUrl;
    }

    public int getCategoryId() {
        return this.categoryId;
    }
    
}