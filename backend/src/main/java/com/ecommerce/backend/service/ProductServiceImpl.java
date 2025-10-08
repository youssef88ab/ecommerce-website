package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductDTO;

import java.util.List;

public class ProductServiceImpl implements ProductService {
    @Override
    public List<ProductDTO> getProducts() {
        return List.of();
    }

    @Override
    public List<ProductDTO> getProductsByCategory(String categoryName) {
        return List.of();
    }

    @Override
    public ProductDTO getProductByName() {
        return null;
    }

    @Override
    public ProductDTO getProductById(Long id) {
        return null;
    }

    @Override
    public ProductDTO addProduct(ProductDTO product) {
        return null;
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO updatedProduct) {
        return null;
    }

    @Override
    public void deleterProduct(Long id) {

    }
}