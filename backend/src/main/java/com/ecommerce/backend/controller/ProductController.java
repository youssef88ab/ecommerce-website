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

    // * Get Products Count
    @GetMapping("/count")
    public Long getProductsCount() { return  productService.getProductsCount(); }
}