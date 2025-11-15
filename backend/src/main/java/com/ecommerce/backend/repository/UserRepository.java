package com.ecommerce.backend.repository;

import com.ecommerce.backend.enums.Gender;
import com.ecommerce.backend.enums.Role;
import com.ecommerce.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User , Long> , JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

    Page<User> findByGenderAndRole(Gender gender, Role role, Pageable pageable);

    Page<User> findByGender(Gender gender , Pageable pageable);

    Page<User> findByRole(Role role , Pageable pageable);

    @Query("SELECT COUNT(u) FROM User u WHERE u.registrationDate >= :from AND u.registrationDate <= :to")
    long countUsersRegisteredBetween(@Param("from") Timestamp from, @Param("to") Timestamp to);

    @Query("SELECT COUNT(DISTINCT u) FROM User u JOIN u.orders o")
    Long countDistinctUsersWithOrders();
}