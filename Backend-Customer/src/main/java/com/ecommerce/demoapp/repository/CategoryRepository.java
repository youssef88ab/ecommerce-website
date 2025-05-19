package com.ecommerce.demoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.demoapp.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}