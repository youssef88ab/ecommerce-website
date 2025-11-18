package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CategoryDTO;
import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.mapper.CategoryMapper;
import com.ecommerce.backend.mapper.ProductMapper;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.specifications.ProductSpecification;
import com.ecommerce.backend.specifications.UserSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository ;
    private final ProductMapper productMapper;
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;

    // * Get All Products
    @Override
    @Transactional(readOnly = true)
    public Page<ProductDTO> getAllProducts(Pageable pageable, String category , String search) {
        // * 1. Build the dynamic WHERE clause using the Specification class
        Specification<Product> spec = ProductSpecification.filterBy(category, search);

        // * 2. Execute the single findAll method, passing the dynamic Specification
        Page<Product> productPage = productRepository.findAll(spec, pageable);

        // * 3. Map and return
        return productPage.map(productMapper::toDTO);
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

            // ! product.setCategory(categoryMapper.toEntity(updatedProduct.getCategory()));

            // * Save it & Convert back to dto
            return productMapper.toDTO(productRepository.save(product));
        }

        // * In Case its not present return null
        return null;
    }

    // * Delete Product
    @Override
    public void deleterProduct(Long id) { productRepository.deleteById(id); }

    @Override
    public Long countoutofstock() {
        return productRepository.countOutOfStock();
    }

    // * Get Products Count
    public Long getProductsCount() { return productRepository.count(); }

    // * Get Low Stock Products Count
    public Long countLowStock() {
        return productRepository.countLowStock();
    }

    @Transactional
    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        // * Find the managed category entity by name
        Category managedCategory = categoryRepository.findByName(productDTO.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found: " + productDTO.getCategory()));

        // * Create product with manual mapping
        Product product = new Product();
        product.setId(null);
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setCategory(managedCategory); // Set managed entity

        // * Save product
        Product savedProduct = productRepository.save(product);

        // * Convert back to DTO
        return productMapper.toDTO(savedProduct);
    }
}