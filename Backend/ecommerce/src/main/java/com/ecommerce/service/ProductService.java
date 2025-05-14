package com.ecommerce.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepo;
import com.ecommerce.Dto.ProductDTO;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<ProductDTO> getAllProducts() {
        return productRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public ProductDTO getProductById(Long id) {
        return productRepo.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public ProductDTO updateProduct(Long id, ProductDTO updatedProductDTO) {
        Optional<Product> productOptional = productRepo.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            // Update attributes from DTO
            product.setName(updatedProductDTO.getName());
            product.setDescription(updatedProductDTO.getDescription());
            product.setPrice(updatedProductDTO.getPrice());
            product.setStockQuantity(updatedProductDTO.getStockQuantity());
            product.setImageUrl(updatedProductDTO.getImageUrl());
            // Save and convert back to DTO
            return convertToDTO(productRepo.save(product));
        } else {
            return null;
        }
    }

    public ProductDTO addProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        return convertToDTO(productRepo.save(product));
    }

    public List<ProductDTO> searchProduct(String keyword) {
        return productRepo.findByNameLike(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Long getProductsCount() {
        return productRepo.count();
    }

    // Conversion methods
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getProductId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getImageUrl(),
                product.getCreatedAt(),
                product.getUpdatedAt(),
                product.getCategoryName()
        );
    }

    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setProductId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setImageUrl(productDTO.getImageUrl());
        // Note: createdAt and updatedAt are managed by JPA
        return product;
    }
}
