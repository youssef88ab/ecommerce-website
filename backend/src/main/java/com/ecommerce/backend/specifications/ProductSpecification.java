package com.ecommerce.backend.specifications;

import com.ecommerce.backend.model.Product;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public final class ProductSpecification {
    // * Method to combine all specifications (filters and search)
    public static Specification<Product> filterBy(String category, String search) {
        // * Starts with an empty specification, then combines using AND
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // * 1. Category Filter
            if (category != null && !category.trim().isEmpty()) {
                predicates.add(cb.equal(root.get("category").get("name"), category));
            }

            // * 2. Search Term (search) Filter: name LIKE %q% OR id LIKE %q%
            if (search != null && !search.trim().isEmpty()) {
                String likePattern = "%" + search.toLowerCase().trim() + "%";

                // Build the OR condition: (username LIKE... OR email LIKE...)
                Predicate searchPredicate = cb.or(
                        cb.like(cb.lower(root.get("name")), likePattern),
                        cb.like(cb.lower(root.get("id")), likePattern)
                );
                predicates.add(searchPredicate);
            }

            // Combine all predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
