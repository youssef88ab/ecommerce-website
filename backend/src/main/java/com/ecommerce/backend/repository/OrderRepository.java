package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order , Long>, JpaSpecificationExecutor<Order> {

    @Query(value = "SELECT SUM(o.total_amount) FROM ecommerce.orders o", nativeQuery = true)
    Long totalSpent();
}
