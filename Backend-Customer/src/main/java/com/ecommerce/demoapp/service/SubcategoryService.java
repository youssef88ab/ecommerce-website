package com.ecommerce.demoapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.demoapp.Dto.SubcategoryDTO;
import com.ecommerce.demoapp.model.Subcategory;
import com.ecommerce.demoapp.repository.SubcategoryRepository;

@Service
public class SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public List<SubcategoryDTO> getAllSubcategories() {
        List<Subcategory> subcategories = subcategoryRepository.findAll();
        return subcategories.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private SubcategoryDTO convertToDTO(Subcategory subcategory) {
        return new SubcategoryDTO(
                subcategory.getIdSubCat(),
                subcategory.getName(),
                subcategory.getUrl(),
                subcategory.getCategory().getIdCat() // Assuming Category has getId()
        );
    }
}