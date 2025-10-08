package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.CategoryDTO;
import com.ecommerce.backend.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    public Category toEntity(CategoryDTO categoryDTO) {

        // * if DTO is null return null
        if (categoryDTO == null) { return null; }

        Category category = new Category();
        category.setId(category.getId());
        category.setName(category.getName());
        category.setDescription(category.getDescription());

        return category;
    }

    public CategoryDTO toDTO(Category category) {

        // * if Entity is null return null
        if (category == null) { return null; }

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setDescription(category.getDescription());

        return  categoryDTO;
    }
}