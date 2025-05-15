package com.ecommerce.model;

import java.sql.Date;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Column(nullable = false , unique = true)
    private String username; 

    @Column(nullable = false , unique = true)
    private String email; 

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles;

    @Column(nullable = true)
    private String address ;

    private String phone ;

    private Date birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender ;

    private Date dateAdded;

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

public void setId(Long id) {
    this.id = id;
}

// Getter and Setter for username
public String getUsername() {
    return username;
}

public void setUsername(String username) {
    this.username = username;
}

// Getter and Setter for email
public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

// Getter and Setter for password
public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

// Getter and Setter for roles
public Set<Role> getRoles() {
    return roles;
}

public void setRoles(Set<Role> roles) {
    this.roles = roles;
}
    
}
