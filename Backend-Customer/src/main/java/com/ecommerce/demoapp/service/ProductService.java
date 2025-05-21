package com.ecommerce.demoapp.service ;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.demoapp.Dto.ProductDetailDTO;
import com.ecommerce.demoapp.Dto.ProductListingDTO;
import com.ecommerce.demoapp.model.Product;
import com.ecommerce.demoapp.repository.ProductRepository;


@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public Page<ProductListingDTO> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
            .map(product -> new ProductListingDTO(
                product.getProductId(),
                product.getProductName(),
                product.getRating(),
                product.getReviewCount(),
                product.getDescription(),
                product.getPrice(),
                product.getOriginalPrice(),
                product.getMainImgUrl()
            ));
    }
    public ProductDetailDTO getProductDetailById(int id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, 
                "Product not found with ID: " + id
            ));
    
    return new ProductDetailDTO(
        product.getProductId(),
        product.getProductName(),
        product.getRating(),
        product.getReviewCount(),
        product.getDescription(),
        product.getPrice(),
        product.getOriginalPrice(),
        product.getMainImgUrl(),
        product.getImageGalleryList(),
        product.getStockQuantity()
    );
}
}