package com.ecommerce.demoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.demoapp.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}