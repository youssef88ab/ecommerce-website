package com.ecommerce.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo; 

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> productOptional = productRepo.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
    
            // Mettre à jour les attributs de l'objet Product
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setStockQuantity(updatedProduct.getStockQuantity());
            product.setImageUrl(updatedProduct.getImageUrl());
    
            // Les champs `createdAt` et `updatedAt` ne sont pas modifiés manuellement
            // `createdAt` reste inchangé car il est marqué avec `updatable = false`
            // `updatedAt` est automatiquement mis à jour par `@UpdateTimestamp`
    
            return productRepo.save(product); // Sauvegarder et retourner le produit mis à jour
        } else {
            return null; // Retourner null si le produit n'est pas trouvé
        }
    }

    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    public List<Product> searchProduct(String keyword) { return productRepo.findByNameLike(keyword);}

    public Long getProductsCount() {
        return productRepo.count();
    }
}
