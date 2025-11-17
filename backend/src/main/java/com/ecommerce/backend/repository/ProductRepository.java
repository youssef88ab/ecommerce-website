package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product , Long> , JpaSpecificationExecutor<Product> {

    Optional<Product> findByName(String name);

    @Query(value = "SELECT COUNT(*) FROM ecommerce.products p WHERE p.stock=0" , nativeQuery = true)
    Long countOutOfStock();

    @Query(value = "SELECT COUNT(*) FROM ecommerce.products p WHERE p.stock < 16 AND p.stock > 0 " , nativeQuery = true)
    Long countLowStock();
}
