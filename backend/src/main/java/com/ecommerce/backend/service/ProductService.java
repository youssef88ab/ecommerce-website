package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductDTO;
import java.util.List;

public interface ProductService {

    // * Get Products
    List<ProductDTO> getProducts();

    // * Get Products By Category
    List<ProductDTO> getProductsByCategory(String categoryName);

    // * Get Product By Name
    ProductDTO getProductByName();

    // * Get Product By ID
    ProductDTO getProductById(Long id);

    // * Add Product
    ProductDTO addProduct(ProductDTO product);

    // * Update Product
    ProductDTO updateProduct(Long id , ProductDTO updatedProduct);

    // * Deleter Product
    void deleterProduct(Long id);
}
