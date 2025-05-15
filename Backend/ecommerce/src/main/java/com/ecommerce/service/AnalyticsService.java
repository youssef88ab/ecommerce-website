package com.ecommerce.service;

import com.ecommerce.repository.OrderRepo;
import com.ecommerce.repository.ProductRepo;
import com.ecommerce.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Stack;

@Service
public class AnalyticsService {

    @Autowired
    OrderRepo orderRepo ;

    @Autowired
    UserRepo userRepo;

    public Long getTotalSales() {
        Long totalSales = orderRepo.getTotalSales() ;
        return  totalSales;
    }

    public Long getTotalUsers() {
        Long totalUsers = userRepo.getTotalUsers() ;
        return  totalUsers;
    }

    public Stack<Long> getYearlySales() {
        Stack<Long> yearlySales = new Stack<>();

        for (int i = 1 ; i <= 12 ; i++) {
            yearlySales.push(orderRepo.findByOrderMonth(i));
        }

        return yearlySales;
    }



}
