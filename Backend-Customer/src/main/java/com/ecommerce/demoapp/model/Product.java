package com.ecommerce.demoapp.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Transient;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;

    @Column(name = "product_name", nullable = false, length = 255)
    private String productName;

    @Column(name="avg_rating", nullable = false)
    private int rating;

    @Column(name = "review_count")
    private int review_count ;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "original_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal originalPrice;

    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "main_img_url", length = 255)
    private String mainImgUrl;

    @Column(name = "image_gallery", columnDefinition = "JSON")
    private String imageGallery;

    @Column(name = "last_ordered_date")
    private LocalDateTime lastOrderedDate;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public Product() {
        this.isActive = true; // Default active status
    }

    // Admin form constructor
    public Product(Subcategory subcategory, String productName, int rating, String description, 
                  BigDecimal originalPrice, Integer stockQuantity, String mainImgUrl) {
        this.subcategory = subcategory;
        this.productName = productName;
        this.rating = rating ;
        this.description = description;
        this.originalPrice = originalPrice;
        this.price = originalPrice; // Price starts same as original
        this.stockQuantity = stockQuantity;
        this.mainImgUrl = mainImgUrl;
        this.isActive = stockQuantity > 0;
        this.imageGallery = "[]"; // Initialize empty JSON array
    }

    // Business logic methods
    public void updatePrice(BigDecimal newPrice) {
        // Only update current price, original remains unchanged
        this.price = newPrice;
    }

    public void checkActiveStatus() {
        // Auto-update based on stock and last order date
        boolean wasActive = this.isActive;
        this.isActive = stockQuantity > 0 && 
                       (lastOrderedDate == null || 
                        lastOrderedDate.isAfter(LocalDateTime.now().minusDays(3)));
        
        if (wasActive != this.isActive) {
            this.updatedAt = LocalDateTime.now();
        }
    }
    public int getProductId() {
        return productId;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
    public int getRating() {
        return this.rating;
    }
    public void setRating(int rating) {
        this.rating = rating ;
    }
    public int getReviewCount() {
        return this.review_count ;
    }
    public void setReviewCount(int count) {
        this.review_count = count ;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public String getMainImgUrl() {
        return mainImgUrl;
    }

    public void setMainImgUrl(String mainImgUrl) {
        this.mainImgUrl = mainImgUrl;
    }

    @Transient
private List<String> imageGalleryList;

public List<String> getImageGalleryList() {
    if (this.imageGalleryList == null && this.imageGallery != null) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            this.imageGalleryList = mapper.readValue(
                this.imageGallery, 
                new TypeReference<List<String>>(){}
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse image gallery", e);
        }
    }
    return this.imageGalleryList;
}

    public void setImageGallery(String imageGallery) {
        this.imageGallery = imageGallery;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
} 