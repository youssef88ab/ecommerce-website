package com.ecommerce.repository;

import java.util.List;

import com.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Product;


@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    List<Product> findByNameLike(String keyword);
}
