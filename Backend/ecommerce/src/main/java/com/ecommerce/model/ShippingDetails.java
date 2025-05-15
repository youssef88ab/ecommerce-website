package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(name = "shipping_details")
public class ShippingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String address;
    String city;
    String country;
    Date delivered_at;
    Date estimated_delivery_date;


    String postal_code;
    String recipient_phone;


}
