package com.ecommerce.demoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.demoapp.model.Subcategory;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
}
