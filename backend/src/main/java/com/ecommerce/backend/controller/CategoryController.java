package com.ecommerce.backend.controller;

import java.util.List;

import com.ecommerce.backend.dto.CategoryDTO;
import com.ecommerce.backend.service.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryServiceImpl categoryService ;

    // * Get All Categories
    @GetMapping
    public List<CategoryDTO> getCategories() {
        return categoryService.getAllCategories();
    }

    // * Add Category
    @PostMapping("/add")
    public CategoryDTO addCategory(@RequestBody CategoryDTO category) {
        return categoryService.createCategory(category);
    }

    // * Update Category
    @PutMapping("/{id}")
    public CategoryDTO updateCategory(@PathVariable Long id , @RequestBody CategoryDTO category) {
        return categoryService.updateCategory(id , category);
    }

    // * Delete Category
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

}
