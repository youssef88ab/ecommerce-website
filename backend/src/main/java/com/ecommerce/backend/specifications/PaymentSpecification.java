package com.ecommerce.backend.specifications;

import com.ecommerce.backend.enums.PaymentMethod;
import com.ecommerce.backend.enums.PaymentStatus;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.Role;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public final class PaymentSpecification {
    // * Method to combine all specifications (filters and search)
    public static Specification<Payment> filterBy(PaymentStatus status, PaymentMethod method, String search) {
        // * Starts with an empty specification, then combines using AND
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // * 1. Status Filter
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            // * 2. Method Filter
            if (method != null) {
                predicates.add(cb.equal(root.get("method"), method));
            }

            // * 3. Search Term (search) Filter: id LIKE %q% OR user_id LIKE %q%
            if (search != null && !search.trim().isEmpty()) {
                String likePattern = "%" + search.toLowerCase().trim() + "%";

                // Build the OR condition: (username LIKE... OR email LIKE...)
                Predicate searchPredicate = cb.or(
                        cb.like(cb.lower(root.get("id")), likePattern),
                        cb.like(cb.lower(root.get("user_id")), likePattern)
                );
                predicates.add(searchPredicate);
            }

            // Combine all predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
