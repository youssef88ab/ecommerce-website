package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CategoryDTO;
import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.model.Category;

import java.util.List;

public interface CategoryService {

    // * Creates a new product category (e.g., "Electronics").
    CategoryDTO createCategory(CategoryDTO category);

    // * Retrieves a category by ID.
    CategoryDTO getCategoryById(Long categoryId);

    // * Retrieves a category by its unique name.
    Category getCategoryByName(String name);

    // * Retrieves the entire catalog structure (often as a hierarchical tree).
    List<CategoryDTO> getAllCategories();

    // * Modifies category details (e.g., name, description, parent category).
    CategoryDTO updateCategory(Long categoryId, CategoryDTO updatedCategory);

    // * Removes a category.
    void deleteCategory(Long categoryId);

    // * Retrieves all products associated with a category.
    List<ProductDTO> getProductsInCategory(Long categoryId);
}
