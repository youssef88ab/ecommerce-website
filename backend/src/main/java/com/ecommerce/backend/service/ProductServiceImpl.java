package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.mapper.CategoryMapper;
import com.ecommerce.backend.mapper.ProductMapper;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository ;
    private final ProductMapper productMapper;
    private final CategoryMapper categoryMapper;

    // * Get All Products
    @Override
    public List<ProductDTO> getProducts() {
        return productRepository.findAll().stream().map(productMapper::toDTO).collect(Collectors.toList());
    }

    // * Get Products By Category
    @Override
    public List<ProductDTO> getProductsByCategory(String categoryName) {
        return List.of();
    }

    // * Get Product By Name
    @Override
    public ProductDTO getProductByName(String name) { return productRepository.findByName(name).map(productMapper::toDTO).orElse(null); }

    // * Get Product By ID
    @Override
    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id).map(productMapper::toDTO).orElse(null);
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

        // * Create Optional Product
        Optional<Product> productOptional = productRepository.findByName(updatedProduct.getName());

        // * if it exists
        if (productOptional.isPresent())
        {
            // * Declare Product
            Product product = productOptional.get();

            // * Update Product attributes from dto
            product.setPrice(updatedProduct.getPrice());
            product.setStock(updatedProduct.getStock());
            product.setName(updatedProduct.getDescription());
            product.setCategory(categoryMapper.toEntity(updatedProduct.getCategory()));

            // * Save it & Convert back to dto
            return productMapper.toDTO(productRepository.save(product));
        }

        // * In Case its not present return null
        return null;
    }

    // * Delete Product
    @Override
    public void deleterProduct(Long id) { productRepository.deleteById(id); }
}