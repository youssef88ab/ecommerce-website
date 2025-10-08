package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.mapper.ProductMapper;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository ;
    private final ProductMapper productMapper;

    // * Get All Products
    @Override
    public List<ProductDTO> getProducts() {
        return List.of();
    }

    // * Get Products By Category
    @Override
    public List<ProductDTO> getProductsByCategory(String categoryName) {
        return List.of();
    }

    // * Get Product By Name
    @Override
    public ProductDTO getProductByName() {
        return null;
    }

    // * Get Product By ID
    @Override
    public ProductDTO getProductById(Long id) {
        return null;
    }

    // * Add Product
    @Override
    public ProductDTO addProduct(ProductDTO product) {

        // * transfer dto to entity
        Product addedProduct = productMapper.toEntity(product);

        // * save it to database
        Product saved = productRepository.save(addedProduct);

        // * return saved Product
        return productMapper.toDTO(saved);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO updatedProduct) {
        return null;
    }

    @Override
    public void deleterProduct(Long id) {

    }
}