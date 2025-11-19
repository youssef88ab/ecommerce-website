package com.ecommerce.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import com.ecommerce.backend.dto.ProductDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.web.PageableDefault;
import com.ecommerce.backend.service.ProductServiceImpl;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {

    private final ProductServiceImpl productService ;

    // * Get Products
    @GetMapping
    public Page<ProductDTO> getProducts(@PageableDefault(size = 20, sort = "id") Pageable pageable , @RequestParam(required = false) String category , @RequestParam(required = false) String search)
    {
        return productService.getAllProducts(pageable , category , search);
    }

    // * Create Product
    @PostMapping
    public ProductDTO postProduct(@RequestBody ProductDTO productDTO) {
        return productService.createProduct(productDTO);
    }

    // * Get Product By Name
    @GetMapping("/{name}")
    public ProductDTO getProduct(@PathVariable String name) {
        return productService.getProductByName(name);
    }

    // * Update Product
    @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable Long id , @RequestBody ProductDTO updatedProduct) {
        return productService.updateProduct(id, updatedProduct);
    }

    // * Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleterProduct(id);
        return ResponseEntity.noContent().build();
    }

    // * Get Products Count
    @GetMapping("/count")
    public Long getProductsCount() { return  productService.getProductsCount(); }

    @GetMapping("/count/outOfStock")
    public Long countOutOfStock() {
        return productService.countoutofstock();
    }

    @GetMapping("/count/lowStock")
    public Long countLowStock() {
        return productService.countLowStock();
    }
}