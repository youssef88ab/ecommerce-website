package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.service.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final CategoryMapper categoryMapper ;
    private final CategoryServiceImpl categoryService;
    private final CategoryRepository categoryRepository;

    public Product toEntity(ProductDTO productDTO) {

        // * if DTO is null return null
        if (productDTO == null) {
            return null;
        }

        Product product = new Product();

        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setDescription(productDTO.getDescription());

        // * Convert category name to managed Category entity
        if (productDTO.getCategory() != null) {
            Category managedCategory = categoryRepository.findByName(productDTO.getCategory())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + productDTO.getCategory()));
            product.setCategory(managedCategory);
        }


        return product;
    }

    public ProductDTO toDTO(Product product) {

        // * if Entity is null return null
        if (product == null) {
            return null;
        }

        ProductDTO productDTO = new ProductDTO();

        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setPrice(product.getPrice());
        productDTO.setStock(product.getStock());
        productDTO.setDescription(product.getDescription());
        // * Convert Category entity to category name string
        if (product.getCategory() != null) {
            productDTO.setCategory(product.getCategory().getName());
        }

        return  productDTO;
    }
}