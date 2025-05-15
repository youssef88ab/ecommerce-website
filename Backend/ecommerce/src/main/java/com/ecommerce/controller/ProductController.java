package com.ecommerce.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Dto.ProductDTO;
import com.ecommerce.service.ProductService;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*") // Autoriser les requêtes depuis le frontend
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Récupérer tous les produits
    @GetMapping()
    public ResponseEntity<List<ProductDTO>> getProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Supprimer un produit par son ID

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Récupérer un produit par son ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Mettre à jour un produit par son ID

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO updatedProduct) {
        ProductDTO product = productService.updateProduct(id, updatedProduct);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Ajouter un nouveau produit

    @PostMapping("/add")
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO product) {
        ProductDTO newProduct = productService.addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    // Exporter les produits au format CSV
    @GetMapping("/export")
    public ResponseEntity<String> exportProductscsv() {
        List<ProductDTO> products = productService.getAllProducts();

        StringWriter writer = new StringWriter();
        PrintWriter csvWriter = new PrintWriter(writer);

        // En-tête du CSV
        csvWriter.println("id,name,description,price,stockQuantity,category,imageUrl,createdAt,updatedAt");

        // Lignes du CSV
        for (ProductDTO product : products) {
            csvWriter.println(
                product.getId() + "," +
                escapeCsvField(product.getName()) + "," +
                escapeCsvField(product.getDescription()) + "," +
                product.getPrice() + "," +
                product.getStockQuantity() + "," +
                escapeCsvField(product.getCategory()) + "," +
                escapeCsvField(product.getImageUrl()) + "," +
                product.getCreatedAt() + "," +
                product.getUpdatedAt()
            );
        }

        csvWriter.flush();
        csvWriter.close();

        // En-têtes de la réponse pour le téléchargement du fichier
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=products.csv");
        headers.add(HttpHeaders.CONTENT_TYPE, "text/csv");

        return new ResponseEntity<>(writer.toString(), headers, HttpStatus.OK);
    }

    // Méthode utilitaire pour échapper les champs CSV
    private String escapeCsvField(String field) {
        if (field == null) {
            return "";
        }
        return "\"" + field.replace("\"", "\"\"") + "\"";
    }

    @GetMapping("/search/keyword/{keyword}")
    private ResponseEntity<List<ProductDTO>> searchByKeyword(@PathVariable String keyword) {
        return new ResponseEntity<>(productService.searchProduct("%" + keyword + "%") , HttpStatus.OK);
    }

    @GetMapping("count")
    private ResponseEntity<Long> getProductsCount() {
        return new ResponseEntity<>(productService.getProductsCount() , HttpStatus.OK);
    }
}