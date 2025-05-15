package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Order;
import com.ecommerce.model.OrderStatus;

@Repository
public interface OrderRepo extends JpaRepository<Order , Long> {

    public List<Order> findByStatus(OrderStatus status);

    public  List<Order> findByUserId(Long id);

    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    public Long getTotalSales();

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE FUNCTION('MONTH', o.orderDate) = :month")
    Long findByOrderMonth(@Param("month") int month);


}
