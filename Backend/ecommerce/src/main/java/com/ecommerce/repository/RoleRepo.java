package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.model.Role;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role , Long>{

    Optional<Role> findByName(String name);
}
