package com.ecommerce.backend.specifications;

import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.enums.PaymentMethod;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.User;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public final class OrderSpecification {
    // * Method to combine all specifications (filters and search)
    public static Specification<Order> filterBy(OrderStatus status , PaymentMethod paymentMethod, String search) {
        // * Starts with an empty specification, then combines using AND
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // * 1. Gender Filter
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (paymentMethod != null) {
                predicates.add(cb.equal(root.get("payment").get("method") , paymentMethod));
            }

            // * 2. Search Term (search) Filter: username LIKE %q% OR email LIKE %q%
            if (search != null && !search.trim().isEmpty()) {
                String likePattern = "%" + search.toLowerCase().trim() + "%";

                // Build the OR condition: (username LIKE... OR email LIKE...)
                Predicate searchPredicate = cb.or(
                        cb.like(cb.lower(root.get("user").get("username")), likePattern),
                        cb.like(cb.lower(root.get("user").get("email")), likePattern),

                        cb.like(cb.lower(cb.function("to_char", String.class, root.get("user").get("id"), cb.literal("999999999999"))), likePattern),
                        cb.like(cb.lower(cb.function("to_char", String.class, root.get("id"), cb.literal("999999999999"))), likePattern)
                );
                predicates.add(searchPredicate);
            }

            // Combine all predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
