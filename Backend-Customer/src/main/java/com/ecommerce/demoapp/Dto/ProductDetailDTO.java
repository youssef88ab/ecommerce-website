package com.ecommerce.demoapp.Dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductDetailDTO {
    private int productId;
    private String productName ;
    private int rating ;
    private int review_count ;
    private String description;
    private BigDecimal originalPrice;
    private BigDecimal price;
    private String mainImgUrl ;
    private List<String> imageGallery;
    private int stockQuantity;
    
    public ProductDetailDTO() {}

    public ProductDetailDTO(int id, String name, int rating, int review_count, String description, BigDecimal price, BigDecimal originalPrice, String imgUrl, List<String> imgGallery, int stockQuan) {
        this.productId = id;
        this.productName = name;
        this.rating = rating ;
        this.review_count = review_count ;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.mainImgUrl = imgUrl;
        this.imageGallery = imgGallery;
        this.stockQuantity = stockQuan;
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
    public BigDecimal getPrice() {
        return this.price ;
    }
    public BigDecimal getOriginalPrice() {
        return this.originalPrice ;
    }
    public String getImg() {
        return this.mainImgUrl ;
    }
    public List<String> getImgGallery() {
        return this.imageGallery;
    }
    public void setImgGallery(List<String> imgGall) {
        this.imageGallery = imgGall ;
    }
    public int getStockQuantity() {
        return this.stockQuantity;
    }
    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
} 