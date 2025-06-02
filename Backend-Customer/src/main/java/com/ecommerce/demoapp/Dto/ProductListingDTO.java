package com.ecommerce.demoapp.Dto;

public class ProductListingDTO {
    private int productId;
    private String productName ;
    private int rating ;
    private int review_count ;
    private String description;
    private Double originalPrice;
    private Double price;
    private String mainImgUrl ;
    
    public ProductListingDTO() {}

    public ProductListingDTO(int id, String name, int rating, int review_count, String description, Double price, Double originalPrice, String imgUrl) {
        this.productId = id;
        this.productName = name;
        this.rating = rating ;
        this.review_count = review_count ;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.mainImgUrl = imgUrl;
    }


     public int getProductId() {
        return this.productId;
    }
    public String getNameProduct() {
        return this.productName;
    }
    public int getRating() {
        return this.rating ;
    }
    public int getReviewCount() {
        return this.review_count ;
    }
    public void setReviewCount(int review_count) {
        this.review_count = review_count ;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public String getDescription() {
        return this.description;
    }
    public Double getPrice() {
        return this.price ;
    }
    public Double getOriginalPrice() {
        return this.originalPrice ;
    }
    public String getImg() {
        return this.mainImgUrl ;
    }
} 