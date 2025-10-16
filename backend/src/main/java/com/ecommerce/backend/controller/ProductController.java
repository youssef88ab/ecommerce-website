package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.service.ProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    ProductServiceImpl productService ;

    // * Get Products
    @GetMapping
    public List<ProductDTO> getProducts() {
        return productService.getProducts();
    }

    // * Get Product By Name
    @GetMapping("/{name}")
    public ProductDTO getProduct(@PathVariable String name) {
        return productService.getProductByName(name);
    }

    // * Add Product
    @PostMapping()
    public ProductDTO addProduct(@PathVariable ProductDTO product) {
        return productService.addProduct(product);
    }

    // * Update Product
    @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable Long id , @RequestBody ProductDTO product) {
        return productService.updateProduct(id, product);
    }

    // * Delete Product
    @DeleteMapping
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleterProduct(id);
        return ResponseEntity.noContent().build();
    }
}