package com.ecommerce.Dto;

import lombok.Data;

import java.sql.Date;
@Data
public class ShippingDetailsDTO {

    Long id;
    String address;
    String city;
    String country;
    Date delivered_at;
    Date estimated_delivery_date;
    String postal_code;
    String recipient_phone;


    // Default Constructor ;
    public ShippingDetailsDTO() {
    }

    public ShippingDetailsDTO (Long id, String address, String city, String country, Date delivered_at, Date estimated_delivery_date, String postal_code, String recipient_phone) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.country = country;
        this.delivered_at = delivered_at;
        this.estimated_delivery_date = estimated_delivery_date;
        this.postal_code = postal_code;
        this.recipient_phone = recipient_phone;

    }


}
