package com.ecommerce.backend.specifications;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.Role;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public final class UserSpecification {
    // * combine all specifications (filters and search)
    public static Specification<User> filterBy(Gender gender, Role role, String search) {
        // * Starts with an empty specification, then combines using AND
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // * 1. Gender Filter
            if (gender != null) {
                predicates.add(cb.equal(root.get("gender"), gender));
            }

            // * 2. Role Filter
            if (role != null) {
                predicates.add(cb.equal(root.get("role"), role));
            }

            // * 3. Search Term (search) Filter: username LIKE %q% OR email LIKE %q%
            if (search != null && !search.trim().isEmpty()) {
                String likePattern = "%" + search.toLowerCase().trim() + "%";

                // Build the OR condition: (username LIKE... OR email LIKE...)
                Predicate searchPredicate = cb.or(
                        cb.like(cb.lower(root.get("username")), likePattern),
                        cb.like(cb.lower(root.get("email")), likePattern)
                );
                predicates.add(searchPredicate);
            }

            // Combine all predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
