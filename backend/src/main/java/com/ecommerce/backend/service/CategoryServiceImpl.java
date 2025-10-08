package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CategoryDTO;
import com.ecommerce.backend.dto.ProductDTO;

import java.util.List;

public class CategoryServiceImpl implements CategoryService {
    @Override
    public CategoryDTO createCategory(CategoryDTO category) {
        return null;
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        return null;
    }

    @Override
    public CategoryDTO getCategoryByName(String name) {
        return null;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return List.of();
    }

    @Override
    public CategoryDTO updateCategory(Long categoryId, CategoryDTO updatedCategory) {
        return null;
    }

    @Override
    public void deleteCategory(Long categoryId) {

    }

    @Override
    public List<ProductDTO> getProductsInCategory(Long categoryId) {
        return List.of();
    }
}
