package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private CategoryMapper categoryMapper ;

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
        if (productDTO.getCategory() != null) {
            product.setCategory(categoryMapper.toEntity(productDTO.getCategory()));
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
        if (product.getCategory() != null) {
            productDTO.setCategory(categoryMapper.toDTO(product.getCategory()));
        }

        return  productDTO;
    }
}