package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    // * Get Products
    Page<ProductDTO> getAllProducts(Pageable pageable, String category , String search);

    // * Get Products By Category
    List<ProductDTO> getProductsByCategory(String categoryName);

    // * Get Product By Name
    ProductDTO getProductByName(String name);

    // * Create Product 
    ProductDTO createProduct(ProductDTO productDTO);
    
    // * Get Product By ID
    ProductDTO getProductById(Long id);

    // * Add Product
    ProductDTO addProduct(ProductDTO product);

    // * Update Product
    ProductDTO updateProduct(Long id , ProductDTO updatedProduct);

    // * Deleter Product
    void deleterProduct(Long id);

    // * Count of stock products
    public Long countoutofstock();

    // * Count Low Stock
    public Long countLowStock();
}
