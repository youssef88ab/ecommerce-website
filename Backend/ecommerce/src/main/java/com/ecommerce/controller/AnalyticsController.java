package com.ecommerce.controller;

import com.ecommerce.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Stack;

@RestController
@CrossOrigin (origins = "*")
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService ;

    @GetMapping("/totalSales")
    public ResponseEntity<Long> getTotalSales() {
        return new ResponseEntity<>(analyticsService.getTotalSales() , HttpStatus.OK);
    }

    @GetMapping("/totalUsers")
    public ResponseEntity<Long> getTotalUsers() {
        return  new ResponseEntity<>(analyticsService.getTotalUsers() , HttpStatus.OK);
    }

    @GetMapping("/yearlySales")
    public ResponseEntity<Stack<Long>> getYearlySales() {
        return  new ResponseEntity<>(analyticsService.getYearlySales() , HttpStatus.OK);
    }

    @GetMapping("/totalOrders")
    public ResponseEntity<Long> getTotalOrders() {
        return new ResponseEntity<>(analyticsService.getTotalOrders() , HttpStatus.OK);
    }
}
