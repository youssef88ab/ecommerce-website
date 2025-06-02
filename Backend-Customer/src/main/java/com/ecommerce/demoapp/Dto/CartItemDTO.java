package com.ecommerce.demoapp.Dto;

public class CartItemDTO {
        private int productId;
        private String productName;
        private String imageUrl;
        private Double price;
        private Integer quantity;

        public int getProductId() {
            return this.productId;
        }
        
        public String getProductName() {
            return this.productName;
        }

        public String getImageUrl() {
            return this.imageUrl;
        }

        public Double getPrice() {
            return this.price;
        }

        public Integer getQuantity() {
            return this.quantity;
        }

        public void setProductName(String productName) { this.productName = productName; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public void setPrice(Double price) { this.price = price; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public void setProductId(int id) { this.productId = id; }
    } 