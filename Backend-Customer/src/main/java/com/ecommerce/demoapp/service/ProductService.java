package com.ecommerce.demoapp.service ;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.ecommerce.demoapp.repository.ProductRepository;
import com.ecommerce.demoapp.Dto.ProductListingDTO;
import org.springframework.stereotype.Service;

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
                product.getDescription(),
                product.getPrice(),
                product.getOriginalPrice(),
                product.getMainImgUrl()
            ));
    }
}