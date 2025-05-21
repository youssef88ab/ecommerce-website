package com.ecommerce.demoapp.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.demoapp.Dto.ProductDetailDTO;
import com.ecommerce.demoapp.Dto.ProductListingDTO;
import com.ecommerce.demoapp.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/{id}")
public ResponseEntity<ProductDetailDTO> getProductById(@PathVariable int id) {
    ProductDetailDTO product = productService.getProductDetailById(id);
    return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<Page<ProductListingDTO>> getProducts(
            @PageableDefault(size = 10, sort = "productName") Pageable pageable) {
        return ResponseEntity.ok(productService.getProducts(pageable));
    }
}