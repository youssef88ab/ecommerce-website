package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CategoryDTO;
import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.mapper.CategoryMapper;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDTO createCategory(CategoryDTO category) {
        return null;
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        return null;
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name).orElse(null);
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
